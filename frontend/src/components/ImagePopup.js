function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_picture ${
        props.card.isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container-picture">
        <figure
          name="form-popup"
          className="popup__form-picture popup__form_type_picture"
        >
          <img
            src={props.card.link}
            alt={props.card.name}
            className="popup__picture"
          />

          <h2 className="popup__title-picture">{props.card.name}</h2>
        </figure>
        <button
          aria-label="Выход"
          type="button"
          className="popup__close-btn"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
