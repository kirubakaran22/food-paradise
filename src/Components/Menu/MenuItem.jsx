import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./MenuItem.css";
import MealItemForm from "./MenuForm";
import { cartActions } from "../../store/cartSlice";

function MenuItem(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isloggedIn = useSelector((state) => state.login.isloggedIn);

  const price = `₹${props.price}`;

  function addToCartHandler(amount) {
    if (isloggedIn) {
      dispatch(
        cartActions.addToCart({
          id: props.id,
          name: props.name,
          amount: amount,
          price: props.price,
        })
      );
    } else {
      navigate("/login?mode=login");
    }
  }

  return (
    <li className="meal">
      <div>
        <h3>{props.name}</h3>
        <div className="description">{props.description}</div>
        <div className="price">{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
    </li>
  );
}

export default MenuItem;
