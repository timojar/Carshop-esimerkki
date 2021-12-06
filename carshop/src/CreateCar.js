import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useFormik } from "formik";

export default function Car() {
  const [open, setOpen] = React.useState(false);
  const closeModal = () => setOpen(false);

  const validate = (values) => {
    const errors = {};
    if (!values.brand) {
      errors.brand = "Required";
    }

    if (!values.color) {
      errors.color = "Required";
    }

    if (!values.model) {
      errors.model = "Required";
    }

    if (!values.fuel) {
      errors.fuel = "Required";
    }

    if (!values.year) {
      errors.year = "Required";
    } 

    return errors;
  };

  const sendData = (car) => {
    const carData = JSON.stringify(car);
    console.log(carData + "testinä");
    console.log(carData);
    fetch("https://carstockrest.herokuapp.com/cars", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: carData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const formik = useFormik({
    initialValues: {
      brand: "",
      color: "",
      model: "",
      fuel: "",
      year: 2020,
    },
    validate,
    onSubmit: (values) => {
      const car = { ...values };
      console.log(car);
      sendData(car);
      closeModal();
      window.location.reload(false);
    },
  });
  return (
    <div>
      <button
        type="button"
        className="button"
        onClick={() => setOpen((o) => !o)}
      >
        Add
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <button className="close" onClick={closeModal}>
          &times;
        </button>
        <form onSubmit={formik.handleSubmit}>
          <br />
          <label htmlFor="brand">Brand</label>
          <br />
          <input
            id="brand"
            name="brand"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.brand}
          />
          {formik.errors.brand ? <div>{formik.errors.brand}</div> : null}
          <br />
          <label htmlFor="color">Color</label>
          <br />
          <input
            id="color"
            name="color"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.color}
          />
          {formik.errors.color ? <div>{formik.errors.color}</div> : null}
          <br />
          <label htmlFor="model">Model</label>
          <br />
          <input
            id="model"
            name="model"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.model}
          />
          {formik.errors.model ? <div>{formik.errors.model}</div> : null}
          <br />
          <label htmlFor="fuel">Fuel</label>
          <br />
          <input
            id="fuel"
            name="fuel"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.fuel}
          />
          {formik.errors.fuel ? <div>{formik.errors.fuel}</div> : null}
          <br />
          <label htmlFor="year">year</label>
          <br />
          <input
            id="year"
            name="year"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.year}
          />
          {formik.errors.year ? <div>{formik.errors.year}</div> : null}
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </Popup>
    </div>
  );
}
