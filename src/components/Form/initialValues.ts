import { Invoice, InvoiceStatus, PaymentTerms } from "@/src/lib/types";

export const newInvoice: Invoice = {
  id: "",
  uid: "",
  status: InvoiceStatus.Pending,
  billFrom: {
    streetAddress: "",
    city: "",
    postCode: "",
    country: "",
  },
  billTo: {
    clientName: "",
    clientEmail: "",
    streetAddress: "",
    city: "",
    postCode: "",
    country: "",
  },
  invoiceDate: "",
  paymentTerms: PaymentTerms.Net30Days,
  projectDescription: "",
  itemList: [],
};
