"use client";

import { Invoice } from "@/src/lib/types";
import InvoiceForm from "../InvoiceForm/InvoiceForm";
import Button from "../Button/Button";
import PlusIcon from "@/src/icons/PlusIcon";
import { useToggleState } from "@/src/hooks/useToggleState";

export default function InvoiceFormWrapper({
  initialValues,
  action,
}: {
  initialValues: Invoice;
  action: "new" | "edit";
}) {
  const { state: isOpen, toggleState } = useToggleState();

  return (
    <>
      {action === "new" ? (
        <Button variant="primary" icon={<PlusIcon />} onClick={toggleState}>
          New<span className="hidden md:inline"> Invoice</span>
        </Button>
      ) : (
        <Button variant={"default"} onClick={toggleState} className="px-6">
          Edit
        </Button>
      )}

      <div
        onClick={toggleState}
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
          <InvoiceForm
            initialValues={initialValues}
            closeForm={toggleState}
            action={action}
          />
        </div>
      </div>
    </>
  );
}
