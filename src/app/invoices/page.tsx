"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import InvoiceFormWrapper from "@/src/components/InvoiceFormWrapper";
import Status from "@/src/components/Status";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { fetchInvoices } from "@/src/lib/features/invoices/invoicesOperations";
import { formatDate } from "@/src/lib/utils";
import { InvoiceStatus } from "@/src/lib/types";
import SkeletonInvoices from "@/src/components/SkeletonInvoices";
import ArrowIcon from "@/src/icons/ArrowIcon";
import CheckboxIcon from "@/src/icons/CheckboxIcon";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { invoices, invoicesLoading, invoicesError } = useAppSelector(
    (state) => state.invoices
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStatuses, setSelectedStatuses] = useState<Set<InvoiceStatus>>(
    new Set()
  );

  const toggleFilter = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleStatusChange = (status: InvoiceStatus) => {
    setSelectedStatuses((prevSelectedStatuses) => {
      const newSelectedStatuses = new Set(prevSelectedStatuses);
      if (newSelectedStatuses.has(status)) {
        newSelectedStatuses.delete(status);
      } else {
        newSelectedStatuses.add(status);
      }
      return newSelectedStatuses;
    });
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchInvoices(user.uid));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
  }, [user, router]);

  const filteredInvoices = invoices.filter(
    (invoice) =>
      selectedStatuses.size === 0 ||
      selectedStatuses.has(invoice.status as InvoiceStatus)
  );

  const getMessage = () => {
    if (selectedStatuses.size === 0) {
      return `There are ${invoices.length} total invoices`;
    } else {
      const statusMessages = Array.from(selectedStatuses).map((status) => {
        const count = invoices.filter(
          (invoice) => invoice.status === status
        ).length;
        return `${count} ${status} invoices`;
      });
      return `There are ${statusMessages.join(" and ")}`;
    }
  };

  return (
    <>
      {invoicesLoading && <SkeletonInvoices />}

      {user && !invoicesLoading && (
        <>
          <div className="flex justify-between items-center mb-8 md:mb-[55px] lg:mb-[68px]">
            <div>
              <h1 className="text-heading-m md:text-heading-l mb-[6px]">
                Invoices
              </h1>
              {invoices.length !== 0 || filteredInvoices.length !== 0 ? (
                <>
                  <p className="text-body-variant text-gray-medium dark:text-gray-light block sm:hidden">
                    {`${filteredInvoices.length} invoices`}
                  </p>
                  <p className="text-body-variant text-gray-medium dark:text-gray-light hidden sm:block">
                    {getMessage()}
                  </p>
                </>
              ) : (
                <p className="text-body-variant text-gray-medium dark:text-gray-light">
                  No invoices
                </p>
              )}
            </div>

            <div className="relative flex gap-5 md:gap-10 items-center">
              <button
                onClick={toggleFilter}
                className="flex gap-[14px] items-center text-heading-s-variant"
              >
                <p>
                  Filter <span className="hidden md:inline">by status</span>
                </p>

                <span
                  className={`transition duration-200 ease-in-out ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ArrowIcon />
                </span>
              </button>

              {isOpen && (
                <div className="absolute top-14 -left-9 w-48 p-6 rounded-lg bg-white shadow-filter-light dark:bg-dark-medium dark:shadow-filter-dark">
                  <ul className="text-heading-s-variant space-y-4">
                    {Object.values(InvoiceStatus).map((status) => (
                      <li className="flex items-center" key={status}>
                        <label className="relative flex gap-4 items-center capitalize hover:cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedStatuses.has(status)}
                            onChange={() => handleStatusChange(status)}
                            className="peer appearance-none forced-colors:appearance-auto w-4 h-4 bg-gray-light border-primary hover:border rounded-[0.12rem] focus:ring-primary focus:ring-1 dark:bg-dark-light"
                          />
                          <CheckboxIcon />
                          {status}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <InvoiceFormWrapper />
            </div>
          </div>

          <ul className="flex flex-col gap-4 w-full">
            {filteredInvoices &&
              filteredInvoices.map((invoice) => {
                const total = (invoice.itemList || [])
                  .reduce((acc, item) => acc + item.total, 0)
                  .toFixed(2);

                return (
                  <li key={invoice.id}>
                    <Link href={`/invoices/${invoice.uid}`}>
                      <div className="bg-white rounded-lg px-4 py-3 md:ps-6 lg:ps-8 shadow-item border-2 border-white hover:border-primary transition duration-200 ease-in-out dark:bg-dark-light dark:border-dark-light">
                        {/* Tablet % Desktop Styles */}
                        <div className="hidden md:flex items-center justify-between">
                          <p className="text-heading-s-variant w-[15%]">
                            <span className="text-blue-gray">#</span>
                            {invoice.id}
                          </p>
                          <p className="text-body-variant text-gray-medium dark:text-gray-light w-[20%]">
                            {invoice.invoiceDate !== ""
                              ? `Due ${formatDate(invoice.invoiceDate)}`
                              : "Date not provided"}
                          </p>
                          <p className="text-body-variant text-gray-medium dark:text-gray-light w-[20%] truncate">
                            {invoice.billTo && invoice.billTo.clientName
                              ? invoice.billTo.clientName
                              : "No client name"}
                          </p>
                          <p className="text-heading-s w-[15%]">£ {total}</p>
                          <div className="w-[104px]">
                            <Status status={invoice.status} />
                          </div>

                          <div className="-rotate-90 py-5">
                            <ArrowIcon />
                          </div>
                        </div>

                        {/* Mobile Styles */}
                        <div className="flex md:hidden flex-col items-stretch justify-center gap-6">
                          <div className="flex items-center justify-between">
                            <p className="text-heading-s-variant">
                              <span className="text-blue-gray">#</span>
                              {invoice.id}
                            </p>
                            <p className="text-body-variant text-gray-medium dark:text-gray-light">
                              {invoice.billTo && invoice.billTo.clientName
                                ? invoice.billTo.clientName
                                : "No client name"}
                            </p>
                          </div>
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-body-variant text-gray-medium dark:text-gray-light pb-2">
                                {invoice.invoiceDate !== ""
                                  ? `Due ${formatDate(invoice.invoiceDate)}`
                                  : "Date not provided"}
                              </p>
                              <p className="text-heading-s">£ {total}</p>
                            </div>

                            <div className="w-[104px]">
                              <Status status={invoice.status} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
          </ul>

          {(invoices.length === 0 || filteredInvoices.length === 0) && (
            <div className="flex flex-col items-center gap-[23px]">
              <Image
                src="/no-invoices.svg"
                alt="No Invoices Info"
                width={242}
                height={200}
                className="mt-[70px] md:mt-[154px] lg:mt-[72px]"
                priority
              />
              <h2 className="text-heading-m">There is nothing here</h2>
              <p className="text-body-variant text-gray-medium dark:text-gray-light text-center">
                Create an invoice by clicking the <br />
                <span className="font-bold">New Invoice</span> button and get
                started
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
}
