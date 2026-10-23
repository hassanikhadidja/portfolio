import { useRef } from 'react';
import { motion } from 'framer-motion';

let hasPaintedOnce = false;

export default function PageTransition({ children }) {
  const skipEntrance = useRef(!hasPaintedOnce);
  if (!hasPaintedOnce) hasPaintedOnce = true;

  return (
    <motion.div
      initial={skipEntrance.current ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: skipEntrance.current ? 0 : 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
