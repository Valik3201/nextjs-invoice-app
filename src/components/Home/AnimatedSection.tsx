import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AnimatedSection({
  children,
  delay,
}: {
  children: ReactNode;
  delay: number;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const animations = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={animations}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
