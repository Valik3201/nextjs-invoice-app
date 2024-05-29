"use client";

import { useEffect, useState } from "react";
import ArrowIcon from "@/src/icons/ArrowIcon";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import {
  fetchInvoiceById,
  updateInvoice,
} from "@/src/lib/features/invoices/invoicesOperations";
import { InvoiceStatus } from "@/src/lib/types";
import { useParams } from "next/navigation";
import Link from "next/link";
import Status from "@/src/components/Status";
import { formatDate, calculateDueDate } from "@/src/lib/utils";

export default function Page() {
  const invoiceId = useParams<{ invoice: string }>().invoice;
  const dispatch = useAppDispatch();
  const { invoice, loading, error } = useAppSelector((state) => state.invoices);
  const user = useAppSelector((state) => state.auth.user);
  const [invoiceTotal, setInvoiceTotal] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  useEffect(() => {
    if (user && user.uid && invoiceId) {
      dispatch(fetchInvoiceById({ userId: user.uid, invoiceId }));
    }
  }, [dispatch, user, invoiceId]);

  useEffect(() => {
    if (invoice) {
      const total = invoice.itemList
        .reduce((acc, item) => acc + item.total, 0)
        .toFixed(2);
      setInvoiceTotal(total);

      const paymentDueDate = calculateDueDate(
        invoice.invoiceDate,
        invoice.paymentTerms
      );
      setDueDate(paymentDueDate);
    }
  }, [invoice]);

  const handleStatusChange = (newStatus: InvoiceStatus) => {
    if (user && user.uid && invoiceId) {
      dispatch(
        updateInvoice({
          userId: user.uid,
          invoiceId,
          updatedData: { status: newStatus },
        })
      );

      dispatch(fetchInvoiceById({ userId: user.uid, invoiceId }));
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
              <button className="py-4 px-6 rounded-full text-heading-s-variant text-blue-gray-light bg-[#F9FAFE] hover:bg-gray-light dark:text-gray-light dark:bg-dark-medium dark:hover:bg-white/10 transition duration-200 ease-in-out">
                Edit
              </button>
              <button className="py-4 px-6 rounded-full text-heading-s-variant text-white bg-red-medium hover:bg-red-light transition duration-200 ease-in-out">
                Delete
              </button>
              <button
                onClick={() => handleStatusChange(InvoiceStatus.Paid)}
                className="py-4 px-6 rounded-full text-heading-s-variant text-white bg-primary hover:bg-primary-light transition duration-200 ease-in-out"
              >
                Mark as Paid
              </button>
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
                  {invoice.projectDescription}
                </p>
              </div>

              <div className="text-right text-blue-gray dark:text-gray-light text-body">
                <p>{invoice.billFrom.streetAddress}</p>
                <p>{invoice.billFrom.city}</p>
                <p>{invoice.billFrom.postCode}</p>
                <p>{invoice.billFrom.country}</p>
              </div>
            </div>

            <div className="flex gap-[118px] w-full mb-[7px]">
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="text-blue-gray dark:text-gray-light text-body-variant mb-[13px]">
                    Invoice Date
                  </h3>
                  <p className="text-heading-s-variant">
                    {formatDate(invoice.invoiceDate)}
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
                    {invoice.billTo.clientName}
                  </p>
                </div>

                <div className="text-blue-gray dark:text-gray-light text-body mt-2">
                  <p>{invoice.billTo.streetAddress}</p>
                  <p>{invoice.billTo.city}</p>
                  <p>{invoice.billTo.postCode}</p>
                  <p>{invoice.billTo.country}</p>
                </div>
              </div>
              <div>
                <h3 className="text-blue-gray dark:text-gray-light text-body-variant mb-[13px]">
                  Sent To
                </h3>
                <p className="text-heading-s-variant">
                  {invoice.billTo.clientEmail}
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
            </div>
            <div className="w-full mb-8 text-white bg-[#373B53] dark:bg-dark-darkest px-8 py-9 rounded-b-lg">
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
