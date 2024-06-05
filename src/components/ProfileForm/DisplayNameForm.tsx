import { useState } from "react";
import { Formik, Form } from "formik";
import { useProfileForm } from "@/src/hooks/useProfileForm";
import { displayNameSchema } from "@/src/validation/profileValidationSchema";
import InputField from "@/src/components/InvoiceForm/InputField";
import FormButtons from "./FormButtons";

export default function DisplayNameForm() {
  const { user, error, handleSaveName, useEditState } = useProfileForm();
  const { edit, handleToggleEdit } = useEditState();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-start justify-between bg-white rounded-lg mt-9 md:mt-6 p-6 md:p-8 lg:p-[52px] shadow-item dark:bg-dark-light dark:border-dark-light">
      <h2 className="text-primary text-heading-s-variant mb-6">
        Profile Information
      </h2>

      <div className="w-full">
        {user && (
          <Formik
            initialValues={{ displayName: user.displayName }}
            onSubmit={(values) =>
              handleSaveName(
                values,
                "Name successfully updated!",
                setStatusMessage,
                handleToggleEdit
              )
            }
            validationSchema={displayNameSchema}
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
                <InputField
                  label="Name"
                  name="displayName"
                  value={values.displayName || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.displayName && errors.displayName}
                  readOnly={!edit}
                  profile
                />

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
                  context="Name"
                />
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}
