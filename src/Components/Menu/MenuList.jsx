import { useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";

import "./MenuList.css";
import Card from "../UI/Card.jsx";
import MenuItem from "./MenuItem";
import { getAllMeals } from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import CartButton from "../Cart/CartButton.jsx";
import { cartActions } from "../../store/cartSlice.js";

function MenuList() {
  const dispatch = useDispatch();
  const isloggedIn = useSelector((state) => state.login.isloggedIn);
  const cartItems = useSelector((state) => state.cart.items);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["meals"],
    queryFn: getAllMeals,
  });

  const localCart = localStorage.getItem("cart");
  useEffect(() => {
    if (localCart) {
      const cartData = JSON.parse(localCart);
      dispatch(
        cartActions.replaceCart({
          items: cartData.items,
          totalAmount: cartData.totalAmount,
        })
      );
    }
  }, [localCart]);
  useEffect(() => {
    if (isError) {
      throw error;
    }
  }, [isError, error]);

  const cartCount = cartItems.length;

  const loadedMeals = [];

  for (const key in data) {
    loadedMeals.push({
      id: key,
      name: data[key].name,
      description: data[key].description,
      price: data[key].price,
    });
  }

  const mealList = loadedMeals.map((meal) => (
    <MenuItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 75 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="meals"
      >
        <div className="cart-nav">
          <Card>
            <h2>Menu</h2>
            {isloggedIn && <CartButton key={cartCount} count={cartCount} />}
          </Card>
        </div>
        <Card>
          <ul>
            {isLoading && (
              <div style={{ textAlign: "center" }}>
                <LoadingIndicator />
              </div>
            )}
            {data && mealList}
          </ul>
        </Card>
      </motion.section>
    </>
  );
}

export default MenuList;
