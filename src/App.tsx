import React from "react";
import "./styles/global.scss";
import TableProvider from "./context/TableContext";
import Table from "./components/Table/Table";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="App">
      <TableProvider>
        <Header />
        <Table />
        <Footer />
      </TableProvider>
    </div>
  );
};

export default App;
