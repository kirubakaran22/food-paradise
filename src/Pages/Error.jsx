import { Link, useRouteError } from "react-router-dom";
import { motion } from "framer-motion";

function ErrorPage() {
  const error = useRouteError();

  let title = "An Error occured!!";
  let message = "Something went wrong";

  if (error.message) {
    title = error.message;
  }
  if (error.info) {
    message = error.info;
  }

  return (
    <>
      <div style={{ width: "30rem", maxWidth: "80%", margin: "auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>{title}</h2>
        <p style={{ textAlign: "center" }}>{message}</p>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link to="/">
            <motion.button
              whileHover={{
                scale: 1.1,
                transition: { type: "spring", duration: 0.3 },
              }}
              className="error-button"
            >
              Go to home page
            </motion.button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
