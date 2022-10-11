import imageMesto from "../images/header-mesto-russia.svg";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  let location = useLocation();
  let { email } = props.userData || {};
 
  return (
    <header className="header">
      <img src={imageMesto} alt="Место Россия" className="logo" />
      {props.isLoggedIn && <h2 className="header__email">{email}</h2>}
      <ul className="header__nav">
        {!props.isLoggedIn && (
          <li>
            {location.pathname === "/sign-in" && (
              <Link
                className="header__button "
                type="button"
                aria-label="Кнопка"
                to="/sign-up"
              >
                Регистрация
              </Link>
            )}
          </li>
        )}
        {!props.isLoggedIn && (
          <li>
            {location.pathname === "/sign-up" && (
              <Link
                className="header__button "
                type="button"
                aria-label="Кнопка"
                to="/sign-in"
              >
                Войти
              </Link>
            )}
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <Link
              className="header__button"
              type="button"
              aria-label="Кнопка"
              to="/sign-in"
              onClick={props.handleSignOut}
            >
              Выйти
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
