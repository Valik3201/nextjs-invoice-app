import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  addInvoice,
  deleteInvoice,
  fetchInvoiceById,
  updateInvoice,
} from "../lib/features/invoices/invoicesOperations";
import { Invoice, InvoiceStatus } from "../lib/types";

export const useInvoiceActions = (closeForm: () => void = () => {}) => {
  const router = useRouter();
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
        createdAt: format(new Date(), "yyyy-MM-dd"),
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

  const handleDelete = (invoice: Invoice) => {
    if (user && user.uid) {
      dispatch(
        deleteInvoice({ userId: user.uid, invoiceUid: invoice.uid })
      ).unwrap();

      router.push("/invoices");
    }
  };

  const handleStatusChange = (invoice: Invoice, newStatus: InvoiceStatus) => {
    if (user && user.uid) {
      dispatch(
        updateInvoice({
          userId: user.uid,
          invoiceUid: invoice.uid,
          updatedData: { status: newStatus },
        })
      );

      dispatch(
        fetchInvoiceById({ userId: user.uid, invoiceUid: invoice.uid })
      ).unwrap();
    }
  };

  return {
    user,
    handleDelete,
    handleDiscard,
    handleEditSubmit,
    handleNewSubmit,
    handleStatusChange,
    handleSaveAsDraft,
  };
};
