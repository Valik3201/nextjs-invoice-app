export default function InputField({
  label,
  name,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder = "",
  readOnly = false,
  error,
  profile,
  className,
}: {
  label: string;
  name: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  error?: string | false | undefined;
  profile?: boolean;
  className?: string;
}) {
  const baseClasses =
    "w-full h-12 text-heading-s-variant p-4 rounded focus:outline-none";
  const readOnlyClasses =
    "text-gray-medium text-heading-s-variant dark:text-gray-light cursor-default ps-0";
  const errorClasses =
    "border-red-medium dark:border-red-medium text-red-medium";
  const defaultClasses =
    "text-dark-darkest dark:text-white dark:bg-dark-light border focus:ring-primary focus:border-primary dark:border-[#252945]";
  const profileClasses = "dark:bg-dark-light";
  const typeClasses = type === "number" ? "pe-0" : "";

  const inputClasses = `${baseClasses} ${
    readOnly ? readOnlyClasses : defaultClasses
  } ${error ? errorClasses : "border-gray-light"} ${
    profile ? profileClasses : "dark:bg-dark"
  } ${typeClasses}`;

  return (
    <div className={className}>
      <label>
        <div
          className={`flex justify-between ${
            label
              ? "mb-2 text-body-variant text-blue-gray dark:text-gray-light"
              : "md:hidden"
          }`}
        >
          <p className={`${error ? "text-red-medium" : ""}`}>{label}</p>
          {error && <p className="text-error text-red-medium pe-4">{error}</p>}
        </div>

        <input
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          placeholder={placeholder}
          readOnly={readOnly}
          className={inputClasses}
        />
      </label>
    </div>
  );
}
