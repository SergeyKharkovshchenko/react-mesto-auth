import PopupWithForm from "./PopupWithForm";
import React, { useEffect, useState } from "react";

function AddPlacePopup(props) {

    const [name, setName] = useState('');
    const [link , setLink ] = useState('');

    function handleNameChange(e) {
        setName(e.target.value);
      }

    function handleLinkChange(e) {
        setLink(e.target.value);
      }

      function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(name, link)
      } 

      useEffect(() => {
        setName('');
        setLink('');
      }, [props.isOpen]); 

    return (

        <PopupWithForm
          name="add"
          title="New card"
          isOpen={props.isOpen}
          onClose={props.onClose}
          buttonText = "Create"
          onSubmit={(e)=>handleSubmit(e)}
        >
          <input
            type="text"
            name="name"
            id="add-name"
            className="popup__field popup__field-for-name popup__field-for-name_type_add"
            minLength={2}
            maxLength={30}
            required
            placeholder="Name"
            value={name || ''}
            onChange = {handleNameChange}
          />
          <span className="popup__error add-name-error"></span>
          <input
            type="url"
            name="link"
            id="add-job"
            className="popup__field popup__field-for-job popup__field-for-job_type_add"
            required
            placeholder="Link to picture"
            value={link || ''}
            onChange = {handleLinkChange}
          />
          <span className="popup__error add-job-error"></span>
        </PopupWithForm>

);
}

export default AddPlacePopup;
