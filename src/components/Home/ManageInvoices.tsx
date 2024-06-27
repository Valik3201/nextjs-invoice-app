import Image from "next/image";

export default function ManageInvoices() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg pl-4 md:pl-8 pt-8 md:pt-0 shadow-item dark:bg-dark-light">
      <div className="ps-4 pe-4 md:pe-0 space-y-4">
        <h2 className="text-heading-m">Master Your Invoices</h2>
        <ul className="text-body-variant text-gray-medium dark:text-gray-light list-disc space-y-2 ms-4">
          <li>Create, manage, and track invoices effortlessly</li>
          <li>Real-time validations ensure error-free entries</li>
          <li>Store previous invoices and payment details</li>
        </ul>
      </div>

      <Image
        src="/mockups/mockup-2-light.png"
        alt="Filter"
        width={500}
        height={375}
        className="dark:hidden rounded-ee-lg"
      />
      <Image
        src="/mockups/mockup-2-dark.png"
        alt="Filter"
        width={500}
        height={375}
        className="hidden dark:block rounded-ee-lg"
      />
    </div>
  );
}
