import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, like, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__item">
        <p className="element__title" name="name">
          {card.name}
        </p>
        {isOwn && (
          <button className="element__delete" onClick={handleDeleteClick} />
        )}
        <div className="element__likes-and-number">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="element__like-number">{like}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
