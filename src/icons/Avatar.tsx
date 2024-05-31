export default function Avatar() {
  return (
    <div className="relative w-8 h-8 lg:w-10 lg:h-10 overflow-hidden bg-gray-light rounded-full dark:bg-gray-medium">
      <svg
        className="absolute w-10 h-10 lg:w-12 lg:h-12 text-gray-medium -left-1 dark:text-gray-light"
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
