import PopupWithForm from "./PopupWithForm";
import success from "../images/Union_success.svg";
import fail from "../images/Union_fail.svg";

function InfoTooltip(props) {
    return (
      <PopupWithForm
        name="infoTooltip"
        isOpen={props.isOpen}
        onClose={props.onClose}
        picture={props.message != 'fail' ? success : fail}
        title={props.message != 'fail' ? props.successMessage : props.failMessage}
      >
      </PopupWithForm>
      );
  }
  
  export default InfoTooltip;