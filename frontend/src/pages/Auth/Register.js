import "./Auth.css"

// Components
import { Link } from "react-router-dom"

// Hooks
import { useState, useEffect } from "react"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      pass,
      confirmPass
    };
    console.log(user);
  }

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome" 
          onChange={(e) => 
          setName(e.target.value)} 
          value={name || ""}
        />
        <input 
          type="email" 
          placeholder="E-mail" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email || ""}
        />
        <input 
          type="password" 
          placeholder="Senha" 
          onChange={(e) => setPass(e.target.value)} 
          value={pass || ""}
        />
        <input 
          type="password" 
          placeholder="Confirme a senha" 
          onChange={(e) => setConfirmPass(e.target.value)} 
          value={confirmPass || ""}
        />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta? <Link to="/login"> Clique Aqui! </Link>
      </p>
    </div>
  )
}

export default Register