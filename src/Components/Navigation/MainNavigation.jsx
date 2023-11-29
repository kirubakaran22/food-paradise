import { useState } from "react";
import { Link, NavLink, useSubmit } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useIsFetching } from "@tanstack/react-query";

import "./MainNavigation.css";
import { loginAction } from "../../store/loginStatusSlice";
import { cartActions } from "../../store/cartSlice";
import Confirm from "../UI/Confirm";

function MainNavigation() {
  const fetching = useIsFetching();
  const isloggedIn = useSelector((state) => state.login.isloggedIn);
  const dispatch = useDispatch();
  const submit = useSubmit();
  const [confirmLogOut, setConfirmLogout] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  function logOutHandler() {
    setConfirmLogout(true);
    setHamburgerOpen(false);
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
  function hamburgerClickHandler() {
    setHamburgerOpen((prev) => !prev);
  }
  function closeHamburger() {
    setHamburgerOpen(false);
  }

  const navContent = (
    <>
      <motion.li
        whileHover={{
          scale: 1.2,
          transition: { type: "spring", duration: 0.3 },
        }}
      >
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={closeHamburger}
          to="/"
        >
          Home
        </NavLink>
      </motion.li>
      <motion.li
        whileHover={{
          scale: 1.2,
          transition: { type: "spring", duration: 0.3 },
        }}
      >
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={closeHamburger}
          to="/menu"
        >
          Menu
        </NavLink>
      </motion.li>
      {isloggedIn && (
        <motion.li
          whileHover={{
            scale: 1.2,
            transition: { type: "spring", duration: 0.3 },
          }}
        >
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeHamburger}
            to="/cart"
          >
            Cart
          </NavLink>
        </motion.li>
      )}
      <motion.li
        whileHover={{
          scale: 1.2,
          transition: { type: "spring", duration: 0.3 },
        }}
      >
        {!isloggedIn && (
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeHamburger}
            to="login?mode=login"
          >
            Log in
          </NavLink>
        )}
        {isloggedIn && (
          <a onClick={logOutHandler} className="logout-button">
            Log out
          </a>
        )}
      </motion.li>
    </>
  );

  return (
    <>
      {fetching > 0 && (
        <div className="top-load-indicator">
          <progress></progress>
        </div>
      )}
      <motion.header
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="main-header"
      >
        <Link to="/">
          <h1 className="logo-heading">Food Paradise</h1>
        </Link>
        <nav className="nav-bar">
          <ul>{navContent}</ul>
        </nav>
        <div
          onClick={hamburgerClickHandler}
          className={`hamburger ${hamburgerOpen ? "is-active" : ""}`}
        >
          <div className="bar"></div>
        </div>
      </motion.header>
      <nav className={`mobile-nav ${hamburgerOpen ? "is-active" : ""}`}>
        <ul>{navContent}</ul>
      </nav>
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

export default MainNavigation;
