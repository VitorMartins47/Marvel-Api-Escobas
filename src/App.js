import React, { useState } from "react";
import axios from "axios";
import md5 from "md5";
import "./App.css"; // Importa o CSS aqui

const Login = ({ onLogin }) => {
  const [ra, setRA] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (ra === senha && ra !== "") {
      onLogin(ra);
    } else {
      alert("Use o RA como usuário e senha.");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="RA"
        value={ra}
        onChange={(e) => setRA(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const Marvel = () => {
  const [character, setCharacter] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const publicKey = 'ba63388ce343d9a673325344cd77ac22';
  const privateKey = '2b37f8d71658e6bcaf622ded2a0bc990a06755bd';
  const ts = Date.now();
  const hash = md5(ts + privateKey + publicKey);

  const handleSearch = async () => {
    if (!character) {
      alert("Digite o nome de um personagem!");
      return;
    }

    setLoading(true);

    const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${character}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
      const response = await axios.get(url);
      setInfo(response.data.data.results[0]);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar o personagem", error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Marvel Character Search</h2>
      <input
        type="text"
        placeholder="Digite o nome do personagem"
        value={character}
        onChange={(e) => setCharacter(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      
      {loading && <p>Carregando...</p>}
      
      {info && (
        <div>
          <h3>{info.name}</h3>
          <img src={`${info.thumbnail.path}.${info.thumbnail.extension}`} alt={info.name} />
          <p>{info.description || "Nenhuma descrição disponível"}</p>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ra, setRA] = useState(null);

  const handleLogin = (ra) => {
    setRA(ra);
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? <Marvel /> : <Login onLogin={handleLogin} />}
    </div>
  );
};

export default App;
