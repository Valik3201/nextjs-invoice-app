import { useState } from "react";
import { Formik, Form } from "formik";
import { emailSchema } from "@/src/validation/profileValidationSchema";
import { useAppDispatch } from "@/src/lib/hooks";
import { sendlVerificationEmail } from "@/src/lib/features/auth/authOperations";
import { useProfileForm } from "@/src/hooks/useProfileForm";
import InputField from "@/src/components/InvoiceForm/InputField";
import Button from "@/src/components/Button/Button";

export default function EmailForm() {
  const dispatch = useAppDispatch();
  const { user, error, handleUpdateEmail, useEditState } = useProfileForm();
  const { edit, handleToggleEdit } = useEditState();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);

  const handleSendVerificationEmail = async () => {
    try {
      await dispatch(sendlVerificationEmail());
      setVerificationEmailSent(true);
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between bg-white rounded-lg mt-9 md:mt-6 p-6 md:p-8 lg:p-[52px] shadow-item dark:bg-dark-light dark:border-dark-light">
      <h2 className="text-primary text-heading-s-variant mb-6">
        Email Settings
      </h2>

      <div className="w-full">
        {user && (
          <Formik
            initialValues={{ email: user.email || "" }}
            onSubmit={(values) =>
              handleUpdateEmail(
                values,
                "Email successfully updated!",
                setStatusMessage,
                handleToggleEdit
              )
            }
            validationSchema={emailSchema}
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
                <div>
                  <InputField
                    label="Email"
                    name="email"
                    value={values.email || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email}
                    readOnly={!edit}
                    profile
                  />

                  {user.emailVerified ? (
                    <p className="w-fit text-body-variant font-bold text-[#33D69F] p-2 bg-[#33D69F]/10 rounded">
                      Verified
                    </p>
                  ) : (
                    <div className="text-body-variant">
                      <span className="text-[#FF8F00] font-bold p-2 mr-2 bg-[#FF8F00]/10 rounded">
                        Unverified
                      </span>
                      <button
                        type="button"
                        onClick={handleSendVerificationEmail}
                        className="hover:underline text-gray-medium dark:text-gray-light"
                      >
                        Send verification email
                      </button>
                    </div>
                  )}
                </div>

                {verificationEmailSent && (
                  <p className="text-primary mt-4 text-heading-s-variant font-medium">
                    Verification email was sent!
                  </p>
                )}

                {error && edit && (
                  <p className="text-red-medium my-4 text-heading-s-variant font-medium">
                    {error.message}
                  </p>
                )}

                {user.email !== values.email && statusMessage && !edit && (
                  <p className="text-[#33D69F] my-4 text-heading-s-variant font-medium">
                    {statusMessage}
                  </p>
                )}

                <div className="flex justify-end gap-2 mt-4 md:mt-0">
                  {edit ? (
                    <>
                      <Button
                        variant="default"
                        onClick={() => {
                          handleToggleEdit();
                          resetForm();
                        }}
                      >
                        Discard
                      </Button>
                      <Button variant="primary" type="submit">
                        Save Email
                      </Button>
                    </>
                  ) : (
                    <Button variant="primary" onClick={handleToggleEdit}>
                      Change Email
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}
