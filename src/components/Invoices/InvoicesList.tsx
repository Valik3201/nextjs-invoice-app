import Link from "next/link";
import { format } from "date-fns";
import { Invoice } from "@/src/lib/types";
import Status from "../Status/Status";
import ArrowIcon from "@/src/icons/ArrowIcon";

export default function InvoicesList({ invoices }: { invoices: Invoice[] }) {
  return (
    <ul className="flex flex-col gap-4 w-full">
      {invoices.map((invoice) => {
        const total = (invoice.itemList || [])
          .reduce((acc, item) => acc + item.total, 0)
          .toFixed(2);

        const dueDate = invoice.createdAt
          ? format(new Date(invoice.createdAt), "dd MMM yyyy")
          : "Date not provided";

        const clientName = invoice.clientName || "No client name";

        return (
          <li key={invoice.id}>
            <Link href={`/invoices/${invoice.uid}`}>
              <div className="bg-white rounded-lg px-4 py-3 md:ps-6 lg:ps-8 shadow-item border-2 border-white hover:border-primary transition duration-200 ease-in-out dark:bg-dark-light dark:border-dark-light">
                {/* Tablet % Desktop Styles */}
                <div className="hidden md:flex items-center justify-between">
                  <p className="text-heading-s-variant w-[15%]">
                    <span className="text-blue-gray">#</span>
                    {invoice.id}
                  </p>
                  <p className="text-body-variant text-gray-medium dark:text-gray-light w-[20%]">
                    {dueDate}
                  </p>
                  <p className="text-body-variant text-gray-medium dark:text-gray-light w-[20%] truncate">
                    {clientName}
                  </p>
                  <p className="text-heading-s w-[15%]">£ {total}</p>
                  <div className="w-[104px]">
                    <Status status={invoice.status} />
                  </div>

                  <div className="-rotate-90 py-5">
                    <ArrowIcon />
                  </div>
                </div>

                {/* Mobile Styles */}
                <div className="flex md:hidden flex-col items-stretch justify-center gap-6">
                  <div className="flex items-center justify-between">
                    <p className="text-heading-s-variant">
                      <span className="text-blue-gray">#</span>
                      {invoice.id}
                    </p>
                    <p className="text-body-variant text-gray-medium dark:text-gray-light">
                      {clientName}
                    </p>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-body-variant text-gray-medium dark:text-gray-light pb-2">
                        {dueDate}
                      </p>
                      <p className="text-heading-s">£ {total}</p>
                    </div>

                    <div className="w-[104px]">
                      <Status status={invoice.status} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
