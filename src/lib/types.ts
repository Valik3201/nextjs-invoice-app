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

export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Invoice {
  id: string;
  uid: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: PaymentTerms;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: Address;
  clientAddress: Address;
  itemList: InvoiceItem[];
  total: number;
}
