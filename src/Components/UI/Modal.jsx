import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import "./Modal.css";

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="backdrop"
        onClick={onClose}
      />
      <motion.dialog
        variants={{
          hidden: { y: 50, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        open
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
