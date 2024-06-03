import * as Yup from "yup";

export const invoiceValidationSchema = Yup.object().shape({
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
  paymentTerms: Yup.number().required("can’t be empty"),
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
