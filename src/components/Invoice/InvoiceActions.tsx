import { Invoice, InvoiceStatus } from "@/src/lib/types";
import { useInvoiceActions } from "@/src/hooks/useInvoiceActions";
import Button from "../Button/Button";
import InvoiceFormWrapper from "../InvoiceForm/InvoiceFormWrapper";
import ConfirmDeletionModal from "../Modal/ConfirmDeletionModal";

export default function InvoiceActions({ invoice }: { invoice: Invoice }) {
  const { handleDelete, handleStatusChange } = useInvoiceActions();

  return (
    <div className="fixed md:static flex justify-center bottom-0 left-0 w-full md:w-fit bg-white dark:bg-dark-light px-6 py-5 md:p-0">
      <div className="flex gap-2 justify-between w-[327px] md:w-fit">
        <InvoiceFormWrapper initialValues={invoice} action="edit" />

        <ConfirmDeletionModal
          handleConfirm={() => handleDelete(invoice)}
          id={invoice.id}
        />

        <Button
          variant={"primary"}
          onClick={() => handleStatusChange(invoice, InvoiceStatus.Paid)}
          className="px-8 md:px-6"
        >
          Mark as Paid
        </Button>
      </div>
    </div>
  );
}
