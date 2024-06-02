"use client";

import { useState } from "react";
import AddInvoiceForm from "../Form/AddInvoiceForm";
import Button from "../Button/Button";
import PlusIcon from "@/src/icons/PlusIcon";

export default function InvoiceFormWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);

  return (
    <>
      <Button variant="primary" icon={<PlusIcon />} onClick={openForm}>
        New<span className="hidden md:inline"> Invoice</span>
      </Button>

      <div
        onClick={closeForm}
        className={`fixed top-0 left-0 transition duration-500 ease-in-out ${
          isOpen
            ? "overflow-y-auto overflow-x-hidden z-10 w-full h-full max-h-full bg-dark-darkest/50"
            : ""
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 left-0 h-svh lg:pl-[103px] pt-[72px] md:pt-20 lg:pt-0 bg-white text-dark-darkest dark:bg-dark dark:text-white rounded-r-[1.25rem] transition duration-500 ease-in-out ${
            isOpen ? "transform-none" : "-translate-x-full"
          }`}
        >
          <AddInvoiceForm closeForm={closeForm} />
        </div>
      </div>
    </>
  );
}