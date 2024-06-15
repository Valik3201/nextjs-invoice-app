import * as Yup from "yup";

const addressSchema = Yup.object().shape({
  street: Yup.string().required("can’t be empty"),
  city: Yup.string().required("Ccan’t be empty"),
  postCode: Yup.string().required("can’t be empty"),
  country: Yup.string().required("can’t be empty"),
});

export const invoiceValidationSchema = Yup.object().shape({
  createdAt: Yup.string().required("can’t be empty"),
  description: Yup.string().required("can’t be empty"),
  clientName: Yup.string().required("can’t be empty"),
  clientEmail: Yup.string()
    .email("Invalid email format")
    .required("can’t be empty"),
  senderAddress: addressSchema,
  clientAddress: addressSchema,
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
