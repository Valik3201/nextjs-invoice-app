export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="mb-[25px]">
      <label className="block text-body-variant text-blue-gray mb-2">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="bg-white w-full h-12 text-heading-s-variant border border-gray-light rounded p-4 focus:outline-none focus:ring-primary focus:border-primary hover:border-primary hover:cursor-pointer dark:bg-dark-light dark:border-[#252945]"
        required
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
