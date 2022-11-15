import PopupWithForm from "./PopupWithForm";
import React, { useRef, useEffect } from "react";

function EditAvatarPopup(props) {
  const inputRef = useRef(null);
  
function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(inputRef.current.value);
  }

  useEffect(() => {
    inputRef.current.value = '';
  }, [props.isOpen]); 

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="url"
        name="link"
        id="avatar-name"
        className="popup__field popup__field-for-name popup__field-for-name_type_avatar"
        minLength={2}
        required
        placeholder="Ссылка на аватар"
        ref={inputRef}
      />
      <span className="popup__error avatar-name-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
