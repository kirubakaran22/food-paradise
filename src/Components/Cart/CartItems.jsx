import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import "./CartItems.css";
import CartItem from "./CartItem";
import Card from "../UI/Card";
import OrderForm from "../Order/OrderForm";
import LoadingIndicator from "../UI/LoadingIndicator";
import { cartActions } from "../../store/cartSlice";
import { deleteCartData, updatecart } from "../../util/http";
import Confirm from "../UI/Confirm";

function CartItems() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(false);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: updatecart,
  });
  useEffect(() => {
    if (isError) {
      throw error;
    }
  }, [isError, error]);
  const {
    mutate: deleteMutate,
    isError: isDeleteError,
    deleteError,
  } = useMutation({
    mutationFn: deleteCartData,
  });
  useEffect(() => {
    if (isDeleteError) {
      throw deleteError;
    }
  }, [isDeleteError, deleteError]);

  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.items);
  const hasItems = cartItems.length > 0;

  const finaltotalAmount = `₹${totalAmount}`;

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

  function addMoreHandler() {
    navigate("/menu");
  }
  function clearCartHandler() {
    dispatch(cartActions.clearCart());
    setIsSaved(false);
    deleteMutate();
  }
  function saveCartHandler() {
    setIsSaved(true);
    localStorage.setItem(
      "cart",
      JSON.stringify({
        items: cartItems,
        totalAmount: totalAmount,
      })
    );
    mutate({
      details: {
        items: cartItems,
        totalAmount: totalAmount,
      },
    });
  }

  function orderHandler() {
    setIsCheckOut(true);
  }
  function cancelOrderHandler() {
    setIsCheckOut(false);
  }
  function confirmOrderHandler() {
    setOrderPlaced(true);
    dispatch(cartActions.clearCart());
    deleteMutate();
    setIsCheckOut(false);
  }
  function okHandler() {
    setOrderPlaced(false);
    navigate("/");
  }
  function savedOkHandler() {
    setIsSaved(false);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="cart-container"
      >
        <div className="cart-nav">
          <Card>
            <h2>Cart</h2>
            <motion.span
              key={cartItems.length}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ type: "tween", duration: 0.3 }}
              className="badge"
            >
              {cartItems.length}
            </motion.span>
          </Card>
        </div>
        {(isPending || isSuccess) && isSaved && (
          <div className="cart-save">
            <Card>
              <div style={{ textAlign: "center" }}>
                {isPending && <LoadingIndicator />}
                {isSuccess && (
                  <div className="saved">
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "green",
                      }}
                    >
                      Saved Successfully
                    </div>
                    <button className="saved-ok" onClick={savedOkHandler}>
                      ok
                    </button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
        <Card>
          {hasItems && (
            <>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    id={item.id}
                  />
                ))}
              </ul>
              <div className="total">
                <span>Total Amount</span>
                <span>{finaltotalAmount}</span>
              </div>
              <div className="actions">
                <div>
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      transition: { type: "spring", duration: 0.3 },
                    }}
                    className="button--alt"
                    onClick={clearCartHandler}
                  >
                    Clear
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      transition: { type: "spring", duration: 0.3 },
                    }}
                    className="cart-button"
                    onClick={addMoreHandler}
                  >
                    Add More
                  </motion.button>
                </div>
                <div>
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      transition: { type: "spring", duration: 0.3 },
                    }}
                    className="cart-button"
                    onClick={saveCartHandler}
                  >
                    Save
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      transition: { type: "spring", duration: 0.3 },
                    }}
                    className="cart-button"
                    onClick={orderHandler}
                  >
                    Order
                  </motion.button>
                </div>
              </div>
            </>
          )}
          {!hasItems && (
            <div className="cart-fallBack">
              <h3>Your Cart is Empty</h3>
              <p>Explore our menu and add some.</p>
              <Link to="/menu">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    transition: { type: "spring", duration: 0.3 },
                  }}
                >
                  Explore
                </motion.button>
              </Link>
            </div>
          )}
        </Card>
        <AnimatePresence>
          {isCheckOut && (
            <OrderForm
              onCancel={cancelOrderHandler}
              onConfirm={confirmOrderHandler}
            />
          )}
        </AnimatePresence>
        {orderPlaced && (
          <Confirm
            title="Order Placed"
            msg="Your order has been sucessfully placed."
            onOk={okHandler}
          />
        )}
      </motion.div>
    </>
  );
}

export default CartItems;
