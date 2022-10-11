import React from "react";
import { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__container-field">
        <input
          type="text"
          name="name"
          id="name-profile"
          className="popup__field popup__field_type_name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleChangeName}
        />
        <span id="name-profile-error" className="error"></span>
      </div>
      <div className="popup__container-field">
        <input
          type="text"
          name="about"
          id="about-profile"
          className="popup__field popup__field_type_about"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={handleChangeDescription}
        />
        <span id="about-profile-error" className="error"></span>
      </div>
    
    </PopupWithForm>
  );
}

export default EditProfilePopup;
