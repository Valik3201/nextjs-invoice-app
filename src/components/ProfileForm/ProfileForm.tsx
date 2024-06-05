"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { displayNameSchema } from "@/src/validation/profileValidationSchema";
import { updateUserProfile } from "@/src/lib/features/auth/authOperations";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import InputField from "@/src/components/InvoiceForm/InputField";
import Button from "@/src/components/Button/Button";

export default function ProfileForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const error = useAppSelector((state) => state.auth.errors.authError);
  const [edit, setEdit] = useState(false);
  const [nameUpdated, setNameUpdated] = useState(false);

  const handleToggleEdit = () => {
    setEdit((prevEdit) => !prevEdit);
    if (!edit) {
      setNameUpdated(false);
    }
  };

  const handleSaveProfile = async (values: any) => {
    try {
      if (user && user.displayName !== values.displayName) {
        setNameUpdated(true);
      }

      await dispatch(
        updateUserProfile({ displayName: values.displayName })
      ).unwrap();

      handleToggleEdit();
    } catch (error) {
      console.error("Error updating profile:", error);
      setNameUpdated(false);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between bg-white rounded-lg mt-9 md:mt-6 p-6 md:p-8 lg:p-[52px] shadow-item dark:bg-dark-light dark:border-dark-light">
      <h2 className="text-primary text-heading-s-variant mb-6">
        Profile Information
      </h2>

      <div className="w-full">
        {user && (
          <Formik
            initialValues={{
              displayName: user.displayName,
            }}
            onSubmit={handleSaveProfile}
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

                {nameUpdated && !edit && (
                  <p className="text-[#33D69F] my-4 text-heading-s-variant font-medium">
                    Name successfully updated!
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
                        Save Profile
                      </Button>
                    </>
                  ) : (
                    <Button variant="primary" onClick={handleToggleEdit}>
                      Change Name
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
