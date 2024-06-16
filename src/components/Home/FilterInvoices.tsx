import Image from "next/image";

export default function FilterInvoices() {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center md:gap-10 bg-white rounded-lg p-8 pb-0 shadow-item dark:bg-dark-light">
      <Image
        src="/filter/filter.png"
        alt="Filter"
        width={300}
        height={300}
        className="dark:hidden"
      />
      <Image
        src="/filter/filter-dark.png"
        alt="Filter"
        width={300}
        height={300}
        className="hidden dark:block"
      />
      <div className="space-y-4 md:pb-8">
        <h2 className="text-heading-m">Stay Organized</h2>
        <p className="text-body-variant text-gray-medium dark:text-gray-light">
          Filter invoices by status: draft, pending, or paid
        </p>
      </div>
    </div>
  );
}
