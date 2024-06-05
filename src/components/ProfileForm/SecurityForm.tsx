import { useState } from "react";
import { Formik, Form } from "formik";
import { useProfileForm } from "@/src/hooks/useProfileForm";
import { passwordSchema } from "@/src/validation/profileValidationSchema";
import InputField from "@/src/components/InvoiceForm/InputField";
import FormButtons from "./FormButtons";

export default function SecurityForm() {
  const { user, error, handleUpdatePassword, useEditState } = useProfileForm();
  const { edit, handleToggleEdit } = useEditState();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-start justify-between bg-white rounded-lg mt-9 md:mt-6 p-6 md:p-8 lg:p-[52px] shadow-item dark:bg-dark-light dark:border-dark-light">
      <h2 className="text-primary text-heading-s-variant mb-6">
        Security Settings
      </h2>

      <h3 className="mb-2 text-body-variant text-blue-gray dark:text-gray-light">
        Sign-in Provider
      </h3>
      {user && (
        <p className="capitalize text-heading-s-variant text-dark-darkest dark:text-white mb-8">
          {user.providerId}
        </p>
      )}

      <div className="w-full">
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          onSubmit={(values) =>
            handleUpdatePassword(
              values,
              "Password successfully updated!",
              setStatusMessage,
              handleToggleEdit
            )
          }
          validationSchema={passwordSchema}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            resetForm,
          }) => (
            <Form>
              {edit && (
                <>
                  <InputField
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.newPassword && errors.newPassword}
                    readOnly={!edit}
                    profile
                  />

                  <InputField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.confirmPassword && errors.confirmPassword}
                    readOnly={!edit}
                    profile
                  />
                </>
              )}

              {error && edit && (
                <p className="text-red-medium my-4 text-heading-s-variant font-medium">
                  {error.message}
                </p>
              )}

              {statusMessage && !edit && (
                <p className="text-[#33D69F] my-4 text-heading-s-variant font-medium">
                  {statusMessage}
                </p>
              )}

              <FormButtons
                edit={edit}
                handleToggleEdit={handleToggleEdit}
                resetForm={resetForm}
                context="Password"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
