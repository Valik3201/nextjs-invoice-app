import * as Yup from "yup";

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().required("can’t be empty"),
  password: Yup.string().required("can’t be empty"),
});

export const signUpValidationSchema = Yup.object().shape({
  name: Yup.string().required("can’t be empty"),
  email: Yup.string().required("can’t be empty"),
  password: Yup.string().required("can’t be empty"),
});
