function AuthForm(props) {
  return (
    <form onSubmit={props.onSubmit} className="popup__form  popup__form-route ">
      <h2 className="popup__title popup__title-route">{props.title}</h2>

      <input
        type="email"
        name="email"
        id="email"
        className="popup__field popup__field-route"
        placeholder="Email"
        required
        value={props.email}
        onChange={props.onChange}
      />

      <input
        type="password"
        name="password"
        id="password"
        className="popup__field popup__field-route "
        placeholder="Пароль"
        required
        value={props.password}
        onChange={props.onChange}
      />

      <button
        type="submit"
        name="submit"
        className="popup__button popup__button-route"
      >
        {props.buttonText}
      </button>
    </form>
  );
}

export default AuthForm;
