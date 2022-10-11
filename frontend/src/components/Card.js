import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  
  const card = {
    link: props.link,
    name: props.name,
    ownerId: props.owner,
    likes: props.likes,
    cardId: props._id,
  };
 
  function handleClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  const isOwn = card.ownerId !== currentUser._id;
  const cardDeleteButtonClassName = `element__trash ${
    isOwn ? "element__trash_block" : ""
  }`;

  const isLiked = card.likes.some((id) => id === currentUser._id);
  const cardLikeButtonClassName = `element__heart ${
    isLiked ? "element__heart_active" : ""
  }`;

  return (
    <div className="element">
      <img
        onClick={handleClick}
        src={props.link}
        alt={props.name}
        className="element__photo"
      />
      <button
        aria-label="Корзина"
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="element__about">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__heart-container">
          <button
            aria-label="Нравится"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <h3 className="element__heart-number">{props.likes.length}</h3>
        </div>
      </div>
    </div>
  );
}

export default Card;
