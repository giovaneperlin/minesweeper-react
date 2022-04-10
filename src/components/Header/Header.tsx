import React from "react";
import { TableContext } from "../../context/TableContext";
import { TableContextInterface } from "../../types/Table";
import "./Header.scss";

const Header = () => {
  const {
    flaggedCount,
    handleNewGame,
    hasLost,
    hasWon,
    newNumberOfBombs,
    newXSize,
    newYSize,
    numberOfBombs,
    xSize,
    ySize,
  } = React.useContext(TableContext) as TableContextInterface;

  return (
    <div className="header">
      <div>
        {hasLost && "Perdeu"}
        {hasWon && "Ganhou"}
      </div>
      <form onSubmit={handleNewGame}>
        <div>
          <span>Columns</span>
          <input id="xSize" defaultValue={xSize} ref={newXSize} type="number" />
        </div>
        <div>
          <span>Rows</span>
          <input id="ySize" defaultValue={ySize} ref={newYSize} type="number" />
        </div>
        <div>
          <span>Number of bombs</span>
          <input
            id="numberOfBombs"
            defaultValue={numberOfBombs}
            ref={newNumberOfBombs}
            type="number"
          />
        </div>
        <input type="submit" value="Go!" />
        <div>
          <span>Number of flagged bombs {flaggedCount}</span>
        </div>
      </form>
    </div>
  );
};

export default Header;
