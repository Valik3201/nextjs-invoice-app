"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { fetchInvoices } from "@/src/lib/features/invoices/invoicesOperations";
import { InvoiceStatus } from "@/src/lib/types";
import { useInvoiceStatus } from "@/src/hooks/useInvoiceStatus";
import { newInvoice } from "@/src/components/InvoiceForm/initialValues";
import InvoicesStats from "@/src/components/Invoices/InvoicesStats";
import InvoiceFormWrapper from "@/src/components/InvoiceForm/InvoiceFormWrapper";
import InvoicesList from "@/src/components/Invoices/InvoicesList";
import FilterByStatus from "@/src/components/Invoices/FilterByStatus";
import NoInvoicesMessage from "@/src/components/Invoices/NoInvoicesMessage";
import SkeletonInvoices from "@/src/components/Loader/SkeletonInvoices";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { invoices, invoicesLoading } = useAppSelector(
    (state) => state.invoices
  );

  const { selectedStatuses, handleStatusChange } = useInvoiceStatus();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          await dispatch(fetchInvoices(user.uid)).unwrap();
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchData();

    if (!user) {
      router.push("/");
    }
  }, [user, dispatch, router]);

  const filteredInvoices = invoices.filter(
    (invoice) =>
      selectedStatuses.size === 0 ||
      selectedStatuses.has(invoice.status as InvoiceStatus)
  );

  if (invoicesLoading && !user) {
    return <SkeletonInvoices />;
  }

  return (
    <>
      {user && !invoicesLoading && (
        <>
          <div className="flex justify-between items-center mb-8 md:mb-[55px] lg:mb-[68px]">
            <InvoicesStats
              invoices={invoices}
              filteredInvoices={filteredInvoices}
              selectedStatuses={selectedStatuses}
            />

            <div className="relative flex gap-5 md:gap-10 items-center">
              <FilterByStatus
                selectedStatuses={selectedStatuses}
                handleStatusChange={handleStatusChange}
              />

              <InvoiceFormWrapper initialValues={newInvoice} action="new" />
            </div>
          </div>

          {invoices.length === 0 || filteredInvoices.length === 0 ? (
            <NoInvoicesMessage />
          ) : (
            <InvoicesList invoices={filteredInvoices} />
          )}
        </>
      )}
    </>
  );
}
