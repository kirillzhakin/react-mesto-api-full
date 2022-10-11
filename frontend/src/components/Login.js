import React, { useState } from "react";
import AuthForm from "./AuthForm";

function Login({ onLogin }) {
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
    onLogin({ email: inputs.email, password: inputs.password });
  }
  return (
    <AuthForm
      title="Вход"
      buttonText="Войти"
      email={inputs.email}
      password={inputs.password}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

export default Login;
