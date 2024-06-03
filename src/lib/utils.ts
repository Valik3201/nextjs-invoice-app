import { InvoiceItem } from "./types";
import { format } from "date-fns";

export function generateInvoiceId(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letterPart =
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length));
  const numberPart = ("0000" + Math.floor(Math.random() * 10000)).slice(-4);
  return letterPart + numberPart;
}

export function calculateDueDate(
  invoiceDate: string,
  paymentTerms: number
): string {
  const date = new Date(invoiceDate);
  let dueDate = new Date(date);

  dueDate.setDate(date.getDate() + paymentTerms);

  return format(dueDate, "yyyy-MM-dd");
}

export function calculateTotal(itemList: InvoiceItem[]): number {
  return itemList.reduce((sum, item) => sum + item.total, 0);
}
