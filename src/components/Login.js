import PopupWithForm from "./PopupWithForm";
import React, { useCallback, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";


export const Login = ({isLoggedIn, onLogin}) => {

  const [userData, setUserData] = useState({
    password: '',
    email: ''
  })

  const [message, setMessage] = useState ('')
  const [password, setName] = useState("");
  const [email, setDescription] = useState("");

  const cbChange = useCallback(
    (event) => {
      const {name, value} = event.target;
      setUserData ({
        ...userData,
        [name]: value
      })
    },
    [userData],
  )

  const cbSubmit = useCallback (async(event) => {
    event.preventDefault();
    try{
      await onLogin(userData.email, userData.password);  
    } catch (err) {
      setMessage (err.message || 'Ошибка')
    }
    
  }, [userData, onLogin])

if (isLoggedIn) {
  return <Redirect to='/' />
}
      
    return (
    <PopupWithForm
      name="login"
      title="Sign in"
      isOpen={true}
      // onClose={props.onClose}
      buttonText="Confirm"
      onSubmit={(e) => cbSubmit(e)}
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
        value={userData.email || ''}
        onChange={cbChange}
        reg_link=''
      />
      <span className="popup__error edit-name-error"></span>
      <input
        name="password"
        type="password"
        id="edit-job"
        className="popup__field popup__field-for-job popup__field-for-job_type_edit popup__field-register"
        minLength={2}
        maxLength={200}
        required
        placeholder="Password"
        value={userData.password || ''}
        onChange={cbChange}
      />
      <span className="popup__error edit-job-error"></span>
    </PopupWithForm>
    );
  }
  
  export default Login;