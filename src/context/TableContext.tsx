import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CellInterface, TableContextInterface } from "../types/Table";

export const TableContext = React.createContext<TableContextInterface | null>(
  null
);

const TableProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [hasLost, setHasLost] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [numberOfBombs, setNumberOfBombs] = useState(12);
  const [xSize, setXSize] = useState(8);
  const [ySize, setYSize] = useState(8);
  const [flaggedCount, setFlaggedCount] = useState(0);

  const newNumberOfBombs = useRef<HTMLInputElement>(null);
  const newXSize = useRef<HTMLInputElement>(null);
  const newYSize = useRef<HTMLInputElement>(null);

  const getCellNeighbors = (
    cells: CellInterface[],
    position: number,
    xSize: number
  ): CellInterface[] => {
    const neighbors: CellInterface[] = [];
    const isLeftFrontier = position % xSize === 0;
    const isRightFrontier = position % xSize === xSize - 1;
    const calculatedPositions = [position + xSize, position - xSize];
    if (!isLeftFrontier) {
      calculatedPositions.push(position - 1 + xSize);
      calculatedPositions.push(position - 1);
      calculatedPositions.push(position - xSize - 1);
    }
    if (!isRightFrontier) {
      calculatedPositions.push(position + 1);
      calculatedPositions.push(position + 1 + xSize);
      calculatedPositions.push(position - xSize + 1);
    }

    for (let i = 0; i < calculatedPositions.length; i++) {
      if (cells[calculatedPositions[i]]) {
        neighbors.push(cells[calculatedPositions[i]]);
      }
    }

    return neighbors;
  };

  const newCells = useCallback(
    (numberOfBombs: number, xSize: number, ySize: number) => {
      const cells = [];
      if (numberOfBombs) {
        for (let i = 0; i < xSize * ySize; i++) {
          cells.push({
            hasBomb: false,
            hasFlag: false,
            hasOpenned: false,
            numberOfSurrondingBombs: 0,
            position: i,
          });
        }

        for (let i = 0; i < numberOfBombs; i++) {
          let randomBomb = null;
          do randomBomb = Math.floor(Math.random() * xSize * ySize);
          while (randomBomb && cells[randomBomb].hasBomb);

          cells[randomBomb].hasBomb = true;
        }

        for (let i = 0; i < cells.length; i++) {
          const neighbors = getCellNeighbors(cells, cells[i].position, xSize);
          const numberOfSurrondingBombs = neighbors.filter(
            (neighbor: CellInterface) => neighbor.hasBomb
          ).length;
          cells[i].numberOfSurrondingBombs = numberOfSurrondingBombs;
        }
      }

      return cells;
    },
    []
  );

  const [cells, setCells] = React.useState<CellInterface[]>(
    newCells(numberOfBombs, xSize, ySize)
  );

  let newGame = useCallback(
    (newNumberOfBombs: number, newXSize: number, newYSize: number) => {
      setNumberOfBombs(newNumberOfBombs);
      setXSize(newXSize);
      setYSize(newYSize);
      setHasLost(false);
      setHasWon(false);
      setFlaggedCount(0);
      setCells(newCells(newNumberOfBombs, newXSize, newYSize));
    },
    [
      newCells,
      setCells,
      setHasLost,
      setHasWon,
      setFlaggedCount,
      setNumberOfBombs,
      setXSize,
      setYSize,
    ]
  );

  const handleNewGame = useCallback(
    (e: React.SyntheticEvent | null) => {
      if (e) e.preventDefault();
      if (newNumberOfBombs.current && newXSize.current && newYSize.current) {
        newGame(
          +newNumberOfBombs.current.value,
          +newXSize.current.value,
          +newYSize.current.value
        );
      }
    },
    [newGame, newNumberOfBombs, newXSize, newYSize]
  );

  const updateCell = useCallback(
    (cell: CellInterface) => {
      cells[cell.position] = cell;
      setCells([...cells]);
    },
    [cells]
  );

  const openCell = useCallback(
    (cell: CellInterface) => {
      if (!cell.hasBomb && !cell.hasFlag && !cell.hasOpenned) {
        updateCell({
          ...cell,
          hasOpenned: true,
        });

        if (!cell.numberOfSurrondingBombs) {
          let wasCalculated: number[] = [cell.position];
          let neighbors = getCellNeighbors(cells, cell.position, xSize);

          for (let i = 0; i < neighbors.length; i++) {
            if (!wasCalculated.find((n) => neighbors[i].position === n)) {
              wasCalculated.push(neighbors[i].position);
              if (
                !neighbors[i].hasBomb &&
                !neighbors[i].hasFlag &&
                !neighbors[i].hasOpenned
              ) {
                const cellToUpdate = {
                  ...neighbors[i],
                  hasOpenned: true,
                };
                updateCell(cellToUpdate);
                if (!neighbors[i].numberOfSurrondingBombs) {
                  neighbors.push(
                    ...getCellNeighbors(cells, cellToUpdate.position, xSize)
                  );
                }
              }
            }
          }
        }
      }
    },
    [cells, updateCell, xSize]
  );

  useEffect(() => {
    let hasWonByOpened = true;
    for (let i = 0; i < cells.length; i++) {
      if (!cells[i].hasBomb && !cells[i].hasOpenned) {
        hasWonByOpened = false;
        break;
      }
    }

    let hasWonByFlags = true;
    let shouldCheckFlags = flaggedCount === numberOfBombs;
    if (shouldCheckFlags) {
      for (let i = 0; i < cells.length; i++) {
        if (cells[i].hasBomb && !cells[i].hasFlag) {
          hasWonByFlags = false;
        }
      }
    }

    setHasWon(hasWonByOpened || (shouldCheckFlags && hasWonByFlags));
  }, [cells, flaggedCount, numberOfBombs, setHasWon]);

  return (
    <TableContext.Provider
      value={{
        cells,
        flaggedCount,
        handleNewGame,
        hasLost,
        hasWon,
        newCells,
        newGame,
        newNumberOfBombs,
        newXSize,
        newYSize,
        numberOfBombs,
        openCell,
        setFlaggedCount,
        setHasLost,
        setHasWon,
        setNumberOfBombs,
        setXSize,
        setYSize,
        updateCell,
        xSize,
        ySize,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
