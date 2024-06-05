"use client";

import { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { passwordSchema } from "@/src/validation/profileValidationSchema";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { updateUserPassword } from "@/src/lib/features/auth/authOperations";
import InputField from "@/src/components/InvoiceForm/InputField";
import Button from "@/src/components/Button/Button";

export default function SecurityForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const error = useAppSelector((state) => state.auth.errors.authError);
  const [edit, setEdit] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handleToggleEdit = () => {
    setEdit((prevEdit) => !prevEdit);
    if (!edit) {
      setPasswordUpdated(false);
    }
  };

  const handleUpdatePassword = async (
    values: any,
    {
      resetForm,
    }: FormikHelpers<{
      newPassword: string;
    }>
  ) => {
    try {
      await dispatch(
        updateUserPassword({ newPassword: values.newPassword })
      ).unwrap();
      resetForm();
      handleToggleEdit();
      setPasswordUpdated(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      setPasswordUpdated(false);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between bg-white rounded-lg mt-9 md:mt-6 p-6 md:p-8 lg:p-[52px] shadow-item dark:bg-dark-light dark:border-dark-light">
      <h2 className="text-primary text-heading-s-variant mb-6">Security</h2>

      <h3 className="mb-2 text-body-variant text-blue-gray dark:text-gray-light">
        Sign-in Provider
      </h3>
      {user && (
        <p className="capitalize text-heading-s-variant text-dark-darkest dark:text-white mb-8">
          {user.providerId}
        </p>
      )}

      <div className="w-full">
        {user && (
          <Formik
            initialValues={{ newPassword: "" }}
            onSubmit={handleUpdatePassword}
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
                  <InputField
                    label="Password"
                    name="newPassword"
                    type="password"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.newPassword && errors.newPassword}
                    readOnly={!edit}
                    profile
                  />
                )}

                {error && edit && (
                  <p className="text-red-medium my-4 text-heading-s-variant font-medium">
                    {error.message}
                  </p>
                )}

                {passwordUpdated && !edit && (
                  <p className="text-[#33D69F] my-4 text-heading-s-variant font-medium">
                    Password successfully updated!
                  </p>
                )}

                <div className="flex justify-end gap-2">
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
                        Change Password
                      </Button>
                    </>
                  ) : (
                    <Button variant="primary" onClick={handleToggleEdit}>
                      Change Password
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
