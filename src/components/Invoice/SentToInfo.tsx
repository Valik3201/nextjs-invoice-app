export default function SentToInfo({ clientEmail }: { clientEmail: string }) {
  return (
    <div>
      <h3 className="text-blue-gray dark:text-gray-light text-body-variant mb-[13px]">
        Sent To
      </h3>
      <p className="text-heading-s-variant">
        {clientEmail || "No client email"}
      </p>
    </div>
  );
}
