function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <form
          name={props.name}
          className={`popup__form popup__form_type_${props.name}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}

          <input
            type="submit"
            name="submit"
            value={props.buttonText}            
            className="popup__button popup__button_type_save"
          />
        </form>
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

export default PopupWithForm;
