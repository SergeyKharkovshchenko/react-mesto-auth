import PopupWithForm from "./PopupWithForm";
import React, { useCallback, useState } from "react";
import { Redirect, Link } from "react-router-dom";

export const Register = ({isLoggedIn, onRegister}) => {

 const [formData, setFormData] = useState ({
    password: '',
    email: '',
    message: ''
  })

const cbChange = useCallback(
  (event) => {
    const {name, value} = event.target;
    setFormData ({
      ...formData,
      [name]: value
    })
  },
  [formData],
)

const cbSubmit = useCallback (event => {
  event.preventDefault();
  onRegister(formData.email, formData.password);
}, [onRegister, formData])

  if (isLoggedIn) {
    return <Redirect to='/' />
  }

    return (
    <PopupWithForm
        name="register"
        title="Регистрация"
        isOpen={true}
        // onClose={onClose}
        buttonText="Зарегистрироваться"
        onSubmit={(e) => cbSubmit(e)}
        reg_link=
          <Link className="link register__link" to="./signin">
          Уже зарегистрированы? Войти
        </Link>
        
      >
        <input
          name="email"
          type="email"
          id="edit-name"
          className="popup__field popup__field-for-name popup__field-for-name_type_edit popup__field-register"
          minLength={2}
          maxLength={40}
          required
          placeholder="email"
          value={formData.email || ''}
          onChange={cbChange} />
        <span className="popup__error edit-name-error"></span>
        <input
          name="password"
          type="password"
          id="edit-job"
          className="popup__field popup__field-for-job popup__field-for-job_type_edit popup__field-register"
          minLength={2}
          maxLength={200}
          required
          placeholder="Пароль"
          value={formData.password || ''}
          onChange={cbChange} />
        <span className="popup__error edit-job-error"></span>
      </PopupWithForm>
    );
  }
  
  export default Register;