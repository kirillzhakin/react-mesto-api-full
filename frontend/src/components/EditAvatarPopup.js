import React from "react";
import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="card-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__container-field">
        <input
          type="url"
          name="avatar"
          id="url-avatar"
          className="popup__field popup__field_type_avatar"
          placeholder="Ссылка на картинку"
          required
          ref={avatarRef}
        />
        <span id="url-avatar-error" className="error"></span>
      </div>

   
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
