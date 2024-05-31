"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { addInvoice } from "../lib/features/invoices/invoicesOperations";
import { Invoice, PaymentTerms, InvoiceStatus } from "../lib/types";
import InputField from "./InputField";
import InputDate from "./InputDate";
import SelectField from "./SelectField";
import Button from "./Button";
import PlusIcon from "../icons/PlusIcon";
import TrashIcon from "../icons/TrashIcon";

export default function AddInvoiceForm() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState<Invoice>({
    id: "",
    uid: "",
    status: InvoiceStatus.Pending,
    billFrom: {
      streetAddress: "",
      city: "",
      postCode: "",
      country: "",
    },
    billTo: {
      clientName: "",
      clientEmail: "",
      streetAddress: "",
      city: "",
      postCode: "",
      country: "",
    },
    invoiceDate: "",
    paymentTerms: PaymentTerms.Net30Days,
    projectDescription: "",
    itemList: [],
  });

  const clearForm = () => {
    setInvoiceData({
      id: "",
      uid: "",
      billFrom: {
        city: "",
        country: "",
        postCode: "",
        streetAddress: "",
      },
      billTo: {
        city: "",
        clientEmail: "",
        clientName: "",
        country: "",
        postCode: "",
        streetAddress: "",
      },
      invoiceDate: "",
      itemList: [],
      paymentTerms: PaymentTerms.Net30Days,
      projectDescription: "",
      status: InvoiceStatus.Pending,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setInvoiceData((prevData) => {
      if (keys.length === 2) {
        const [section, key] = keys;
        return {
          ...prevData,
          [section]: {
            ...(prevData as any)[section],
            [key]: value,
          },
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedItems = [...invoiceData.itemList];

    updatedItems[index] = {
      ...updatedItems[index],
      [name]: name === "qty" || name === "price" ? parseFloat(value) : value,
      total:
        name === "qty" || name === "price"
          ? name === "qty"
            ? parseFloat(value) * updatedItems[index].price
            : updatedItems[index].qty * parseFloat(value)
          : updatedItems[index].total,
    };

    setInvoiceData({ ...invoiceData, itemList: updatedItems });
  };

  const handleAddItem = () => {
    setInvoiceData({
      ...invoiceData,
      itemList: [
        ...invoiceData.itemList,
        { itemName: "", qty: 0, price: 0, total: 0 },
      ],
    });
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = invoiceData.itemList.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, itemList: updatedItems });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (user) {
      try {
        dispatch(addInvoice({ userId: user.uid, invoice: invoiceData }));

        alert("Invoice added successfully!");

        clearForm();
      } catch (error) {
        console.error("Error adding invoice:", error);
        alert("Failed to add invoice. Please try again later.");
      }
    }
  };

  const handleSaveAsDraft = async () => {
    if (user) {
      const draftInvoiceData = {
        ...invoiceData,
        status: InvoiceStatus.Draft,
      };
      try {
        await dispatch(
          addInvoice({ userId: user.uid, invoice: draftInvoiceData })
        );

        alert("Invoice saved as draft!");

        clearForm();
      } catch (error) {
        console.error("Error saving invoice as draft:", error);
        alert("Failed to save invoice as draft. Please try again later.");
      }
    }

    closeForm();
  };

  const handleDiscard = () => {
    clearForm();
    closeForm();
  };

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeForm();
    }
  };

  return (
    <>
      <Button variant="primary" icon={<PlusIcon />} onClick={openForm}>
        New Invoice
      </Button>

      <div
        onClick={handleBackdropClick}
        className={`fixed top-0 left-0 transition duration-500 ease-in-out ${
          isOpen
            ? "overflow-y-auto overflow-x-hidden z-10 w-full h-full max-h-full bg-dark-darkest/50"
            : ""
        }`}
      >
        <div
          onClick={handleBackdropClick}
          className={`fixed top-0 left-0 h-svh pl-[103px] bg-white text-dark-darkest dark:bg-dark dark:text-white rounded-r-[1.25rem] transition duration-500 ease-in-out ${
            isOpen ? "transform-none" : "-translate-x-full"
          }`}
        >
          <div className="relative lg:w-[616px] max-h-full pl-14 pr-10 py-16">
            <h2 className="text-heading-m mb-12">New Invoice</h2>

            <form
              onSubmit={handleSubmit}
              className="h-[calc(100svh_-_245px)] overflow-y-scroll overflow-x-hidden pb-8 pl-0.5 pr-4"
            >
              <h3 className="text-primary text-heading-s-variant mb-6">
                Bill From
              </h3>
              <div className="flex flex-col">
                <InputField
                  label="Street Address"
                  name="billFrom.streetAddress"
                  value={invoiceData.billFrom.streetAddress}
                  onChange={handleChange}
                />
                <div className="flex gap-6">
                  <InputField
                    label="City"
                    name="billFrom.city"
                    value={invoiceData.billFrom.city}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Post Code"
                    name="billFrom.postCode"
                    value={invoiceData.billFrom.postCode}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Country"
                    name="billFrom.country"
                    value={invoiceData.billFrom.country}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <h3 className="text-primary text-heading-s-variant mb-6">
                Bill To
              </h3>
              <div className="flex flex-col">
                <InputField
                  label="Client Name"
                  name="billTo.clientName"
                  value={invoiceData.billTo.clientName}
                  onChange={handleChange}
                />
                <InputField
                  label="Client Email"
                  type="email"
                  name="billTo.clientEmail"
                  value={invoiceData.billTo.clientEmail}
                  onChange={handleChange}
                  placeholder="e.g. email@example.com"
                />
                <InputField
                  label="Street Address"
                  name="billTo.streetAddress"
                  value={invoiceData.billTo.streetAddress}
                  onChange={handleChange}
                />
                <div className="flex gap-6">
                  <InputField
                    label="City"
                    name="billTo.city"
                    value={invoiceData.billTo.city}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Post Code"
                    name="billTo.postCode"
                    value={invoiceData.billTo.postCode}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Country"
                    name="billTo.country"
                    value={invoiceData.billTo.country}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* <InputField
                  label="Invoice Date"
                  name="invoiceDate"
                  type="date"
                  value={invoiceData.invoiceDate.toString()}
                  onChange={handleChange}
                /> */}

                <InputDate
                  name="invoiceDate"
                  value={invoiceData.invoiceDate}
                  onChange={handleChange}
                />

                <SelectField
                  label="Payment Terms"
                  name="paymentTerms"
                  value={invoiceData.paymentTerms}
                  onChange={handleChange}
                  options={[
                    { label: "Net 1 Day", value: PaymentTerms.Net1Day },
                    { label: "Net 7 Days", value: PaymentTerms.Net7Days },
                    { label: "Net 14 Days", value: PaymentTerms.Net14Days },
                    { label: "Net 30 Days", value: PaymentTerms.Net30Days },
                  ]}
                />
              </div>

              <InputField
                label="Project Description"
                name="projectDescription"
                value={invoiceData.projectDescription}
                onChange={handleChange}
                placeholder="e.g. Graphic Design Service"
              />

              <h3 className="text-blue-gray-light text-lg font-bold -tracking-[0.38px] mb-4">
                Item List
              </h3>

              <ul className="max-w-full">
                {invoiceData.itemList.map((item, index) => (
                  <li key={index} className="flex gap-4 items-center">
                    <div className="w-[35%]">
                      <InputField
                        label={index === 0 ? "Item Name" : ""}
                        name={"itemName"}
                        value={item.itemName}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                    </div>
                    <div className="w-[15%]">
                      <InputField
                        label={index === 0 ? "Qty" : ""}
                        name={"qty"}
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                    </div>
                    <div className="w-[20%]">
                      <InputField
                        label={index === 0 ? "Price" : ""}
                        name={"price"}
                        type="number"
                        value={item.price.toFixed(2)}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                    </div>
                    <div className="w-[10%] mb-[25px]">
                      <h4 className="mb-2 text-body-variant text-blue-gray dark:text-gray-light">
                        {index === 0 ? "Total" : ""}
                      </h4>
                      <p className="py-4 text-gray-medium text-heading-s-variant dark:text-gray-light">
                        {item.total.toFixed(2)}
                      </p>
                    </div>

                    <div className={`${index === 0 ? "mt-[15px]" : ""}`}>
                      <Button
                        variant="icon"
                        onClick={() => handleRemoveItem(index)}
                        icon={<TrashIcon />}
                        isOnlyIcon
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <Button variant="default" size="full" onClick={handleAddItem}>
                + Add New Item
              </Button>

              <div className="fixed bottom-0 left-0 ml-[103px] py-8 px-14 lg:w-[616px] flex justify-between shadow-[0_0_200px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_200px_0_rgba(0,0,0,0.3)] bg-white text-dark-darkest dark:bg-dark dark:text-white rounded-r-[1.25rem]">
                <Button variant="default" onClick={handleDiscard}>
                  Discard
                </Button>

                <div className="flex gap-2">
                  <Button variant="dark" onClick={handleSaveAsDraft}>
                    Save as Draft
                  </Button>

                  <Button variant="primary" type="submit">
                    Save & Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
