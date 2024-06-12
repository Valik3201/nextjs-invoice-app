import { Formik, Form } from "formik";
import { emailSchema } from "@/src/validation/profileValidationSchema";
import { useToggleState } from "@/src/hooks/useToggleState";
import { useAccountActions } from "@/src/hooks/useAccountActions";
import InputField from "@/src/components/FormElements/InputField";
import FormButtons from "./FormButtons";
import Toast from "../Toast/Toast";

export default function EmailForm() {
  const { state: isEdit, toggleState } = useToggleState();
  const {
    user,
    handleUpdateEmail,
    handleSendVerificationEmail,
    toastMessage,
    toastType,
  } = useAccountActions();

  return (
    <div className="flex flex-col items-start justify-between bg-white rounded-lg mt-9 md:mt-6 p-6 md:p-8 lg:p-[52px] shadow-item dark:bg-dark-light dark:border-dark-light">
      <h2 className="text-primary text-heading-s-variant mb-6">
        Email Settings
      </h2>

      <div className="w-full">
        {user && (
          <Formik
            initialValues={{ email: user.email || "" }}
            onSubmit={(values) => handleUpdateEmail(values, toggleState)}
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
                    readOnly={!isEdit}
                    profile
                    className="mb-4"
                  />

                  {user.emailVerified ? (
                    <p className="w-fit text-body-variant font-bold text-green p-2 bg-green/10 rounded">
                      Verified
                    </p>
                  ) : (
                    <div className="text-body-variant">
                      <span className="text-orange font-bold p-2 mr-2 bg-orange/10 rounded">
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

                {toastMessage && <Toast type={toastType}>{toastMessage}</Toast>}

                <FormButtons
                  edit={isEdit}
                  handleToggleEdit={toggleState}
                  resetForm={resetForm}
                  context="Email"
                />
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}
