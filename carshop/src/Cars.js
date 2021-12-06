import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "reactjs-popup/dist/index.css";
import CreateCar from "./CreateCar";
import { CSVLink, CSVDownload } from "react-csv";

export default function Cars() {
  const [gridApi, setGridApi] = React.useState(null);
  const [cars, setCars] = React.useState([]);
  const gridRef = React.useRef();
  const csvData = cars;

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

  const deleteCar = () => {
    const url = gridRef.current.getSelectedNodes()[0].data._links.car.href;
    sendData(url);
  };

  const sendData = (id) => {
    console.log(id + "testinä");
    fetch(id, {
      method: "DELETE",
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
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
        <button onClick={deleteCar}>Delete</button>        

        <CreateCar />
        <CSVLink data={csvData}>Export</CSVLink>;
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
