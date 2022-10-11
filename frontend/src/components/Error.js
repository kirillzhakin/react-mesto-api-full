import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <>
      <form
        name="error"
        title="Ошибка"
        className="popup__form  popup__form-route"
      >
        <h2 className="popup__title popup__title-route">
          Ошибка: <span>404!</span> Страница не найдена!
        </h2>
      </form>
      <div className="popup__signin">
        <Link className="popup__nav" to="/">
          Вернуться на главную страницу
        </Link>
      </div>
    </>
  );
}

export default Error;
