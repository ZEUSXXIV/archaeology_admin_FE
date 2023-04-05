import React from "react";
import "../css/Categories.css";
import Logo from "../assets/logo512.png";
import { Typography } from "@mui/material";

const Categories = () => {
  const categories = [
    {
      name: "Whiskey",
      image: require('../assets/whiskey.jfif'),
    },
    {
      name: "Beer",
      image: require('../assets/beer.png'),
    },
    {
      name: "Vodka",
      image: require('../assets/vodka.jfif'),
    },
    {
        name: "Tequila",
        image: require('../assets/tequila.jpg'),
      },
    {
      name: "Gin",
      image: require('../assets/GIN.jfif'),
    },
    {
        name: "Rum",
        image: require('../assets/rum.png'),
      },
  ];

  return (
    <>
      <div className="cards">
        {categories.map((item, index) => {
            console.log(item)
            return(
          <div key = {index} className="card" style={{marginBottom: "50px", display:'flex', flexDirection:'column'}}>
            <img src={item.image} className="card" />
           <Typography variant="h5" textAlign="center">{item.name}</Typography>
          </div>
        )}
        )}
      </div>
    </>
  );
};

export default Categories;
