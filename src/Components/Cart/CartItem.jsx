import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import "./CartItem.css";
import { cartActions } from "../../store/cartSlice";

function CartItem(props) {
  const dispatch = useDispatch();
  const price = `₹${props.price}`;

  function addToCartHandler() {
    dispatch(
      cartActions.addToCart({
        id: props.id,
        name: props.name,
        amount: 1,
        price: props.price,
      })
    );
  }
  function removeFromCartHandler() {
    dispatch(cartActions.removeFromCart(props.id));
  }

  return (
    <li className="cart-item">
      <div>
        <h2>{props.name}</h2>
        <div className="cart-summary">
          <span className="cart-price">{price}</span>
          <motion.span
            key={props.amount}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ type: "tween", duration: 0.3 }}
            className="cart-amount"
          >
            x {props.amount}
          </motion.span>
        </div>
      </div>
      <div className="cart-actions">
        <motion.button
          whileHover={{
            scale: 1.1,
            transition: { type: "spring", duration: 0.3 },
          }}
          onClick={removeFromCartHandler}
        >
          -
        </motion.button>
        <motion.button
          whileHover={{
            scale: 1.1,
            transition: { type: "spring", duration: 0.3 },
          }}
          onClick={addToCartHandler}
        >
          +
        </motion.button>
      </div>
    </li>
  );
}

export default CartItem;
