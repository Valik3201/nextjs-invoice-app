import ArrowIcon from "../icons/ArrowIcon";

export default function GoBackButton({
  handleDiscard,
}: {
  handleDiscard: () => void;
}) {
  return (
    <button
      type="button"
      className="flex gap-6 items-center mb-6 md:hidden"
      onClick={handleDiscard}
    >
      <div className="rotate-90">
        <ArrowIcon />
      </div>
      <p className="text-heading-s-variant h-3 hover:text-blue-gray transition duration-200 ease-in-out dark:hover:text-gray-medium">
        Go back
      </p>
    </button>
  );
}
