export default function InvoiceMainInfo({
  id,
  description,
}: {
  id: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-heading-s-variant">
        <span className="text-blue-gray">#</span>
        {id}
      </p>
      <p className="text-blue-gray dark:text-gray-light text-body-variant">
        {description ? description : "No description"}
      </p>
    </div>
  );
}
