import React from "react";
import batata from "../../assets/hot-potato2.png";
import mais from "../../assets/adicionar.png";
import menos from "../../assets/menos.png";

import "./contador.style.css";

export function Contador({ rodadas, setRodadas }) {
  function renderBatatas() {
    const imagens = [];
    for (let i = 0; i < rodadas; i++) {
      imagens.push(
        <img key={i} className="batatas" src={batata} alt={`Imagem ${i}`} />
      );
    }
    return imagens.map((i) => i);
  }

  function handleMais() {
    setRodadas((rodadas) => (rodadas += 1));
  }

  function handleMenos() {
    if (rodadas === 1) {
    } else {
      setRodadas((rodadas) => (rodadas -= 1));
    }
  }

  return (
    <div className="contador-container">
      <p className="input-font input-title">
        Numero vezes que a batata irá passar: {rodadas}
      </p>

      <div className="contador-container-input">
        <img
          className="contador-butom"
          onClick={handleMenos}
          src={menos}
          alt=""
        />
        <div className="batatas-container">{renderBatatas()}</div>
        <img
          className="contador-butom"
          onClick={handleMais}
          src={mais}
          alt=""
        />
      </div>
    </div>
  );
}
