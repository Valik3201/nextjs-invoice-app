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
}) {
  return (
    <div className="mb-[25px]">
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
          className={`bg-white w-full h-12 text-heading-s-variant p-4 rounded focus:outline-none  ${
            error
              ? "border-red-medium dark:border-red-medium "
              : "border-gray-light"
          } ${
            readOnly
              ? "text-gray-medium text-heading-s-variant dark:bg-dark dark:text-gray-light cursor-default ps-0"
              : "text-dark-darkest dark:text-white dark:bg-dark-light border focus:ring-primary focus:border-primary dark:border-[#252945]"
          } ${type === "number" ? "pe-0" : ""}`}
        />
      </label>
    </div>
  );
}
