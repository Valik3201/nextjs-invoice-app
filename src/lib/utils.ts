import { Invoice } from "./types";
import { DocumentData } from "firebase/firestore";

export const orderInvoiceKeys = (invoice: DocumentData): Invoice => {
  return {
    id: invoice.id,
    uid: invoice.uid,
    status: invoice.status,
    billFrom: {
      city: invoice.billFrom.city,
      country: invoice.billFrom.country,
      postCode: invoice.billFrom.postCode,
      streetAddress: invoice.billFrom.streetAddress,
    },
    billTo: {
      city: invoice.billTo.city,
      clientEmail: invoice.billTo.clientEmail,
      clientName: invoice.billTo.clientName,
      country: invoice.billTo.country,
      postCode: invoice.billTo.postCode,
      streetAddress: invoice.billTo.streetAddress,
    },
    invoiceDate: invoice.invoiceDate,
    itemList: invoice.itemList.map((item: DocumentData) => ({
      itemName: item.itemName,
      qty: item.qty,
      price: item.price,
      total: item.total,
    })),
    paymentTerms: invoice.paymentTerms,
    projectDescription: invoice.projectDescription,
  };
};

export function generateInvoiceId(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letterPart =
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length));
  const numberPart = ("0000" + Math.floor(Math.random() * 10000)).slice(-4);
  return letterPart + numberPart;
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
};
