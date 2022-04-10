import React from "react";
import { TableContext } from "../../context/TableContext";
import { TableContextInterface } from "../../types/Table";
import "./Footer.scss";

const Footer = () => {
  const { handleNewGame } = React.useContext(
    TableContext
  ) as TableContextInterface;

  return (
    <div className="footer" onClick={handleNewGame}>
      Reiniciar
    </div>
  );
};

export default Footer;
