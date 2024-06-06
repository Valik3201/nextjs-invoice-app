export default function Button({
  variant,
  size = "auto",
  type = "button",
  onClick,
  children,
  icon,
  isOnlyIcon,
}: {
  variant:
    | "primary"
    | "red"
    | "default"
    | "white"
    | "dark"
    | "icon"
    | "facebook";
  size?: "full" | "auto";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  isOnlyIcon?: boolean;
}) {
  const baseClasses =
    "rounded-full text-heading-s-variant transition duration-200 ease-in-out flex items-center justify-center md:space-x-2";
  const paddingClasses = isOnlyIcon
    ? "p-2"
    : icon
    ? "p-2 pr-4"
    : "py-4 px-4 md:px-6";

  const variantClasses = {
    primary: "text-white bg-primary hover:bg-primary-light",
    red: "text-white bg-red-medium hover:bg-red-light",
    default:
      "text-blue-gray bg-[#F9FAFE] hover:bg-gray-light dark:text-gray-light dark:bg-dark-medium dark:hover:bg-white",
    dark: "text-gray-medium bg-[#373B53] hover:bg-dark-darkest dark:text-gray-light hover:dark:bg-dark-light",
    white:
      "text-dark bg-white hover:bg-gray-light dark:text-white dark:bg-dark-medium dark:hover:bg-dark-light p-3",
    icon: "text-gray-medium hover:text-red-medium mb-[25px]",
    facebook: "bg-[#0866ff] text-white hover:bg-[#0866ff]/80 p-3",
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
