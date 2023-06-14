import React from "react";
import "./Card.css";
import Img1 from "../assets/profile.png";
import Img2 from "../assets/presentation.png";
import Img3 from "../assets/web-traffic.png";

const Card = ({ title, value }) => {
  let image;
  if (title == "Sessions") {
    image = Img2;
  } else if (title == "Users") {
    image = Img1;
  } else if (title == "Page Views") {
    image = Img3;
  }

  return (
    <>
      <div class="card">
        <div class="title">
          <img src={image} height={50} width={50} />
          <p class="title-text">{title}</p>
        </div>
        <div class="data">
            
          <p>{value}</p>

          <div class="range">
            <div class="fill"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
