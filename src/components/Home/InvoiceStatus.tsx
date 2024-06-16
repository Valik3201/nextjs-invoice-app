import Image from "next/image";

export default function InvoiceStatus() {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-20 bg-white rounded-lg p-8 shadow-item dark:bg-dark-light">
      <div className="md:ps-8">
        <Image
          src="/status/status-paid.png"
          alt="Status Paid"
          width={150}
          height={30}
          className="-rotate-6"
        />
        <Image
          src="/status/status-pending.png"
          alt="Status Pending"
          width={150}
          height={30}
          className="rotate-6 translate-x-8"
        />
        <Image
          src="/status/status-draft.png"
          alt="Status Draft"
          width={150}
          height={30}
          className="dark:hidden -rotate-3"
        />
        <Image
          src="/status/status-draft-dark.png"
          alt="Status Draft"
          width={150}
          height={30}
          className="hidden dark:block -rotate-3"
        />
      </div>

      <div className="flex flex-col gap-4 pe-4">
        <h2 className="text-heading-m">See the status of invoices</h2>
        <p className="text-body-variant text-gray-medium dark:text-gray-light">
          Check which invoices have been paid and which are still owing
        </p>
      </div>
    </div>
  );
}
