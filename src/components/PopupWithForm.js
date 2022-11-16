import React from "react";

function PopupWithForm({
  picture,
  name,
  isOpen,
  buttonText,
  children,
  title,
  onClose,
  onSubmit,
  reg_link,
}) {
  return (
    <section className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <img className={`popup-foto_${name}`} src={picture} />
      <form
        className={`popup__container popup__form-${name}`}
        // noValidate
        onSubmit={onSubmit}
      >
        <fieldset className={`popup__set popup__form-${name}`} name="AddForm">
          <button
            onClick={onClose}
            className={`popup__close popup__close_type_${name}`}
            type="button"
          />
          <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
          {children}
          <button
            type="submit"
            className={`popup__submit-button popup__submit-button_type-${name}`}
            // disabled
          >
            {buttonText}
          </button>
          {reg_link}
        </fieldset>
      </form>
    </section>
  );
}

export default PopupWithForm;
