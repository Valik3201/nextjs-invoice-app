import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function PersonalizeWorkspace() {
  const { scrollYProgress } = useScroll();

  const rotateX = useTransform(scrollYProgress, [0, 0.75], [135, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.5, 1]);

  return (
    <div className="flex flex-col items-center gap-6 bg-white rounded-lg p-8 shadow-item dark:bg-dark-light">
      <div className="space-y-4">
        <h2 className="text-heading-m">Personalize Your Workspace</h2>
        <p className="text-body-variant md:text-center text-gray-medium dark:text-gray-light">
          Choose between light and dark modes
        </p>
      </div>

      <div style={{ perspective: "1000px" }}>
        <motion.div
          style={{
            rotateX: rotateX,
            scale: scale,
          }}
        >
          <Image
            src="/mockups/mockup-3.png"
            alt="Theme Toggle Macbook"
            width={666}
            height={408}
          />
        </motion.div>
      </div>
    </div>
  );
}
