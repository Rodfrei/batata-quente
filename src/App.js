import "./App.css";
import { FilaCircular } from "./core/filaCircular";
import batata from "./assets/hot-potato.png";
import batata2 from "./assets/potato.png";
import coroa from "./assets/coroa.png";
import { useState } from "react";
import { Contador, Boneco } from "./components";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const filaCircular = new FilaCircular();

  const [nomes, setNomes] = useState([]);
  const [nome, setNome] = useState("");
  const [vencedor, setVencedor] = useState("");
  const [rodadas, setRodadas] = useState(1);
  const [isIniciado, setIsIniciado] = useState(false);
  const [historico, setHistorico] = useState([]);

  function handleNomeChange(event) {
    setNome(event.target.value);
  }

  function renderParticipantes() {
    if (nomes.length === 0) {
      return <p className="input-font">Não há nenhum participante!</p>;
    }

    return nomes.map((n, i) => <Boneco key={i} nome={n} />);
  }

  function handleAdicionarNome() {
    if (nome.length === 0) {
      toast.warn("O participante precisa de um nome!🤦‍♂️", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (nomes.includes(nome)) {
      toast.warn("Ja existe um participante com este nome!🤦‍♂️", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    setNomes((nomes) => [...nomes, nome]);
    setNome("");
  }

  function handleLimparNomes() {
    setNomes([]);
    setIsIniciado(false);
  }

  function handleIniciaJogo() {
    if (nomes.length <= 1) {
      toast.warn("Insira 2 ou mais jogadores!🤦‍♂️", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    setIsIniciado(true);

    const aux = [];

    nomes.forEach((n) => filaCircular.queue(n));

    for (let i = 0; i < nomes.length - 1; i++) {
      const aux1 = {};
      aux1.array = filaCircular.toArray();
      aux1.queimado = filaCircular.dequeue(rodadas);
      aux.push(aux1);
    }

    setHistorico(aux);

    setVencedor(filaCircular.first.value);
  }

  function renderJogo() {
    return historico.map((h, i) => {
      const queimadoIndex = h.array.findIndex((ar) => ar === h.queimado);
      return (
        <div key={i}>
          <p className="resultado resultado-rodada">Rodada {i + 1}</p>
          <div className="rodada-container">
            {h.array.map((participante, i) => {
              const isQueimado = i === queimadoIndex;
              return (
                <div key={i} className="participante-container">
                  <Boneco nome={participante} />
                  {isQueimado && (
                    <img
                      className="img-batata2"
                      src={batata2}
                      alt="batata do queimado"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <div className="container">
        <header className="header">
          <img className="img-batata1" src={batata} alt="batata quente" />
          <h1>Batata Quente!!</h1>
          <img className="img-batata1" src={batata} alt="batata quente" />
        </header>

        <Contador rodadas={rodadas} setRodadas={setRodadas} />

        <div className="participantes">
          <p className="input-font input-title">Participantes</p>
          <div className="participantes-input">
            <input
              className="nome-input"
              onChange={handleNomeChange}
              type="text"
              name="nome"
              value={nome}
              placeholder="Participante"
            />
            <button className="nome-input-butom" onClick={handleAdicionarNome}>
              Adicionar
            </button>
          </div>

          <div className="participantes-lista">
            <div className="bonecos-container">{renderParticipantes()}</div>
          </div>
          <div className="botoes-container">
            <button className="iniciar-butom" onClick={handleIniciaJogo}>
              Iniciar
            </button>
            <button className="nome-input-butom" onClick={handleLimparNomes}>
              Limpar
            </button>
          </div>
        </div>

        {isIniciado && (
          <>
            <div className="jogo-container">
              <p className="input-font input-title">Jogo</p>
              {renderJogo()}
            </div>
            <div className="jogo-container">
              <div className="vencedor-container">
                <img className="coroa" src={coroa} alt="coroa" />
                <p className="resultado-rodada input-title">Vencedor</p>
                <img className="coroa" src={coroa} alt="coroa" />
              </div>
              <p className="input-font input-title">{vencedor}</p>
            </div>
          </>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
