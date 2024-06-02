"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { Formik, Form, FieldArray, getIn } from "formik";
import * as Yup from "yup";
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

const validationSchema = Yup.object().shape({
  billFrom: Yup.object().shape({
    streetAddress: Yup.string().required("can’t be empty"),
    city: Yup.string().required("can’t be empty"),
    postCode: Yup.string().required("can’t be empty"),
    country: Yup.string().required("can’t be empty"),
  }),
  billTo: Yup.object().shape({
    clientName: Yup.string().required("can’t be empty"),
    clientEmail: Yup.string().required("can’t be empty"),
    streetAddress: Yup.string().required("can’t be empty"),
    city: Yup.string().required("can’t be empty"),
    postCode: Yup.string().required("can’t be empty"),
    country: Yup.string().required("can’t be empty"),
  }),
  invoiceDate: Yup.string().required("can’t be empty"),
  paymentTerms: Yup.string().required("can’t be empty"),
  projectDescription: Yup.string().required("can’t be empty"),
  itemList: Yup.array().of(
    Yup.object()
      .shape({
        id: Yup.string().required(),
        itemName: Yup.string().required("can’t be empty"),
        qty: Yup.number().min(1, " ").required(" "),
        price: Yup.number().positive(" ").required(" "),
        total: Yup.number().required(" "),
      })
      .required("Required")
  ),
});

export default function AddInvoiceForm() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const initialValues: Invoice = {
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
  };

  const handleSubmit = async (
    values: Invoice,
    { setSubmitting, resetForm }: any
  ) => {
    if (user) {
      try {
        dispatch(addInvoice({ userId: user.uid, invoice: values }));
        resetForm();
      } catch (error) {
        console.error("Error adding invoice:", error);
        alert("Failed to add invoice. Please try again later.");
      }
    }
    setSubmitting(false);
    closeForm();
  };

  const handleSaveAsDraft = async (
    values: Invoice,
    { setSubmitting, resetForm }: any
  ) => {
    if (user) {
      const draftInvoiceData = {
        ...values,
        status: InvoiceStatus.Draft,
      };
      try {
        await dispatch(
          addInvoice({ userId: user.uid, invoice: draftInvoiceData })
        );
        resetForm();
        closeForm();
      } catch (error) {
        console.error("Error saving invoice as draft:", error);
      }
    }
    setSubmitting(false);
  };

  const handleDiscard = (resetForm: () => void) => {
    resetForm();
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

  const calculateTotal = (qty: any, price: any) => {
    const parsedQty = parseFloat(qty);
    const parsedPrice = parseFloat(price);
    return !parsedQty || !parsedPrice || isNaN(parsedQty) || isNaN(parsedPrice)
      ? 0
      : parsedQty * parsedPrice;
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
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                resetForm,
                setFieldValue,
                setSubmitting,
              }) => (
                <Form>
                  <button
                    type="button"
                    className="flex gap-6 items-center mb-6 md:hidden"
                    onClick={() => handleDiscard(resetForm)}
                  >
                    <div className="rotate-90">
                      <ArrowIcon />
                    </div>
                    <p className="text-heading-s-variant h-3 hover:text-blue-gray transition duration-200 ease-in-out dark:hover:text-gray-medium">
                      Go back
                    </p>
                  </button>

                  <h2 className="text-heading-m mb-6 md:mb-12">New Invoice</h2>

                  <div className="h-[calc(100svh_-_245px)] overflow-y-scroll overflow-x-hidden pb-12 md:pb-32 lg:pb-8 pl-0.5 pr-4">
                    <h3 className="text-primary text-heading-s-variant mb-6">
                      Bill From
                    </h3>
                    <div className="flex flex-col">
                      <InputField
                        label="Street Address"
                        name="billFrom.streetAddress"
                        value={values.billFrom.streetAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.billFrom?.streetAddress &&
                          errors.billFrom?.streetAddress
                        }
                      />
                      <div className="flex flex-col md:flex-row md:gap-6">
                        <div className="flex gap-6">
                          <InputField
                            label="City"
                            name="billFrom.city"
                            value={values.billFrom.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.billFrom?.city && errors.billFrom?.city
                            }
                          />
                          <InputField
                            label="Post Code"
                            name="billFrom.postCode"
                            value={values.billFrom.postCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.billFrom?.postCode &&
                              errors.billFrom?.postCode
                            }
                          />
                        </div>
                        <InputField
                          label="Country"
                          name="billFrom.country"
                          value={values.billFrom.country}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.billFrom?.country &&
                            errors.billFrom?.country
                          }
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
                        value={values.billTo.clientName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.billTo?.clientName &&
                          errors.billTo?.clientName
                        }
                      />
                      <InputField
                        label="Client Email"
                        type="email"
                        name="billTo.clientEmail"
                        value={values.billTo.clientEmail}
                        onChange={handleChange}
                        placeholder="e.g. email@example.com"
                        error={
                          touched.billTo?.clientEmail &&
                          errors.billTo?.clientEmail
                        }
                      />
                      <InputField
                        label="Street Address"
                        name="billTo.streetAddress"
                        value={values.billTo.streetAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.billTo?.streetAddress &&
                          errors.billTo?.streetAddress
                        }
                      />
                      <div className="flex flex-col md:flex-row md:gap-6">
                        <div className="flex gap-6">
                          <InputField
                            label="City"
                            name="billTo.city"
                            value={values.billTo.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.billTo?.city && errors.billTo?.city}
                          />
                          <InputField
                            label="Post Code"
                            name="billTo.postCode"
                            value={values.billTo.postCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.billTo?.postCode &&
                              errors.billTo?.postCode
                            }
                          />
                        </div>
                        <InputField
                          label="Country"
                          name="billTo.country"
                          value={values.billTo.country}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.billTo?.country && errors.billTo?.country
                          }
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <InputDate
                        name="invoiceDate"
                        value={values.invoiceDate}
                        onChange={(e) =>
                          setFieldValue("invoiceDate", e.target.value)
                        }
                      />

                      <SelectField
                        onChange={(value) =>
                          setFieldValue("paymentTerms", value)
                        }
                      />
                    </div>

                    <InputField
                      label="Project Description"
                      name="projectDescription"
                      value={values.projectDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Graphic Design Service"
                      error={
                        touched.projectDescription && errors.projectDescription
                      }
                    />

                    <h3 className="text-blue-gray-light text-lg font-bold -tracking-[0.38px] mb-4">
                      Item List
                    </h3>

                    <FieldArray
                      name="itemList"
                      render={({ remove, push }) => (
                        <>
                          {/* Tablet & Desktop Styles */}
                          <ul className="hidden md:block max-w-full">
                            {values.itemList.length > 0 &&
                              values.itemList.map((item, index) => (
                                <li
                                  key={item.id}
                                  className="flex gap-4 items-center"
                                >
                                  <div className="w-[35%]">
                                    <InputField
                                      label={index === 0 ? "Item Name" : ""}
                                      name={`itemList[${index}].itemName`}
                                      value={item.itemName}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      error={
                                        getIn(
                                          touched,
                                          `itemList[${index}].itemName`
                                        ) &&
                                        getIn(
                                          errors,
                                          `itemList[${index}].itemName`
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="w-[15%]">
                                    <InputField
                                      label={index === 0 ? "Qty" : ""}
                                      name={`itemList[${index}].qty`}
                                      type="number"
                                      value={item.qty}
                                      onChange={(e) => {
                                        handleChange(e);
                                        const total = calculateTotal(
                                          e.target.value,
                                          getIn(
                                            values,
                                            `itemList.${index}.price`
                                          )
                                        );
                                        setFieldValue(
                                          `itemList.${index}.total`,
                                          total
                                        );
                                      }}
                                      onBlur={handleBlur}
                                      placeholder="0"
                                      error={
                                        getIn(
                                          touched,
                                          `itemList[${index}].qty`
                                        ) &&
                                        getIn(errors, `itemList[${index}].qty`)
                                      }
                                    />
                                  </div>
                                  <div className="w-[15%]">
                                    <InputField
                                      label={index === 0 ? "Price" : ""}
                                      name={`itemList[${index}].price`}
                                      type="number"
                                      value={
                                        item.price && item.price.toFixed(2)
                                      }
                                      onChange={(e) => {
                                        handleChange(e);
                                        const total = calculateTotal(
                                          getIn(
                                            values,
                                            `itemList.${index}.qty`
                                          ),
                                          e.target.value
                                        );
                                        setFieldValue(
                                          `itemList.${index}.total`,
                                          total
                                        );
                                      }}
                                      onBlur={handleBlur}
                                      placeholder="0.00"
                                      error={
                                        getIn(
                                          touched,
                                          `itemList[${index}].price`
                                        ) &&
                                        getIn(
                                          errors,
                                          `itemList[${index}].price`
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="w-[15%]">
                                    <InputField
                                      label={index === 0 ? "Total" : ""}
                                      name={`itemList.${index}.total`}
                                      value={item.total.toFixed(2)}
                                      readOnly
                                    />
                                  </div>

                                  <div
                                    className={`${
                                      index === 0 ? "mt-[15px]" : ""
                                    }`}
                                  >
                                    <Button
                                      variant="icon"
                                      onClick={() => remove(index)}
                                      icon={<TrashIcon />}
                                      isOnlyIcon
                                    />
                                  </div>
                                </li>
                              ))}
                          </ul>

                          {/* Mobile Styles */}
                          <ul className="block md:hidden max-w-full">
                            {values.itemList.length > 0 &&
                              values.itemList.map((item, index) => (
                                <li
                                  key={item.id}
                                  className="flex flex-col gap-6"
                                >
                                  <InputField
                                    label={"Item Name"}
                                    name={`itemList[${index}].itemName`}
                                    value={item.itemName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                      getIn(
                                        touched,
                                        `itemList[${index}].itemName`
                                      ) &&
                                      getIn(
                                        errors,
                                        `itemList[${index}].itemName`
                                      )
                                    }
                                  />
                                  <div className="flex gap-4 -mt-[25px]">
                                    <div className="w-[25%]">
                                      <InputField
                                        label={"Qty"}
                                        name={`itemList[${index}].qty`}
                                        type="number"
                                        value={item.qty}
                                        onChange={(e) => {
                                          handleChange(e);
                                          const total = calculateTotal(
                                            e.target.value,
                                            getIn(
                                              values,
                                              `itemList.${index}.price`
                                            )
                                          );
                                          setFieldValue(
                                            `itemList.${index}.total`,
                                            total
                                          );
                                        }}
                                        onBlur={handleBlur}
                                        placeholder="0"
                                        error={
                                          getIn(
                                            touched,
                                            `itemList[${index}].qty`
                                          ) &&
                                          getIn(
                                            errors,
                                            `itemList[${index}].qty`
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="w-[35%]">
                                      <InputField
                                        label={"Price"}
                                        name={`itemList[${index}].price`}
                                        type="number"
                                        value={
                                          item.price && item.price.toFixed(2)
                                        }
                                        onChange={(e) => {
                                          handleChange(e);
                                          const total = calculateTotal(
                                            getIn(
                                              values,
                                              `itemList.${index}.qty`
                                            ),
                                            e.target.value
                                          );
                                          setFieldValue(
                                            `itemList.${index}.total`,
                                            total
                                          );
                                        }}
                                        onBlur={handleBlur}
                                        placeholder="0.00"
                                        error={
                                          getIn(
                                            touched,
                                            `itemList[${index}].price`
                                          ) &&
                                          getIn(
                                            errors,
                                            `itemList[${index}].price`
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="w-[35%]">
                                      <InputField
                                        label={"Total"}
                                        name={`itemList.${index}.total`}
                                        value={item.total.toFixed(2)}
                                        readOnly
                                      />
                                    </div>

                                    <div className="mt-[28px]">
                                      <Button
                                        variant="icon"
                                        onClick={() => remove(index)}
                                        icon={<TrashIcon />}
                                        isOnlyIcon
                                      />
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </ul>

                          <Button
                            variant="default"
                            size="full"
                            onClick={() =>
                              push({
                                id: nanoid(),
                                itemName: "",
                                qty: null,
                                price: null,
                                total: 0,
                              })
                            }
                          >
                            + Add New Item
                          </Button>
                        </>
                      )}
                    />

                    <div className="text-error text-red-medium mt-6">
                      {Object.keys(errors).length > 0 && (
                        <p>- All fields are required</p>
                      )}

                      {values.itemList.length === 0 &&
                        Object.keys(touched).some((key) =>
                          key.startsWith("itemList")
                        ) && <p>- An item must be added</p>}
                    </div>
                    <div className="fixed bottom-0 left-0 z-50 lg:ml-[103px] py-5 md:py-8 px-6 md:px-14 w-full md:w-[616px] flex justify-between shadow-[0_0_200px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_200px_0_rgba(0,0,0,0.3)] bg-white text-dark-darkest dark:bg-dark dark:text-white md:rounded-r-[1.25rem]">
                      <Button
                        variant="default"
                        onClick={() => handleDiscard(resetForm)}
                      >
                        Discard
                      </Button>

                      <div className="flex gap-2">
                        <Button
                          variant="dark"
                          onClick={() =>
                            handleSaveAsDraft(values, {
                              resetForm,
                              setSubmitting,
                            })
                          }
                        >
                          Save as Draft
                        </Button>

                        <Button variant="primary" type="submit">
                          Save & Send
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
