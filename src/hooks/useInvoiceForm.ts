import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  addInvoice,
  updateInvoice,
} from "../lib/features/invoices/invoicesOperations";
import { Invoice, InvoiceStatus } from "../lib/types";

export const useInvoiceForm = (closeForm: () => void) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleNewSubmit = async (
    values: Invoice,
    { setSubmitting, resetForm }: any
  ) => {
    if (user) {
      try {
        dispatch(addInvoice({ userId: user.uid, invoice: values })).unwrap();
        resetForm();
      } catch (error) {
        console.error("Error adding invoice:", error);
      }
    }
    setSubmitting(false);
    closeForm();
  };

  const handleEditSubmit = async (
    values: Invoice,
    { setSubmitting, resetForm }: any
  ) => {
    if (user) {
      try {
        dispatch(
          updateInvoice({
            userId: user.uid,
            invoiceUid: values.uid,
            updatedData: values,
          })
        ).unwrap();
        resetForm();
      } catch (error) {
        console.error("Error editing invoice:", error);
      }
    }
    setSubmitting(false);
  };

  const handleSaveAsDraft = async (
    values: Invoice,
    { setSubmitting, resetForm }: any
  ) => {
    if (user) {
      const draftInvoiceData = {
        ...values,
        status: InvoiceStatus.Draft,
        invoiceDate: format(new Date(), "yyyy-MM-dd"),
      };
      try {
        await dispatch(
          addInvoice({ userId: user.uid, invoice: draftInvoiceData })
        ).unwrap();
        resetForm();
        closeForm();
      } catch (error) {
        console.error("Error saving invoice as draft:", error);
      }
    }
    setSubmitting(false);
  };

  const handleDiscard = (resetForm: () => void) => {
    resetForm();
    closeForm();
  };

  return {
    handleNewSubmit,
    handleEditSubmit,
    handleSaveAsDraft,
    handleDiscard,
  };
};
