function ImagePopup(props) {

  return (
    <section
      className={`popup popup-image ${props.card ? "popup_opened" : " "}`}
    >
      <figure className="popup-image__container">
        <div className="popup-image__item">
          <button
            className="popup__close popup-image__close"
            type="button"
            onClick={props.onClose}
          />
          <img
            src={props.card ? props.card.link : ""}
            alt={props.card ? props.card.name : ""}
            className="popup-image__img"
          />
          <p className="popup-image__title">
            {props.card ? props.card.name : ""}
          </p>
        </div>
      </figure>
    </section>
  );
}

export default ImagePopup;
