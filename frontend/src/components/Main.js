import React from "react";
import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <div
            alt="Аватар"
            className="profile__avatar-picture"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
          <button
            onClick={props.onEditAvatar}
            aria-label="Изменить аватар"
            type="button"
            className="profile__button-avatar"
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__add-profile">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfile}
              aria-label="Изменить профиль"
              type="button"
              className="profile__button-pen"
            ></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          aria-label="Добавить содержимое"
          type="button"
          className="profile__button-plus"
        ></button>
      </section>

      <section className="elements">
        {props.cards.map((item) => {
          return (
            <Card
              key={item._id}
              {...item}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
