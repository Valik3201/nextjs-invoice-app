"use client";

import { Formik, Form } from "formik";
import { emailSchema } from "@/src/validation/profileValidationSchema";
import { useAccountActions } from "@/src/hooks/useAccountActions";
import InputField from "@/src/components/FormElements/InputField";
import Button from "@/src/components/Button/Button";
import GoBackButton from "@/src/components/Button/GoBackButton";
import Toast from "@/src/components/Toast/Toast";

export default function Page() {
  const { handleResetPassword, toastMessage, toastType } = useAccountActions();

  return (
    <div className="flex justify-center w-full">
      <div className="w-full md:w-80">
        <GoBackButton href="/signin" />

        <h1 className="text-heading-m md:text-heading-l mb-8">
          Forgot password?
        </h1>

        <p className="text-body-variant text-gray-medium dark:text-gray-light mb-8">
          Please enter your email in the field below, and a link to reset your
          password will be sent.
        </p>

        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={emailSchema}
          onSubmit={(values, { resetForm }) =>
            handleResetPassword(values, resetForm)
          }
        >
          {(formik) => (
            <Form>
              <InputField
                label="Email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && formik.errors.email}
                placeholder="name@company.com"
                className="mb-6"
              />

              <Button variant="primary" type="submit" size="full">
                Send Link
              </Button>
            </Form>
          )}
        </Formik>

        {toastMessage && <Toast type={toastType}>{toastMessage}</Toast>}
      </div>
    </div>
  );
}
