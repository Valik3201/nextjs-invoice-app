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
  Net1Day = 1,
  Net7Days = 7,
  Net14Days = 14,
  Net30Days = 30,
}

export interface InvoiceItem {
  id: string;
  itemName: string;
  qty: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  uid: string;
  status: InvoiceStatus;
  billFrom: {
    city: string;
    country: string;
    postCode: string;
    streetAddress: string;
  };
  billTo: {
    clientEmail: string;
    clientName: string;
    city: string;
    country: string;
    postCode: string;
    streetAddress: string;
  };
  invoiceDate: string;
  paymentDue: string;
  paymentTerms: PaymentTerms;
  projectDescription: string;
  itemList: InvoiceItem[];
  total: number;
}
