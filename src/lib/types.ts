export interface GetInvoiceResult {
  invoice: Invoice | null;
  error: any;
}

export enum InvoiceStatus {
  Draft = "draft",
  Pending = "pending",
  Paid = "paid",
}

export enum PaymentTerms {
  Net1Day = "Net 1 Day",
  Net7Days = "Net 7 Days",
  Net14Days = "Net 14 Days",
  Net30Days = "Net 30 Days",
}

export interface InvoiceItem {
  itemName: string;
  qty: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  uid: string;
  billFrom: {
    city: string;
    country: string;
    postCode: string;
    streetAddress: string;
  };
  billTo: {
    city: string;
    clientEmail: string;
    clientName: string;
    country: string;
    postCode: string;
    streetAddress: string;
  };
  invoiceDate: any;
  itemList: InvoiceItem[];
  paymentTerms: PaymentTerms;
  projectDescription: string;
  status: InvoiceStatus;
}
