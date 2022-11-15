function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup image-popup ${card ? "popup_opened" : ""}`}>
      <div className="image-popup__container" noValidate>
        <button
          onClick={onClose}
          className="popup__close image-popup__close"
          type="button"
        ></button>
        <img src={`${card ? card.link : ""}`} className="image-popup__foto" />
        <h2 className="image-popup__title"></h2>
      </div>
    </section>
  );
}

export default ImagePopup;
