import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCard } from "../contexts/CurrentCard";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUserData = React.useContext(CurrentUserContext);
  const currentCardsData = React.useContext(CurrentCard);

  return (
      <main>
        <section className="profile">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img
              className="profile__avatar"
              src={currentUserData.avatar}
              alt="Фото профиля"
            />
          </div>
          <div className="profile__name">
            <div className="profile__intro">
              <h1 className="profile__intro-title">{currentUserData.name}</h1>
              <button
                className="profile__button-edit"
                type="button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__intro-subtitle">{currentUserData.about}</p>
          </div>

          <button
            className="profile__button-add"
            type="button"
            onClick={onAddPlace}
          />
        </section>

      <section className="elements">
        {currentCardsData.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              link={card.link}
              name={card.name}
              like={card.likes.length}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
