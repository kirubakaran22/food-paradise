import { useRef, useState } from "react";

import "./OrderForm.css";
import Modal from "../UI/Modal.jsx";

const isEmpty = (value) => value.trim() === "";
const isSix = (value) => value.trim().length === 6;

function OrderForm(props) {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isSix(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameControlClasses = `order-control ${
    formInputsValidity.name ? "" : "order-invalid"
  }`;
  const streetControlClasses = `order-control ${
    formInputsValidity.street ? "" : "order-invalid"
  }`;
  const postalCodeControlClasses = `order-control ${
    formInputsValidity.postalCode ? "" : "order-invalid"
  }`;
  const cityControlClasses = `order-control ${
    formInputsValidity.city ? "" : "order-invalid"
  }`;

  return (
    <Modal title="Place Order">
      <form className="order-form" onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameInputRef} />
          {!formInputsValidity.name && <p>Please Enter a valid name!</p>}
        </div>
        <div className={streetControlClasses}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetInputRef} />
          {!formInputsValidity.street && <p>Please Enter a valid Street!</p>}
        </div>
        <div className={postalCodeControlClasses}>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" ref={postalCodeInputRef} />
          {!formInputsValidity.postalCode && (
            <p>Please Enter a valid Postal Code!</p>
          )}
        </div>
        <div className={cityControlClasses}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityInputRef} />
          {!formInputsValidity.city && <p>Please Enter a valid city!</p>}
        </div>
        <div className="order-actions">
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button className="order-submit">Confirm</button>
        </div>
      </form>
    </Modal>
  );
}

export default OrderForm;
