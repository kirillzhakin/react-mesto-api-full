import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register({ onRegister }) {
  const [inputs, setState] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setState({ ...inputs, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ email: inputs.email, password: inputs.password });
  }

  return (
    <>
      <AuthForm
        title="Регистрация"
        buttonText="Зарегестрироваться"
        email={inputs.email}
        password={inputs.password}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <div className="popup__signin">
        <p className="popup__signin-paragraf">Уже зарегистрированы?</p>
        <Link className="popup__nav" to="/sign-in">
          Войти
        </Link>
      </div>
    </>
  );
}

export default Register;
