import React from "react";
import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setNameCard] = useState("");
  const [link, setLink] = useState("");

  function handleChangeNameCard(e) {
    setNameCard(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    setNameCard("");
    setLink("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__container-field">
        <input
          type="text"
          name="name"
          id="name-card"
          className="popup__field popup__field_type_title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleChangeNameCard}
        />
        <span id="name-card-error" className="error"></span>
      </div>
      <div className="popup__container-field">
        <input
          type="url"
          name="link"
          id="url-card"
          className="popup__field popup__field_type_link"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handleChangeLink}
        />
        <span id="url-card-error" className="error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
