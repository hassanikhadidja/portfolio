import { motion } from 'framer-motion';

export default function AnimatedText({ text, className = '', delay = 0, type = 'words' }) {
  const items = type === 'words' ? text.split(' ') : text.split('');
  const separator = type === 'words' ? ' ' : '';

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: delay } },
  };

  const item = {
    hidden: { opacity: 0, y: 24, clipPath: 'inset(0 0 100% 0)' },
    visible: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {items.map((word, i) => (
        <motion.span key={i} variants={item} className="inline-block overflow-hidden">
          <motion.span className="inline-block">{word}</motion.span>
        </motion.span>
      ))}
    </motion.span>
  );
}
