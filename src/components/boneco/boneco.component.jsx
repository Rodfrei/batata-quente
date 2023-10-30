import React from "react";
import "./boneco.style.css";
import boneco from "../../assets/stickman.svg";

export function Boneco({ nome }) {
  return (
    <div className="boneco-container">
      <img className="boneco-img" src={boneco} alt="stickman" />
      <p className="input-font">{nome}</p>
    </div>
  );
}
