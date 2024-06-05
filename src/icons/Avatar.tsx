export default function Avatar({ size }: { size?: "sm" | "lg" }) {
  const sizeClass =
    size === "lg" ? "w-14 h-14 lg:w-20 lg:h-20" : "w-8 h-8 lg:w-10 lg:h-10";

  const svgSizeClass =
    size === "lg"
      ? "w-16 h-16 lg:w-[88px] lg:h-[88px]"
      : "w-10 h-10 lg:w-12 lg:h-12";

  return (
    <div
      className={`relative overflow-hidden bg-gray-light rounded-full dark:bg-gray-medium ${sizeClass}`}
    >
      <svg
        className={`absolute text-gray-medium -left-1 dark:text-gray-light ${svgSizeClass}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
}
