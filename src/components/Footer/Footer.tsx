"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isInvoicePage = pathname.startsWith("/invoices/");

  return (
    <footer
      className={`mt-auto w-[327px] md:w-[672px] lg:w-[730px] mx-auto flex flex-col gap-4 pb-8 ${
        isInvoicePage ? "mb-20 md:mb-0" : ""
      }`}
    >
      <div className="h-px w-full bg-gray-light dark:bg-dark-medium"></div>

      <div className="flex gap-2 items-center justify-center pt-4">
        <Image src="/logo-sm.png" alt="Small logo" width={25} height={25} />
        <p className="text-heading-m h-5">Invoices</p>
      </div>

      <p className="text-body text-center text-gray-medium dark:text-gray-light">
        A software solution for managing the creation, updating, and tracking of
        invoices.
      </p>
      <p className="text-body text-center text-gray-medium dark:text-gray-light">
        © {new Date().getFullYear()}{" "}
        <a href="/" className="hover:underline">
          Invoices
        </a>
        . All Rights Reserved.
      </p>
    </footer>
  );
}
