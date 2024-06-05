"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { emailSchema } from "@/src/validation/profileValidationSchema";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import {
  updateUserEmail,
  sendlVerificationEmail,
} from "@/src/lib/features/auth/authOperations";
import InputField from "@/src/components/InvoiceForm/InputField";
import Button from "@/src/components/Button/Button";

export default function EmailForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const error = useAppSelector((state) => state.auth.errors.authError);
  const [edit, setEdit] = useState(false);
  const [emailUpdated, setEmailUpdated] = useState(false);
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);

  const handleToggleEdit = () => {
    setEdit((prevEdit) => !prevEdit);
    if (!edit) {
      setEmailUpdated(false);
    }
  };

  const handleUpdateEmail = async (values: any) => {
    try {
      await dispatch(updateUserEmail({ email: values.email })).unwrap();
      handleToggleEdit();
      setEmailUpdated(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      setEmailUpdated(false);
    }
  };

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
            initialValues={{
              email: user?.email || "",
            }}
            onSubmit={handleUpdateEmail}
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
                    <div className="text-body-variant -mt-[15px]">
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

                {user.email !== values.email && emailUpdated && !edit && (
                  <p className="text-[#33D69F] my-4 text-heading-s-variant font-medium">
                    Email successfully updated!
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
