export default function Button({
  variant,
  size = "auto",
  type = "button",
  onClick,
  children,
  icon,
  isOnlyIcon,
}: {
  variant: "primary" | "red" | "default" | "dark" | "icon";
  size?: "full" | "auto";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  isOnlyIcon?: boolean;
}) {
  const baseClasses =
    "rounded-full text-heading-s-variant transition duration-200 ease-in-out flex items-center justify-center space-x-2";
  const paddingClasses = isOnlyIcon ? "p-2" : icon ? "p-2 pr-4" : "py-4 px-6";

  const variantClasses = {
    primary: "text-white bg-primary hover:bg-primary-light",
    red: "text-white bg-red-medium hover:bg-red-light",
    default:
      "text-blue-gray bg-[#F9FAFE] hover:bg-gray-light dark:text-gray-light dark:bg-dark-medium dark:hover:bg-dark-light",
    dark: "text-gray-medium bg-[#373B53] hover:bg-dark-darkest dark:text-gray-light hover:dark:bg-dark-light",
    icon: "text-gray-medium hover:text-red-medium mb-[25px]",
  };

  const sizeClasses = {
    full: "w-full",
    auto: "",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${paddingClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {icon && <span className={isOnlyIcon ? "" : "mr-2"}>{icon}</span>}
      {!isOnlyIcon && <span>{children}</span>}
    </button>
  );
}
