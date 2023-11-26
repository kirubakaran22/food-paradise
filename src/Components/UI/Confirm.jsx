import { motion } from "framer-motion";

import "./Confirm.css";
import Modal from "./Modal";

function Confirm(props) {
  return (
    <Modal>
      <div className="confirm-container">
        <h2>{props.title}</h2>
        <p>{props.msg}</p>
        <div className="confirm-actions">
          {props.onCancel && (
            <motion.button
              whileHover={{
                scale: 1.1,
                transition: { type: "spring", duration: 0.3 },
              }}
              className="confirm-cancel"
              onClick={props.onCancel}
            >
              Cancel
            </motion.button>
          )}
          <motion.button
            whileHover={{
              scale: 1.1,
              transition: { type: "spring", duration: 0.3 },
            }}
            className="confirm-ok"
            onClick={props.onOk}
          >
            Ok
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}

export default Confirm;
