import React from "react";
import { TableContext } from "../../context/TableContext";
import { TableContextInterface } from "../../types/Table";
import Cell from "../Cell/Cell";
import "./Table.scss";

const Table = () => {
  const { cells, xSize } = React.useContext(
    TableContext
  ) as TableContextInterface;

  return (
    <div
      className="table"
      style={{
        gridTemplateColumns: `repeat(${xSize}, 1fr)`,
      }}
    >
      {cells.map((cell) => (
        <Cell key={cell.position} {...cell} />
      ))}
    </div>
  );
};

export default Table;
