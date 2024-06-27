import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Flexibility() {
  const { scrollYProgress } = useScroll();

  const rotateMarkAsPaid = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const rotateSaveAsDraft = useTransform(scrollYProgress, [0, 1], [-6, 0]);
  const translateXSaveAsDraft = useTransform(
    scrollYProgress,
    [0, 1],
    [50, -30]
  );
  const scaleMarkAsPaid = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const scaleSaveAsDraft = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg p-8 shadow-item dark:bg-dark-light">
      <div className="md:ps-4 space-y-4">
        <h2 className="text-heading-m">Flexibility at Your Fingertips</h2>
        <ul className="text-body-variant text-gray-medium dark:text-gray-light list-disc space-y-2 ms-4">
          <li>Save drafts for later refinement</li>
          <li>Quickly mark pending invoices as paid</li>
        </ul>
      </div>
      <div className="pt-6 md:pt-0 pe-10 md:pe-20">
        <motion.div
          style={{ rotate: rotateMarkAsPaid, scale: scaleMarkAsPaid }}
        >
          <Image
            src="/buttons/mark-as-paid.png"
            alt="Mark as paid button"
            width={150}
            height={55}
            className="rotate-6"
          />
        </motion.div>
        <motion.div
          style={{
            rotate: rotateSaveAsDraft,
            x: translateXSaveAsDraft,
            scale: scaleSaveAsDraft,
          }}
        >
          <Image
            src="/buttons/save-as-draft.png"
            alt="Save as draft button"
            width={150}
            height={55}
            className="dark:hidden -rotate-3 translate-x-10"
          />
        </motion.div>
        <motion.div
          style={{
            rotate: rotateSaveAsDraft,
            x: translateXSaveAsDraft,
            scale: scaleSaveAsDraft,
          }}
        >
          <Image
            src="/buttons/save-as-draft-dark.png"
            alt="Save as draft button"
            width={150}
            height={55}
            className="hidden dark:block -rotate-3 translate-x-10"
          />
        </motion.div>
      </div>
    </div>
  );
}
