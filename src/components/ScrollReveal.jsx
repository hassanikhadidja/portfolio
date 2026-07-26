import { motion } from 'framer-motion';

const directions = {
  up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
};

export default function ScrollReveal({ children, delay = 0, direction = 'up', className = '' }) {
  const variant = directions[direction] || directions.up;
  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
