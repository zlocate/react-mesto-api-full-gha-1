function InfoTooltip({ isOpen, image, title, onClose }) {

  return (
    <div className={`popup ${isOpen ? "popup_opened" : " "}`} onClick={onClose}>
      <div className="popup__container">
        <img className="popup__image" src={image} alt={title} />
        <h2 className="popup__text">{title}</h2>
        <button className="popup__close" type="button" onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;
