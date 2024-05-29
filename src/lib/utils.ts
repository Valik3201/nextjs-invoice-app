import { PaymentTerms } from "./types";

export function generateInvoiceId(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letterPart =
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length));
  const numberPart = ("0000" + Math.floor(Math.random() * 10000)).slice(-4);
  return letterPart + numberPart;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
}

export function calculateDueDate(
  invoiceDate: string,
  paymentTerms: PaymentTerms
): string {
  const date = new Date(invoiceDate);
  let dueDate = new Date(date);

  switch (paymentTerms) {
    case PaymentTerms.Net1Day:
      dueDate.setDate(date.getDate() + 1);
      break;
    case PaymentTerms.Net7Days:
      dueDate.setDate(date.getDate() + 7);
      break;
    case PaymentTerms.Net14Days:
      dueDate.setDate(date.getDate() + 14);
      break;
    case PaymentTerms.Net30Days:
      dueDate.setDate(date.getDate() + 30);
      break;
    default:
      throw new Error("Unknown payment term");
  }

  return formatDate(dueDate.toISOString());
}
