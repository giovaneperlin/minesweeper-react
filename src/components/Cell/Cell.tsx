import React from "react";
import { TableContext } from "../../context/TableContext";
import { CellInterface, TableContextInterface } from "../../types/Table";
import "./Cell.scss";
import classNames from "classnames";

const Cell = ({
  hasBomb,
  hasFlag,
  hasOpenned,
  numberOfSurrondingBombs,
  position,
}: CellInterface) => {
  const {
    flaggedCount,
    hasLost,
    hasWon,
    numberOfBombs,
    openCell,
    setFlaggedCount,
    setHasLost,
    updateCell,
  } = React.useContext(TableContext) as TableContextInterface;

  return (
    <div
      className={classNames("cell", {
        bomb: (hasOpenned || hasLost) && hasBomb,
        flag: hasFlag,
        open: hasOpenned || hasLost || hasWon,
      })}
      onContextMenu={(e) => {
        e.preventDefault();
        if (hasOpenned) return;
        if (hasWon || hasLost) return;
        if (!hasFlag && flaggedCount === numberOfBombs) return;
        setFlaggedCount(flaggedCount + (!hasFlag ? 1 : -1));
        updateCell({
          hasBomb,
          hasFlag: !hasFlag,
          hasOpenned,
          numberOfSurrondingBombs,
          position,
        });
      }}
      onClick={(e) => {
        e.preventDefault();
        if (hasWon || hasLost) return;
        if (hasFlag) return;
        if (hasBomb) {
          updateCell({
            hasBomb,
            hasFlag,
            hasOpenned: true,
            numberOfSurrondingBombs,
            position,
          });
          setHasLost(true);
        } else {
          openCell({
            hasBomb,
            hasFlag,
            hasOpenned,
            numberOfSurrondingBombs,
            position,
          });
        }
      }}
    >
      <span>
        {!hasBomb &&
        (hasOpenned || hasLost || hasWon) &&
        numberOfSurrondingBombs
          ? numberOfSurrondingBombs
          : ""}
      </span>
    </div>
  );
};

export default Cell;
