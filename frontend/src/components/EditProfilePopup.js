import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
// import usePopupClose from "../hooks/usePopupClose";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  // также устанавливаем дефолтное значение если данные еще не пришли

  React.useEffect(() => {
    setName(currentUser.name ?? "");
    setAbout(currentUser.about ?? "");
  }, [currentUser]);

  // Обработчик изменения инпута обновляет стейт
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about,
    });
  }

  // usePopupClose(props.isOpen, props.onClose)

  return (
    <PopupWithForm
      name="profile-popup"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      textButton="Cохранить"
      onSubmit={handleSubmit}
    >
      <div className="popup__input-position">
        <input
          className="popup__input popup__name-text popup__input_type_name"
          id="popup__name"
          type="text"
          value={name}
          onChange={handleChangeName}
          placeholder="Имя"
          name="name"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__input-error popup__name-error"></span>
      </div>
      <div className="popup__input-position">
        <input
          className="popup__input popup__name-text popup__input_type_job"
          id="popup__text"
          type="text"
          value={about}
          onChange={handleChangeDescription}
          placeholder="О себе"
          name="about"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__input-error popup__text-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
