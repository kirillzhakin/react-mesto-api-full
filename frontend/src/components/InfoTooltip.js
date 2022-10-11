import successSignUpImg from "../images/Union_1.svg";
import notSuccessSignUpImg from "../images/Union_2.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container-infotooltip">
        <img
          src={props.isSuccess ? successSignUpImg : notSuccessSignUpImg}
          alt={
            props.isSuccess ? "Успешная регистрация" : "Не успешная регистрация"
          }
          className="popup__picture popup__picture-infotooltip"
        />
        <h2 className="popup__title popup__title-infotooltip">
          {props.isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
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

export default InfoTooltip;
