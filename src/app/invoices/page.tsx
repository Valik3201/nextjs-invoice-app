"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AddInvoiceForm from "@/src/components/AddInvoiceForm";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { fetchInvoices } from "@/src/lib/features/invoices/invoicesOperations";
import ArrowIcon from "@/src/icons/ArrowIcon";
import { formatDate } from "@/src/lib/utils";
import Status from "@/src/components/Status";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  const invoices = useAppSelector((state) => state.invoices.invoices);
  const error = useAppSelector((state) => state.invoices.error);

  useEffect(() => {
    if (user) {
      dispatch(fetchInvoices(user.uid));
    }
  }, [user, dispatch]);

  const result = {
    invoices,
    error,
  };

  console.log(result);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
  }, [user, router]);

  return (
    <>
      {user && !loading && (
        <>
          <div className="flex justify-between items-center mb-8 md:mb-[55px] lg:mb-[68px]">
            <div>
              <h1 className="text-heading-l mb-[6px]">Invoices</h1>
              {invoices.length !== 0 ? (
                <p className="text-body-variant text-gray-medium dark:text-gray-light">
                  There are {invoices.length} total invoices
                </p>
              ) : (
                <p>No invoices</p>
              )}
            </div>

            <div className="flex gap-[41px] items-center">
              <button className="flex gap-[14px] items-center text-heading-s-variant">
                Filter by status
                <ArrowIcon />
              </button>
              <AddInvoiceForm />
            </div>
          </div>

          <ul className="flex flex-col gap-4 w-full">
            {invoices &&
              invoices.map((invoice) => {
                const total = (invoice.itemList || [])
                  .reduce((acc, item) => acc + item.total, 0)
                  .toFixed(2);

                return (
                  <li key={invoice.id}>
                    <Link href={`/invoices/${invoice.uid}`}>
                      <div className="flex items-center justify-between bg-white rounded-lg p-5 pl-8 shadow-item border-2 border-white hover:border-primary transition duration-200 ease-in-out dark:bg-dark-light dark:border-dark-light">
                        <p className="text-heading-s-variant w-[15%]">
                          <span className="text-blue-gray">#</span>
                          {invoice.id}
                        </p>
                        <p className="text-gray-medium dark:text-gray-light w-[20%]">
                          {invoice.invoiceDate !== ""
                            ? `Due ${formatDate(invoice.invoiceDate)}`
                            : "Date not provided"}
                        </p>
                        <p className="text-gray-medium dark:text-gray-light w-[20%] truncate">
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
                    </Link>
                  </li>
                );
              })}
          </ul>

          {invoices.length === 0 && (
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
