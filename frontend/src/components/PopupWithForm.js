import React from "react";
import usePopupClose from "../hooks/usePopupClose";

function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  textButton,
  onSubmit,
}) {
  usePopupClose(isOpen, onClose)
  
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : " "}`}
    >
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__type_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__save popup__save-text" type="submit">
            {textButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
