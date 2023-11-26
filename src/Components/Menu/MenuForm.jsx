import { useRef, useState } from "react";
import { motion } from "framer-motion";

import Input from "../UI/Input.jsx";
import "./MenuForm.css";

function MealItemForm(props) {
  const [amountIsValid, setAmmountIsValid] = useState(true);

  const amountInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmmountIsValid(false);
      return;
    } else {
      setAmmountIsValid(true);
    }

    props.onAddToCart(enteredAmountNumber);
  }

  return (
    <form className="form" onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Quantity"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      {!amountIsValid && (
        <p style={{ fontSize: "0.8rem" }}>Please enter a valid amount(1-5)</p>
      )}
      <motion.button
        whileHover={{
          scale: 1.1,
          transition: { type: "spring", duration: 0.3 },
        }}
      >
        + Add
      </motion.button>
    </form>
  );
}

export default MealItemForm;
