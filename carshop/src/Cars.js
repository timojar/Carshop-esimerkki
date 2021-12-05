import React from "react";

export default function Activities() {
  const [cars, setCars] = React.useState([]);

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

  return (
    <div>
      {cars.map((c, index) => (
        <p key={index}>
          {c.brand} {c.color} {c.model}{c.fuel} {c.year}
        </p>
      ))}
    </div>
  );
}
