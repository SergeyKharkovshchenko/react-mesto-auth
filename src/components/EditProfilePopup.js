import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useEffect, useState, useContext } from "react";

function EditProfilePopup(props) {

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        name="name"
        type="text"
        id="edit-name"
        className="popup__field popup__field-for-name popup__field-for-name_type_edit"
        minLength={2}
        maxLength={40}
        required
        placeholder="Имя"
        value={name || ''}
        onChange={handleNameChange}
      />
      <span className="popup__error edit-name-error"></span>
      <input
        name="description"
        type="text"
        id="edit-job"
        className="popup__field popup__field-for-job popup__field-for-job_type_edit"
        minLength={2}
        maxLength={200}
        required
        placeholder="Описание"
        value={description || ''}
        onChange={handleDescriptionChange}
      />
      <span className="popup__error edit-job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
