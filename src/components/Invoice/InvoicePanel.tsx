import { Invoice } from "@/src/lib/types";
import InvoiceActions from "./InvoiceActions";
import Status from "../Status/Status";

export default function InvoicePanel({ invoice }: { invoice: Invoice }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-5 pl-8 shadow-item dark:bg-dark-light dark:border-dark-light">
      <div className="flex gap-5 items-center justify-between md:justify-start w-full md:w-fit">
        <p className="text-body-variant text-[#858BB2] dark:text-gray-light">
          Status
        </p>
        <Status status={invoice.status} />
      </div>

      <InvoiceActions invoice={invoice} />
    </div>
  );
}
