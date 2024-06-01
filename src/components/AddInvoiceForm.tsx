"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { addInvoice } from "../lib/features/invoices/invoicesOperations";
import { Invoice, PaymentTerms, InvoiceStatus } from "../lib/types";
import InputField from "./InputField";
import InputDate from "./InputDate";
import SelectField from "./SelectField";
import Button from "./Button";
import PlusIcon from "../icons/PlusIcon";
import TrashIcon from "../icons/TrashIcon";
import ArrowIcon from "../icons/ArrowIcon";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handlePaymentTermChange = (value: PaymentTerms) => {
    setInvoiceData({ ...invoiceData, paymentTerms: value });
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
        New<span className="hidden md:inline"> Invoice</span>
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
          className={`fixed top-0 left-0 h-svh lg:pl-[103px] pt-[72px] md:pt-20 lg:pt-0 bg-white text-dark-darkest dark:bg-dark dark:text-white rounded-r-[1.25rem] transition duration-500 ease-in-out ${
            isOpen ? "transform-none" : "-translate-x-full"
          }`}
        >
          <div className="relative md:w-[616px] max-h-full pl-6 md:pl-14 pr-2 md:pr-10 py-6 md:pb-28 md:py-16">
            <button
              type="button"
              className="flex gap-6 items-center mb-6 md:hidden"
              onClick={handleDiscard}
            >
              <div className="rotate-90">
                <ArrowIcon />
              </div>
              <p className="text-heading-s-variant h-3 hover:text-blue-gray transition duration-200 ease-in-out dark:hover:text-gray-medium">
                Go back
              </p>
            </button>

            <h2 className="text-heading-m mb-6 md:mb-12">New Invoice</h2>

            <form
              onSubmit={handleSubmit}
              className="h-[calc(100svh_-_245px)] overflow-y-scroll overflow-x-hidden pb-20 md:pb-32 lg:pb-8 pl-0.5 pr-4"
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
                <div className="flex flex-col md:flex-row md:gap-6">
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
                  </div>
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
                <div className="flex flex-col md:flex-row md:gap-6">
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
                  </div>
                  <InputField
                    label="Country"
                    name="billTo.country"
                    value={invoiceData.billTo.country}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <InputDate
                  name="invoiceDate"
                  value={invoiceData.invoiceDate}
                  onChange={handleChange}
                />

                <SelectField onChange={handlePaymentTermChange} />
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

              {/* Tablet & Desktop Styles */}
              <ul className="hidden md:block max-w-full">
                {invoiceData.itemList.map((item, index) => (
                  <li key={nanoid()} className="flex gap-4 items-center">
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
                        {item.qty && item.price
                          ? item.total.toFixed(2)
                          : Number(0).toFixed(2)}
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

              {/*  Mobile Styles */}
              <ul className="block md:hidden max-w-full">
                {invoiceData.itemList.map((item, index) => (
                  <li key={nanoid()} className="flex flex-col gap-6">
                    <InputField
                      label={"Item Name"}
                      name={"itemName"}
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                    <div className="flex gap-4 -mt-[25px]">
                      <div className="w-[25%]">
                        <InputField
                          label={"Qty"}
                          name={"qty"}
                          type="number"
                          value={item.qty}
                          onChange={(e) => handleItemChange(index, e)}
                        />
                      </div>
                      <div className="w-[35%]">
                        <InputField
                          label={"Price"}
                          name={"price"}
                          type="number"
                          value={item.price.toFixed(2)}
                          onChange={(e) => handleItemChange(index, e)}
                        />
                      </div>
                      <div className="w-[35%] mb-[25px]">
                        <h4 className="mb-2 text-body-variant text-blue-gray dark:text-gray-light">
                          Total
                        </h4>
                        <p className="py-4 text-gray-medium text-heading-s-variant dark:text-gray-light">
                          {item.qty && item.price
                            ? item.total.toFixed(2)
                            : Number(0).toFixed(2)}
                        </p>
                      </div>
                      <div className="mt-[28px]">
                        <Button
                          variant="icon"
                          onClick={() => handleRemoveItem(index)}
                          icon={<TrashIcon />}
                          isOnlyIcon
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <Button variant="default" size="full" onClick={handleAddItem}>
                + Add New Item
              </Button>

              <div className="fixed bottom-0 left-0 z-50 lg:ml-[103px] py-5 md:py-8 px-6 md:px-14 w-full md:w-[616px] flex justify-between shadow-[0_0_200px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_200px_0_rgba(0,0,0,0.3)] bg-white text-dark-darkest dark:bg-dark dark:text-white md:rounded-r-[1.25rem]">
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
