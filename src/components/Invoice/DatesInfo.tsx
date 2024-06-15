import { format } from "date-fns";

export default function DatesInfo({
  invoiceDate,
  paymentDue,
}: {
  invoiceDate: string;
  paymentDue: string;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-blue-gray dark:text-gray-light text-body-variant mb-[13px]">
          Invoice Date
        </h3>
        <p className="text-heading-s-variant">
          {invoiceDate !== ""
            ? format(new Date(invoiceDate), "dd MMM yyyy")
            : "Date not provided"}
        </p>
      </div>
      <div>
        <h3 className="text-blue-gray dark:text-gray-light text-body-variant mb-[13px]">
          Payment Due
        </h3>
        <p className="text-heading-s-variant">
          {paymentDue !== ""
            ? format(new Date(paymentDue), "dd MMM yyyy")
            : "Payment due date not provided"}
        </p>
      </div>
    </div>
  );
}
