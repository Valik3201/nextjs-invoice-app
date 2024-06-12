import { Formik, Form } from "formik";
import { useToggleState } from "@/src/hooks/useToggleState";
import { useAccountActions } from "@/src/hooks/useAccountActions";
import { passwordSchema } from "@/src/validation/profileValidationSchema";
import InputField from "@/src/components/FormElements/InputField";
import FormButtons from "./FormButtons";
import Toast from "../Toast/Toast";
import GoogleIcon from "@/src/icons/GoogleIcon";
import FacebookIcon from "@/src/icons/FacebookIcon";
import FirebaseIcon from "@/src/icons/FirebaseIcon";
import { stat } from "fs";

export default function SecurityForm() {
  const { state: isEdit, toggleState } = useToggleState();
  const { user, handleUpdatePassword, toastMessage, toastType } =
    useAccountActions();

  const ProviderIcons: { [key: string]: React.FC } = {
    "google.com": GoogleIcon,
    "facebook.com": FacebookIcon,
    password: FirebaseIcon,
  };

  return (
    <div className="flex flex-col items-start justify-between bg-white rounded-lg mt-9 md:mt-6 p-6 md:p-8 lg:p-[52px] shadow-item dark:bg-dark-light dark:border-dark-light">
      <h2 className="text-primary text-heading-s-variant mb-6">
        Security Settings
      </h2>

      <h3 className="mb-2 text-body-variant text-blue-gray dark:text-gray-light">
        Providers
      </h3>

      {user && (
        <ul className="flex items-center gap-2 mb-8">
          {user.providerData.map((provider) => {
            const ProviderIcon = ProviderIcons[provider.providerId];
            return (
              <li key={provider.uid}>
                <div
                  className={`rounded w-8 h-8 flex justify-center items-center ${
                    provider.providerId === "facebook.com"
                      ? "bg-facebook text-white p-1"
                      : "bg-black/5 dark:bg-white p-1.5"
                  }`}
                >
                  <ProviderIcon />
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="w-full">
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          onSubmit={(values) => handleUpdatePassword(values, toggleState)}
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
              {isEdit && (
                <>
                  <InputField
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.newPassword && errors.newPassword}
                    readOnly={!isEdit}
                    profile
                    className="mb-4"
                  />

                  <InputField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.confirmPassword && errors.confirmPassword}
                    readOnly={!isEdit}
                    profile
                    className="mb-4"
                  />
                </>
              )}

              {toastMessage && <Toast type={toastType}>{toastMessage}</Toast>}

              <FormButtons
                edit={isEdit}
                handleToggleEdit={toggleState}
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
