import Image from "next/image";

export default function NoInvoicesMessage() {
  return (
    <div className="flex flex-col items-center gap-[23px]">
      <Image
        src="/no-invoices.svg"
        alt="No Invoices Info"
        width={242}
        height={200}
        className="mt-[70px] md:mt-[154px] lg:mt-[72px]"
        priority
      />
      <h2 className="text-heading-m">There is nothing here</h2>
      <p className="text-body-variant text-gray-medium dark:text-gray-light text-center">
        Create an invoice by clicking the <br />
        <span className="font-bold">New Invoice</span> button and get started
      </p>
    </div>
  );
}
