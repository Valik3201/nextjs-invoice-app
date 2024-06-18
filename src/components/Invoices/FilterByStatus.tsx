import { useRef, useEffect } from "react";
import { useToggleState } from "@/src/hooks/useToggleState";
import { InvoiceStatus } from "@/src/lib/types";
import ArrowIcon from "@/src/icons/ArrowIcon";
import CheckboxIcon from "@/src/icons/CheckboxIcon";

export default function FilterByStatus({
  selectedStatuses,
  handleStatusChange,
}: {
  selectedStatuses: Set<InvoiceStatus>;
  handleStatusChange: (status: InvoiceStatus) => void;
}) {
  const { state: isOpen, toggleState } = useToggleState();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      toggleState();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={toggleState}
        className="flex gap-[14px] items-center text-heading-s-variant"
      >
        <p>
          Filter <span className="hidden md:inline">by status</span>
        </p>
        <span
          className={`transition duration-200 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <ArrowIcon />
        </span>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-14 -left-9 w-48 p-6 rounded-lg bg-white shadow-filter-light dark:bg-dark-medium dark:shadow-filter-dark"
        >
          <ul className="text-heading-s-variant space-y-4">
            {Object.values(InvoiceStatus).map((status) => (
              <li className="flex items-center" key={status}>
                <label
                  className="relative flex gap-4 items-center capitalize hover:cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={selectedStatuses.has(status)}
                    onChange={() => handleStatusChange(status)}
                    className="peer appearance-none forced-colors:appearance-auto w-4 h-4 bg-gray-light border-primary hover:border rounded-[0.12rem] focus:ring-primary focus:ring-1 dark:bg-dark-light"
                  />
                  <CheckboxIcon />
                  {status}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
