import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import "./CartButton.css";
import CartIcon from "./CartIcon.jsx";

function CartButton(props) {
  const navigate = useNavigate();
  function cartButtonClickHandler() {
    navigate("/cart");
  }

  return (
    <motion.button
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ type: "tween", duration: 0.3 }}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", duration: 0.3 },
      }}
      className="button"
      onClick={cartButtonClickHandler}
    >
      <span className="icon">
        <CartIcon />
      </span>
      <span>My Cart</span>
      <span className="badge">{props.count}</span>
    </motion.button>
  );
}

export default CartButton;
