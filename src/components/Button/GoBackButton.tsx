import ArrowIcon from "@/src/icons/ArrowIcon";
import Link from "next/link";

export default function GoBackButton({
  handleDiscard,
  href,
}: {
  handleDiscard?: () => void;
  href?: string;
}) {
  const content = (
    <div className="flex gap-6 items-center mb-6 md:mb-[31px]">
      <div className="rotate-90">
        <ArrowIcon />
      </div>
      <p className="text-heading-s-variant h-3 hover:text-blue-gray transition duration-200 ease-in-out dark:hover:text-gray-medium">
        Go back
      </p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block w-fit">
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className="flex gap-6 items-center mb-6 md:hidden"
      onClick={handleDiscard}
    >
      {content}
    </button>
  );
}
