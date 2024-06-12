import { Formik, Form } from "formik";
import { displayNameSchema } from "@/src/validation/profileValidationSchema";
import { useToggleState } from "@/src/hooks/useToggleState";
import { useAccountActions } from "@/src/hooks/useAccountActions";
import InputField from "@/src/components/FormElements/InputField";
import FormButtons from "./FormButtons";
import Toast from "../Toast/Toast";

export default function DisplayNameForm() {
  const { state: isEdit, toggleState } = useToggleState();
  const { user, handleSaveName, toastMessage, toastType } = useAccountActions();

  return (
    <div className="flex flex-col items-start justify-between bg-white rounded-lg mt-9 md:mt-6 p-6 md:p-8 lg:p-[52px] shadow-item dark:bg-dark-light dark:border-dark-light">
      <h2 className="text-primary text-heading-s-variant mb-6">
        Profile Information
      </h2>

      <div className="w-full">
        {user && (
          <Formik
            initialValues={{ displayName: user.displayName }}
            onSubmit={(values) => handleSaveName(values, toggleState)}
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
                  readOnly={!isEdit}
                  profile
                  className="mb-4"
                />

                {toastMessage && <Toast type={toastType}>{toastMessage}</Toast>}

                <FormButtons
                  edit={isEdit}
                  handleToggleEdit={toggleState}
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
