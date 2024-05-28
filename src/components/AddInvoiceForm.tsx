"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { addInvoice } from "../lib/features/invoices/invoicesOperations";
import { Invoice, PaymentTerms, InvoiceStatus } from "../lib/types";
import InputField from "./InputField";
import SelectField from "./SelectField";

export default function AddInvoiceForm() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

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

    let parsedValue: number | string = value;

    if (name === "qty" || name === "price") {
      parsedValue = value !== "" ? parseFloat(value) : "";
    }

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
  };

  const handleDiscard = () => {
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="lg:w-[620px]">
      <h2 className="text-primary">Bill From</h2>
      <div className="flex flex-col">
        <InputField
          label="Street Address"
          name="billFrom.streetAddress"
          value={invoiceData.billFrom.streetAddress}
          onChange={handleChange}
          placeholder="Street Address"
        />
        <div className="flex">
          <InputField
            label="City"
            name="billFrom.city"
            value={invoiceData.billFrom.city}
            onChange={handleChange}
            placeholder="City"
          />
          <InputField
            label="Post Code"
            name="billFrom.postCode"
            value={invoiceData.billFrom.postCode}
            onChange={handleChange}
            placeholder="Post Code"
          />
          <InputField
            label="Country"
            name="billFrom.country"
            value={invoiceData.billFrom.country}
            onChange={handleChange}
            placeholder="Country"
          />
        </div>
      </div>

      <h2 className="text-primary">Bill To</h2>
      <div className="flex flex-col">
        <InputField
          label="Client Name"
          name="billTo.clientName"
          value={invoiceData.billTo.clientName}
          onChange={handleChange}
          placeholder="Client Name"
        />
        <InputField
          label="Client Email"
          type="email"
          name="billTo.clientEmail"
          value={invoiceData.billTo.clientEmail}
          onChange={handleChange}
          placeholder="Client Email"
        />
        <InputField
          label="Street Address"
          name="billTo.streetAddress"
          value={invoiceData.billTo.streetAddress}
          onChange={handleChange}
          placeholder="Street Address"
        />
        <div className="flex">
          <InputField
            label="City"
            name="billTo.city"
            value={invoiceData.billTo.city}
            onChange={handleChange}
            placeholder="City"
          />
          <InputField
            label="Post Code"
            name="billTo.postCode"
            value={invoiceData.billTo.postCode}
            onChange={handleChange}
            placeholder="Post Code"
          />
          <InputField
            label="Country"
            name="billTo.country"
            value={invoiceData.billTo.country}
            onChange={handleChange}
            placeholder="Country"
          />
        </div>
      </div>

      <div className="flex">
        <InputField
          label="Invoice Date"
          name="invoiceDate"
          type="date"
          value={invoiceData.invoiceDate.toString()}
          onChange={handleChange}
          placeholder="Invoice Date"
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
        placeholder="Project Description"
      />

      <h2 className="text-blue-gray-light">Item List</h2>

      {invoiceData.itemList.map((item, index) => (
        <div key={index} className="flex">
          <InputField
            label={index === 0 ? "Item Name" : ""}
            name={"itemName"}
            value={item.itemName}
            onChange={(e) => handleItemChange(index, e)}
            placeholder="Item Name"
          />
          <InputField
            label={index === 0 ? "Qty" : ""}
            name={"qty"}
            type="number"
            value={item.qty.toFixed(2)}
            onChange={(e) => handleItemChange(index, e)}
            placeholder="Qty"
          />
          <InputField
            label={index === 0 ? "Price" : ""}
            name={"price"}
            type="number"
            value={item.price.toFixed(2)}
            onChange={(e) => handleItemChange(index, e)}
            placeholder="Price"
          />
          <InputField
            label={index === 0 ? "Total" : ""}
            name={"total"}
            type="number"
            value={item.total.toFixed(2)}
            onChange={(e) => handleItemChange(index, e)}
            placeholder="Total"
            readOnly={true}
          />
          <button type="button" onClick={() => handleRemoveItem(index)}>
            Delete Item
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddItem}>
        + Add New Item
      </button>

      <br />
      <div className="flex justify-between">
        <button type="button" onClick={handleDiscard}>
          Discard
        </button>
        <div className="flex gap-8">
          <button type="button" onClick={handleSaveAsDraft}>
            Save as Draft
          </button>
          <button type="submit">Add Invoice</button>
        </div>
      </div>
    </form>
  );
}
