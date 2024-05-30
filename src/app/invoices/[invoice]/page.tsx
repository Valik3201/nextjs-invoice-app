"use client";

import { useEffect, useState } from "react";
import ArrowIcon from "@/src/icons/ArrowIcon";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import {
  fetchInvoiceById,
  updateInvoice,
  deleteInvoice,
} from "@/src/lib/features/invoices/invoicesOperations";
import { InvoiceStatus } from "@/src/lib/types";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Status from "@/src/components/Status";
import { formatDate, calculateDueDate } from "@/src/lib/utils";
import Modal from "@/src/components/Modal";
import Button from "@/src/components/Button";

export default function Page() {
  const router = useRouter();
  const invoiceUid = useParams<{ invoice: string }>().invoice;
  const dispatch = useAppDispatch();
  const { invoice, loading, error } = useAppSelector((state) => state.invoices);
  const user = useAppSelector((state) => state.auth.user);
  const [invoiceTotal, setInvoiceTotal] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  useEffect(() => {
    if (user && user.uid && invoiceUid) {
      dispatch(fetchInvoiceById({ userId: user.uid, invoiceUid }));
    }
  }, [dispatch, user, invoiceUid]);

  useEffect(() => {
    if (invoice) {
      const total = invoice.itemList
        .reduce((acc, item) => acc + item.total, 0)
        .toFixed(2);
      setInvoiceTotal(total);

      const paymentDueDate = invoice.invoiceDate
        ? calculateDueDate(invoice.invoiceDate, invoice.paymentTerms)
        : "Date not provided";

      setDueDate(paymentDueDate);
    }
  }, [invoice]);

  const handleStatusChange = (newStatus: InvoiceStatus) => {
    if (user && user.uid && invoiceUid) {
      dispatch(
        updateInvoice({
          userId: user.uid,
          invoiceUid,
          updatedData: { status: newStatus },
        })
      );

      dispatch(fetchInvoiceById({ userId: user.uid, invoiceUid }));
    }
  };

  const handleDelete = () => {
    if (user && user.uid && invoice) {
      dispatch(deleteInvoice({ userId: user.uid, invoiceUid }));

      router.push("/invoices");
    }
  };

  return (
    <div>
      <Link href="/invoices">
        <div className="flex gap-6 items-center mb-[31px]">
          <div className="rotate-90">
            <ArrowIcon />
          </div>
          <p className="text-heading-s-variant h-3">Go back</p>
        </div>
      </Link>

      {invoice && !loading && (
        <>
          <div className="flex items-center justify-between bg-white rounded-lg p-5 pl-8 shadow-item dark:bg-dark-light dark:border-dark-light">
            <div className="flex gap-5 items-center">
              <p className="text-body-variant text-[#858BB2] dark:text-gray-light">
                Status
              </p>
              <Status status={invoice.status} />
            </div>

            <div className="flex gap-2">
              <Button variant={"default"}>Edit</Button>
              <Modal handleConfirm={() => handleDelete()} id={invoice.id} />
              <Button
                variant={"primary"}
                onClick={() => handleStatusChange(InvoiceStatus.Paid)}
              >
                Mark as Paid
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between bg-white rounded-lg mt-6 p-[52px] shadow-item dark:bg-dark-light dark:border-dark-light">
            <div className="flex justify-between items-start w-full mb-7">
              <div className="flex flex-col gap-2">
                <p className="text-heading-s-variant">
                  <span className="text-blue-gray">#</span>
                  {invoice.id}
                </p>
                <p className="text-blue-gray dark:text-gray-light text-body-variant">
                  {invoice.projectDescription
                    ? invoice.projectDescription
                    : "No project description"}
                </p>
              </div>

              <div className="text-right text-blue-gray dark:text-gray-light text-body">
                <p>
                  {invoice.billFrom && invoice.billFrom.streetAddress
                    ? invoice.billFrom.streetAddress
                    : "No street"}
                </p>
                <p>
                  {invoice.billFrom && invoice.billFrom.city
                    ? invoice.billFrom.city
                    : "No city"}
                </p>
                <p>
                  {invoice.billFrom && invoice.billFrom.postCode
                    ? invoice.billFrom.postCode
                    : "No postcode"}
                </p>
                <p>
                  {invoice.billFrom && invoice.billFrom.country
                    ? invoice.billFrom.country
                    : "No country"}
                </p>
              </div>
            </div>

            <div className="flex gap-[118px] w-full mb-[7px]">
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="text-blue-gray dark:text-gray-light text-body-variant mb-[13px]">
                    Invoice Date
                  </h3>
                  <p className="text-heading-s-variant">
                    {invoice.invoiceDate !== ""
                      ? formatDate(invoice.invoiceDate)
                      : "Date not provided"}
                  </p>
                </div>
                <div>
                  <h3 className="text-blue-gray dark:text-gray-light text-body-variant mb-[13px]">
                    Payment Due
                  </h3>
                  <p className="text-heading-s-variant">{dueDate}</p>
                </div>
              </div>

              <div className="flex flex-col">
                <div>
                  <h3 className="text-blue-gray dark:text-gray-light text-body-variant mb-[13px]">
                    Bill To
                  </h3>
                  <p className="text-heading-s-variant">
                    {invoice.billTo && invoice.billTo.clientName
                      ? invoice.billTo.clientName
                      : "No client name"}
                  </p>
                </div>

                <div className="text-blue-gray dark:text-gray-light text-body mt-2">
                  <p>
                    {invoice.billTo && invoice.billTo.streetAddress
                      ? invoice.billTo.streetAddress
                      : "No street"}
                  </p>
                  <p>
                    {invoice.billTo && invoice.billTo.city
                      ? invoice.billTo.city
                      : "No city"}
                  </p>
                  <p>
                    {invoice.billTo && invoice.billTo.postCode
                      ? invoice.billTo.postCode
                      : "No postcode"}
                  </p>
                  <p>
                    {invoice.billTo && invoice.billTo.country
                      ? invoice.billTo.country
                      : "No country"}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-blue-gray dark:text-gray-light text-body-variant mb-[13px]">
                  Sent To
                </h3>
                <p className="text-heading-s-variant">
                  {invoice.billTo && invoice.billTo.clientEmail
                    ? invoice.billTo.clientEmail
                    : "No client email"}
                </p>
              </div>
            </div>

            <div className="w-full bg-[#F9FAFE] dark:bg-dark-medium px-8 py-9 rounded-t-lg mt-11">
              <div className="flex justify-between w-full mb-8">
                <h3 className="text-blue-gray dark:text-gray-light text-body-variant w-2/5">
                  Item Name
                </h3>
                <h3 className="text-blue-gray dark:text-gray-light text-body-variant w-1/5 text-center">
                  QTY.
                </h3>
                <h3 className="text-blue-gray dark:text-gray-light text-body-variant w-1/5 text-right">
                  Price
                </h3>
                <h3 className="text-blue-gray dark:text-gray-light text-body-variant w-1/5 text-right">
                  Total
                </h3>
              </div>

              {invoice.itemList.length !== 0 ? (
                <ul className="w-full flex flex-col gap-8">
                  {invoice.itemList.map((item, index) => (
                    <li
                      className="flex justify-between w-full text-heading-s-variant"
                      key={index}
                    >
                      <p className="w-2/5">{item.itemName}</p>
                      <p className="w-1/5 text-center text-blue-gray dark:text-gray-light">
                        {item.qty}
                      </p>
                      <p className="w-1/5 text-right text-blue-gray dark:text-gray-light">
                        £ {item.price}
                      </p>
                      <p className="w-1/5 text-right">
                        £ {item.total.toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-body-variant text-center text-blue-gray dark:text-gray-light">
                  No items. You can edit this invoice to add items.
                </p>
              )}
            </div>

            <div className="w-full text-white bg-[#373B53] dark:bg-dark-darkest px-8 py-9 rounded-b-lg">
              <div className="flex justify-between w-full items-center">
                <p className="text-body">Amount Due</p>
                <p className="text-heading-m">£ {invoiceTotal}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
