import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function InvoiceStatus() {
  const { scrollYProgress } = useScroll();

  const rotatePaid = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const translateXPaid = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const rotatePending = useTransform(scrollYProgress, [0, 1], [8, -8]);
  const translateXPending = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotateDraft = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const translateXDraft = useTransform(scrollYProgress, [0, 1], [-10, 30]);

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-20 bg-white rounded-lg p-8 shadow-item dark:bg-dark-light">
      <div className="md:ps-8">
        <motion.div style={{ rotate: rotatePaid, x: translateXPaid }}>
          <Image
            src="/status/status-paid.png"
            alt="Status Paid"
            width={150}
            height={58}
          />
        </motion.div>
        <motion.div style={{ rotate: rotatePending, x: translateXPending }}>
          <Image
            src="/status/status-pending.png"
            alt="Status Pending"
            width={150}
            height={58}
          />
        </motion.div>
        <motion.div style={{ rotate: rotateDraft, x: translateXDraft }}>
          <Image
            src="/status/status-draft.png"
            alt="Status Draft"
            width={150}
            height={58}
            className="dark:hidden"
          />
        </motion.div>
        <motion.div style={{ rotate: rotateDraft, x: translateXDraft }}>
          <Image
            src="/status/status-draft-dark.png"
            alt="Status Draft"
            width={150}
            height={58}
            className="hidden dark:block"
          />
        </motion.div>
      </div>

      <div className="flex flex-col gap-4 pe-4">
        <h2 className="text-heading-m">See the status of invoices</h2>
        <p className="text-body-variant text-gray-medium dark:text-gray-light">
          Check which invoices have been paid and which are still owing
        </p>
      </div>
    </div>
  );
}
