import { Invoice } from "@/src/lib/types";
import AmountDue from "./AmountDue";
import InvoiceMainInfo from "./InvoiceMainInfo";
import DatesInfo from "./DatesInfo";
import BillToInfo from "./BillToInfo";
import SentToInfo from "./SentToInfo";
import InvoiceItems from "./InvoiceItems";
import SenderAddressInfo from "./SenderAddressInfo";

export default function InvoiceInfo({ invoice }: { invoice: Invoice }) {
  return (
    <div className="flex flex-col items-center justify-between bg-white rounded-lg mt-9 md:mt-6 p-6 md:p-8 lg:p-[52px] shadow-item dark:bg-dark-light dark:border-dark-light mb-32 md:mb-0">
      <div className="flex flex-col gap-[30px] md:gap-0 md:flex-row justify-between items-start w-full mb-7">
        <InvoiceMainInfo
          id={invoice.id}
          description={invoice.projectDescription}
        />
        <SenderAddressInfo billFrom={invoice.billFrom} />
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-[118px] w-full">
        <div className="flex gap-[61px] md:gap-[118px] w-full md:w-fit">
          <DatesInfo
            invoiceDate={invoice.invoiceDate}
            paymentDue={invoice.paymentDue}
          />
          <BillToInfo billTo={invoice.billTo} />
        </div>

        <SentToInfo clientEmail={invoice.billTo.clientEmail} />
      </div>

      <InvoiceItems itemList={invoice.itemList} />

      <AmountDue total={invoice.total} />
    </div>
  );
}
