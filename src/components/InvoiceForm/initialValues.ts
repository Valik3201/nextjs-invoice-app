import { Invoice, InvoiceStatus, PaymentTerms } from "@/src/lib/types";

export const newInvoice: Invoice = {
  id: "",
  uid: "",
  createdAt: "",
  paymentDue: "",
  description: "",
  paymentTerms: PaymentTerms.Net30Days,
  clientName: "",
  clientEmail: "",
  status: InvoiceStatus.Pending,
  senderAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  clientAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  itemList: [],
  total: 0,
};
