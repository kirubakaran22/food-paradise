import { useState } from "react";
import { Link, useSubmit } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

import "./Home.css";
import mealsImage from "../assets/images/meals.jpg";
import { loginAction } from "../store/loginStatusSlice";
import { cartActions } from "../store/cartSlice";
import Confirm from "../Components/UI/Confirm";

function HomePage() {
  const isloggedIn = useSelector((state) => state.login.isloggedIn);

  const [confirmLogOut, setConfirmLogout] = useState(false);

  const submit = useSubmit();
  const dispatch = useDispatch();

  const { scrollY } = useScroll();

  const yForImage = useTransform(scrollY, [0, 200], [0, -150]);
  const yForSection = useTransform(
    scrollY,
    [0, 200, 300, 500],
    [0, 50, 50, 80]
  );
  const scaleForSection = useTransform(scrollY, [0, 300], [1, 1.1]);

  function logOutHandler() {
    setConfirmLogout(true);
  }
  function confirmLogOutHandler() {
    dispatch(loginAction.logout());
    dispatch(cartActions.clearCart());
    submit(null, { method: "post", action: "/logout" });
    setConfirmLogout(false);
  }
  function cancelLogOutHandler() {
    setConfirmLogout(false);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0.5, y: -40 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ y: yForImage }}
        className="main-image"
      >
        <div className="overlay"></div>
        <img src={mealsImage} alt="Table full of Meals" />
      </motion.div>
      <motion.section
        initial={{ opacity: 0, y: 75 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ y: yForSection, scale: scaleForSection }}
        className="summary"
      >
        <h2>Delicious Food, Delivered To You</h2>
        <p>
          Choose your favorite meal from our broad selection of available meals
          and enjoy a delicious lunch or dinner at home.
        </p>
        <p>
          All our meals are cooked with high-quality ingredients, just-in-time
          and of course by experienced chefs!
        </p>
        <p>Discover the pleasure of fresh food conveniently delivered. </p>
      </motion.section>
      <motion.div className="explore">
        <Link to="/menu">
          <motion.button
            initial={{ opacity: 0, y: 75 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ y: yForSection }}
            whileHover={{
              scale: 1.1,
              transition: { type: "spring", duration: 0.3 },
            }}
          >
            Explore Menu
          </motion.button>
        </Link>
      </motion.div>
      <section className="section2">
        <p>Order with ease</p>
        <h2>Convenient and hassle-free food ordering</h2>
        <p>Browse our menu, place your order, and Enjoy your food.</p>
      </section>
      <footer className="home-footer">
        <Link to="/">
          <h2>Food Paradise</h2>
        </Link>
        <div>
          <ul>
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: { type: "spring", duration: 0.2 },
              }}
            >
              {!isloggedIn && <Link to="login?mode=login">Log in</Link>}
              {isloggedIn && (
                <button onClick={logOutHandler} className="logout-button">
                  Log out
                </button>
              )}
            </motion.li>
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: { type: "spring", duration: 0.3 },
              }}
            >
              <Link to="/menu">Explore</Link>
            </motion.li>
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: { type: "spring", duration: 0.3 },
              }}
            >
              <Link to="/">Customer support</Link>
            </motion.li>
          </ul>
        </div>
      </footer>
      <AnimatePresence>
        {confirmLogOut && (
          <Confirm
            title="Are you sure?"
            msg="Your Account will be logged out!."
            onOk={confirmLogOutHandler}
            onCancel={cancelLogOutHandler}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default HomePage;
