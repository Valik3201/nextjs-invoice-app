"use client";

import { useEffect } from "react";
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

export default function Page() {
  const invoiceId = useParams<{ invoice: string }>().invoice;
  const dispatch = useAppDispatch();
  const { invoice, loading, error } = useAppSelector((state) => state.invoices);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user.uid && invoiceId) {
      dispatch(fetchInvoiceById({ userId: user.uid, invoiceId }));
    }
  }, [dispatch, user, invoiceId]);

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
          <p className="text-heading-s-variant">Go back</p>
        </div>
      </Link>

      {invoice && !loading && (
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
      )}
    </div>
  );
}
