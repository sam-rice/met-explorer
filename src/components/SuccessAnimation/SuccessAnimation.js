import { motion, AnimatePresence } from "framer-motion"

import "./_SuccessAnimation.scss"
import success from "../../assets/success.png"

const SuccessAnimation = ({ showSuccess }) => {

  return (
    <AnimatePresence
      initial={false}
      mode="wait"
    >
      {
        showSuccess &&
        <div className="added-alert">
          <motion.span
            className="added-alert__label"
            exit={{ opacity: 0 }}
            key={"p"}
          >
            added
          </motion.span>
          <motion.img
            className="added-alert__img"
            src={success}
            exit={{ opacity: 0 }}
            key={"img"}
          />
        </div>
      }
    </AnimatePresence>
  )
}

export default SuccessAnimation