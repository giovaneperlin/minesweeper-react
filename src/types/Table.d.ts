export interface CellInterface {
  hasBomb: boolean;
  hasFlag: boolean;
  hasOpenned: boolean;
  numberOfSurrondingBombs: number;
  position: number;
}

export interface TableProps {}

export interface TableContextInterface {
  cells: Cell[];
  flaggedCount: number;
  handleNewGame: (e: React.SyntheticEvent) => void;
  hasLost: boolean;
  hasWon: boolean;
  newCells: (numberOfBombs: number, xSize: number, ySize: number) => void;
  newGame: (
    newNumberOfBombs: number,
    newXSize: number,
    newYSize: number
  ) => void;
  newNumberOfBombs: React.RefObject<HTMLInputElement>;
  newXSize: React.RefObject<HTMLInputElement>;
  newYSize: React.RefObject<HTMLInputElement>;
  numberOfBombs: number;
  openCell: (cell: CellInterface) => void;
  setFlaggedCount: (flaggedCount: number) => void;
  setHasLost: (lost: boolean) => void;
  setHasWon: (won: boolean) => void;
  setNumberOfBombs: (numberOfBombs: numnber) => void;
  setXSize: (xSize: numnber) => void;
  setYSize: (ySize: numnber) => void;
  updateCell: (cell: CellInterface) => void;
  xSize: number;
  ySize: number;
}
