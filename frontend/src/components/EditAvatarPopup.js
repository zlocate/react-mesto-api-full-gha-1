import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="popup-new-avatar"
      title="Обновить аватар"
      textButton="Cохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-position">
        <input
          className="popup__input popup__name-text popup__input_type_avatar"
          id="popup__newAvatar"
          type="url"
          name="link"
          ref={avatarRef}
          required
        />
        <span className="popup__input-error popup__newAvatar-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
