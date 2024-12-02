// src/components/Register.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css"; // Importa o estilo de cadastro

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    localStorage.setItem("registeredUsername", username);
    localStorage.setItem("registeredPassword", password);
    alert("Cadastro realizado com sucesso!");
    navigate("/login"); // Redireciona para a página de login após o cadastro
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Cadastro</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>
        <p>
          Já possui conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
