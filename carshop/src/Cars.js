import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import CreateCar from "./CreateCar";

export default function Cars() {
  const [cars, setCars] = React.useState([]);
  const gridRef = React.useRef();

  React.useEffect(() => {
    fetch("https://carstockrest.herokuapp.com/cars")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCars(data._embedded.cars);
        console.log(cars[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const getData = () => {
    const data = gridRef.current.getSelectedNodes();
    console.log(gridRef.current.getSelectedNodes()[0].data);
  };

  const columns = [
    { headerName: "brand", field: "brand", sortable: true, filter: true },
    { headerName: "color", field: "color", sortable: true, filter: true },
    { headerName: "model", field: "model", sortable: true, filter: true },
    { headerName: "fuel", field: "fuel", sortable: true, filter: true },
    { headerName: "year", field: "year", sortable: true, filter: true },
  ];

  return (
    <div>
      <div
        className="ag-theme-material"
        style={{ height: "700px", width: "70%", margin: "auto" }}
      >
        <button onClick={getData}>press</button>

        <CreateCar />

        <AgGridReact
          onGridReady={(params) => (gridRef.current = params.api)}
          ref={gridRef}
          rowSelection="single"
          columnDefs={columns}
          rowData={cars}
        />
      </div>
    </div>
  );
}
