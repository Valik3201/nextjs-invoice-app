import { useState } from "react";
import SuccessIcon from "@/src/icons/SuccessIcon";
import DangerIcon from "@/src/icons/DangerIcon";
import WarningIcon from "@/src/icons/WarningIcon";
import MessageIcon from "@/src/icons/MessageIcon";
import CloseIcon from "@/src/icons/CloseIcon";

export default function Toast({
  type,
  children,
}: {
  type: "success" | "danger" | "warning" | "email";
  children: React.ReactNode;
}) {
  const [dismissed, setDismissed] = useState(false);

  const handleDismiss = () => {
    setDismissed(true);
  };

  if (dismissed) return null;

  const iconMap: { [key: string]: React.ReactNode } = {
    success: <SuccessIcon />,
    danger: <DangerIcon />,
    warning: <WarningIcon />,
    message: <MessageIcon />,
  };

  const backgroundColorMap: { [key: string]: string } = {
    success: "bg-green/20",
    danger: "bg-red-medium/20",
    warning: "bg-orange/20",
    message: "bg-white dark:bg-dark-light",
  };

  return (
    <div className="fixed bottom-10 right-10">
      <div
        className="flex items-center w-full max-w-xs p-5 text-gray-medium bg-white rounded-lg shadow-item dark:text-gray-light dark:bg-dark-light"
        role="alert"
      >
        <div
          className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${backgroundColorMap[type]}`}
        >
          {iconMap[type]}
        </div>
        <div className="ms-3 text-heading-s-variant font-medium">
          {children}
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="ms-auto -mx-1.5 -my-1.5 text-gray-medium hover:text-dark rounded-lg focus:ring-2 focus:ring-gray-light p-1 inline-flex items-center justify-center h-8 w-8 dark:text-gray-light dark:hover:text-white"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
