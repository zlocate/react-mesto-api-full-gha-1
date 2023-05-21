export const options = {
  url: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "f1b678bd-8daa-4ddc-9a95-4730e9a93182",
    "Content-Type": "application/json",
  },
};

// переменные попапов
const popupEdit = document.querySelector(".profile-popup");
const popupAdd = document.querySelector(".popup-add");
export const popupAvatar = document.querySelector(".popup-new-avatar");

// кнопки по открытию попапов
export const buttonEditOpen = document.querySelector(".profile__button-edit");
export const buttonAddOpen = document.querySelector(".profile__button-add");
export const buttonEditAvatar = document.querySelector(
  ".profile__avatar-container"
);

// кнопки по закрытию попапов
export const buttonCloseEdit = popupEdit.querySelector(".popup__close");
export const buttonCloseAdd = popupAdd.querySelector(".popup__close");
export const buttonCloseAvatar = popupAvatar.querySelector(".popup__close");

// переменные для хранения информации в попапах и формах

export const profileForm = document.querySelector(".popup__edit-form");
export const formElementAdd = document.querySelector(".popup__add-form");
export const avatarFormElement = document.querySelector(".popup__avatar-form");

// инпуты внутри попапов и формы
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_job");
export const avatarImg = document.querySelector(".popup__input_type_avatar");

export const formInputCardName = document.querySelector(
  ".popup__input_type_title"
);
export const formInputCardLink = document.querySelector(
  ".popup__input_type_link"
);

// переменные для удаления карточек
export const elementDelete = document.querySelector(".element__delete");

// переменные для добавления новых карточек
export const cardsContainer = document.querySelector(".elements");

// валидация форм
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__error_visible",
};
