import * as Yup from "yup";

export const displayNameSchema = Yup.object({
  displayName: Yup.string()
    .min(3, "must be at least 3 characters")
    .max(50, "must be less than 50 characters")
    .required("can't be empty"),
});

export const emailSchema = Yup.object({
  email: Yup.string().email("invalid email format").required("can't be empty"),
});

export const passwordSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "must be at least 8 characters")
    .matches(/[a-z]/, "must have a lowercase letter")
    .matches(/[A-Z]/, "must have an uppercase letter")
    .matches(/[0-9]/, "must have a number")
    .matches(/[@$!%*?&#]/, "must have a special character")
    .required("can't be empty"),
  confirmPassword: Yup.string()
    .test("passwords-match", "passwords must match", function (value) {
      return this.parent.newPassword === value;
    })
    .required("can't be empty"),
});
