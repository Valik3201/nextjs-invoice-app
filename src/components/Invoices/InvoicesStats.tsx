import { Invoice, InvoiceStatus } from "@/src/lib/types";

export default function InvoicesStats({
  invoices,
  filteredInvoices,
  selectedStatuses,
}: {
  invoices: Invoice[];
  filteredInvoices: Invoice[];
  selectedStatuses: Set<InvoiceStatus>;
}) {
  const getMessage = () => {
    if (selectedStatuses.size === 0) {
      return `There are ${invoices.length} total invoices`;
    } else {
      const statusMessages = Array.from(selectedStatuses).map((status) => {
        const count = invoices.filter(
          (invoice) => invoice.status === status
        ).length;
        return `${count} ${status} invoices`;
      });
      return `There are ${statusMessages.join(" and ")}`;
    }
  };

  return (
    <div>
      <h1 className="text-heading-m md:text-heading-l mb-[6px]">Invoices</h1>
      {invoices.length !== 0 || filteredInvoices.length !== 0 ? (
        <>
          <p className="text-body-variant text-gray-medium dark:text-gray-light block sm:hidden">
            {`${filteredInvoices.length} invoices`}
          </p>
          <p className="text-body-variant text-gray-medium dark:text-gray-light hidden sm:block">
            {getMessage()}
          </p>
        </>
      ) : (
        <p className="text-body-variant text-gray-medium dark:text-gray-light">
          No invoices
        </p>
      )}
    </div>
  );
}
