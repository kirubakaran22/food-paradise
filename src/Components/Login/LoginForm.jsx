import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import "./LoginForm.css";
import { createUser, getAllUsers } from "../../util/http";
import { loginAction } from "../../store/loginStatusSlice";
import { cartActions } from "../../store/cartSlice";

function LoginForm() {
  const [scope, animate] = useAnimate();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isError, error } = useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsers,
  });
  useEffect(() => {
    if (isError) {
      throw error;
    }
  }, [isError, error]);

  const {
    mutate,
    isError: iscreateError,
    error: createError,
  } = useMutation({
    mutationFn: createUser,
  });
  useEffect(() => {
    if (iscreateError) {
      throw createError;
    }
  }, [iscreateError, createError]);

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredCPassword, setEnteredCPassword] = useState("");

  const [userNameError, setUsernameError] = useState();
  const [userPassError, setPassError] = useState();
  const [userCPassError, setCPassError] = useState();
  const [userPresense, setUserPresence] = useState();

  const [searchParam] = useSearchParams();
  const isLogin = searchParam.get("mode") === "login";

  function usernameHandler(event) {
    setEnteredUsername(event.target.value);
    if (event.target.value.length > 0) {
      setUsernameError(undefined);
    }
  }
  function userBlueHandler() {
    if (enteredUsername.length < 1) {
      animate(
        "input[name='username']",
        { rotate: [1, 0, -1, 0, 1, 0, -1, 0] },
        { type: "tween" }
      );
      setUsernameError("Please Enter your username");
    }
  }
  function passHandler(event) {
    setEnteredPassword(event.target.value);
    if (event.target.value.length > 8) {
      setPassError(undefined);
    }
  }
  function passBlurHandler() {
    if (enteredPassword.length < 8) {
      animate(
        "input[name='password']",
        { rotate: [1, 0, -1, 0, 1, 0, -1, 0] },
        { type: "tween" }
      );
      if (!isLogin) {
        setPassError("Password must be atleast 8 characters long");
      }
    }
  }
  function cPassHandler(event) {
    setEnteredCPassword(event.target.value);
    if (event.target.value == enteredPassword) {
      setCPassError(undefined);
    }
  }
  function cPassBlurHandler() {
    if (enteredCPassword != enteredPassword) {
      animate(
        "input[name='cpassword']",
        { rotate: [1, 0, -1, 0, 1, 0, -1, 0] },
        { type: "tween" }
      );
      setCPassError("Password do not match");
    }
  }

  function submitHandler(event) {
    event.preventDefault();
    let obj2Arr = Object.entries(data ? data : {});
    let userpass = obj2Arr.map((arr) => {
      return {
        username: arr[1].username,
        password: arr[1].pass,
        id: arr[0],
      };
    });

    if (enteredUsername.length == 0) {
      animate(
        "input[name='username']",
        { rotate: [1, 0, -1, 0, 1, 0, -1, 0] },
        { type: "tween" }
      );
      setUsernameError("Please Enter your username");
      return;
    }

    if (!isLogin) {
      if (enteredPassword.length < 8) {
        animate(
          "input[name='password']",
          { rotate: [1, 0, -1, 0, 1, 0, -1, 0] },
          { type: "tween" }
        );
        setPassError("Password must be atleast 8 characters long");
        return;
      }

      if (enteredUsername.length == 0) {
        animate(
          "input[name='cpassword']",
          { rotate: [1, 0, -1, 0, 1, 0, -1, 0] },
          { type: "tween" }
        );
        setCPassError("Password do not match");
        return;
      }
    }
    if (isLogin) {
      const userList = userpass.map((obj) => obj.username);
      const index = userList.findIndex((x) => x == enteredUsername);
      if (index == -1) {
        setUserPresence("User Not Found");
        return;
      } else {
        setUserPresence(undefined);
        const originalPass = userpass[index].password;
        if (originalPass != enteredPassword) {
          setUserPresence("Incorect Password");
          return;
        } else {
          setUserPresence(undefined);
          localStorage.setItem("id", userpass[index].id);
          dispatch(loginAction.login());
          const cartDetails = obj2Arr[index][1].cart?.details;
          if (cartDetails) {
            dispatch(
              cartActions.replaceCart({
                items: cartDetails.items,
                totalAmount: cartDetails.totalAmount,
              })
            );
            localStorage.setItem(
              "cart",
              JSON.stringify({
                items: cartDetails.items,
                totalAmount: cartDetails.totalAmount,
              })
            );
          }
          navigate("/menu");
          return;
        }
      }
    } else {
      const userList = userpass.map((obj) => obj.username);
      const index = userList.findIndex((x) => x == enteredUsername);
      console.log(index);
      if (index != -1) {
        setUserPresence("User Already Exist");
        return;
      } else {
        setUserPresence(undefined);
        mutate({
          username: enteredUsername,
          pass: enteredPassword,
          cart: [],
        });
        dispatch(loginAction.login());
        navigate("/menu");
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="form-container"
    >
      <form
        ref={scope}
        onSubmit={submitHandler}
        className="login-form"
        action=""
      >
        <h1>{isLogin ? "Log in to your account" : "Create a new account"}</h1>
        <div className="input-group">
          <label htmlFor="username">UserName:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={enteredUsername}
            onChange={usernameHandler}
            onBlur={userBlueHandler}
          />
        </div>
        {userNameError && <p className="error-message">{userNameError}</p>}
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={enteredPassword}
            onChange={passHandler}
            onBlur={passBlurHandler}
          />
        </div>
        {userPassError && <p className="error-message">{userPassError}</p>}
        <AnimatePresence>
          {!isLogin && (
            <>
              <motion.div
                initial={{ height: 0, scale: 0 }}
                animate={{ scale: [1, 1.1, 0.9, 1], height: "auto" }}
                exit={{ scale: 0, height: 0 }}
                transition={{ type: "tween" }}
                className="input-group"
              >
                <label htmlFor="cpassword">Confirm Password:</label>
                <input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  value={enteredCPassword}
                  onChange={cPassHandler}
                  onBlur={cPassBlurHandler}
                />
              </motion.div>
              {userCPassError && (
                <p className="error-message">{userCPassError}</p>
              )}
            </>
          )}
        </AnimatePresence>
        {userPresense && <p className="user-error">{userPresense}</p>}
        <div className="change-mode">
          <motion.p
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", duration: 0.3 },
            }}
          >
            <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
              {isLogin
                ? "New user? Create a new account"
                : "Already an user? Log in now"}
            </Link>
          </motion.p>
        </div>

        <div className="action">
          <motion.button
            whileHover={{
              scale: 1.1,
              transition: { type: "spring", duration: 0.3 },
            }}
          >
            {isLogin ? "Log in" : "Sign up"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

export default LoginForm;
