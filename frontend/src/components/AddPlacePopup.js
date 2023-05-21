import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setTitle] = React.useState("");
  const [link, setPlace] = React.useState("");

  // Обработчик изменения инпута обновляет стейт
  function handleChangeName(e) {
    setTitle(e.target.value);
  }

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdatePlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setTitle('');
    setPlace('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="popup-add"
      title="Новое место"
      textButton="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-position">
        <input
          className="popup__input popup__name-text popup__input_type_title"
          id="popup__title"
          type="text"
          placeholder="Название"
          name="name"
          value={name}
          onChange={handleChangeName}
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__input-error popup__title-error"></span>
      </div>
      <div className="popup__input-position">
        <input
          className="popup__input popup__name-text popup__input_type_link"
          id="popup__link"
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          value={link}
          onChange={handleChangePlace}
          required
        />
        <span className="popup__input-error popup__link-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
