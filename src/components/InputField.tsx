export default function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  readOnly = false,
}: {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
}) {
  return (
    <div className="mb-[25px]">
      <label
        className={`block ${
          label
            ? "mb-2 text-body-variant text-blue-gray dark:text-gray-light"
            : "md:hidden"
        }`}
      >
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        min="0"
        placeholder={placeholder}
        readOnly={readOnly}
        required
        className="bg-white w-full h-12 text-heading-s-variant border border-gray-light rounded p-4 focus:outline-none focus:ring-primary focus:border-primary dark:bg-dark-light dark:border-[#252945]"
      />
    </div>
  );
}
