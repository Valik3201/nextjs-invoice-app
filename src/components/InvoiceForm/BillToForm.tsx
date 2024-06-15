import { FormikTouched, FormikErrors } from "formik";
import { Invoice } from "../../lib/types";
import InputField from "../FormElements/InputField";

export default function BillToForm({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}: {
  values: Invoice;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  touched: FormikTouched<Invoice>;
  errors: FormikErrors<Invoice>;
}) {
  return (
    <>
      <h3 className="text-primary text-heading-s-variant my-6">Bill To</h3>
      <div className="flex flex-col gap-6">
        <InputField
          label="Client Name"
          name="clientName"
          value={values.clientName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.clientName && errors?.clientName}
        />
        <InputField
          label="Client Email"
          type="email"
          name="clientEmail"
          value={values.clientEmail}
          onChange={handleChange}
          placeholder="e.g. email@example.com"
          error={touched?.clientEmail && errors?.clientEmail}
        />
        <InputField
          label="Street Address"
          name="clientAddress.street"
          value={values.clientAddress.street}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.clientAddress?.street && errors.clientAddress?.street}
        />
        <div className="flex flex-col md:flex-row md:gap-6">
          <div className="flex gap-6">
            <InputField
              label="City"
              name="clientAddress.city"
              value={values.clientAddress.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.clientAddress?.city && errors.clientAddress?.city}
            />
            <InputField
              label="Post Code"
              name="clientAddress.postCode"
              value={values.clientAddress.postCode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.clientAddress?.postCode &&
                errors.clientAddress?.postCode
              }
            />
          </div>
          <InputField
            label="Country"
            name="clientAddress.country"
            value={values.clientAddress.country}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.clientAddress?.country && errors.clientAddress?.country
            }
            className="mt-6 md:mt-0"
          />
        </div>
      </div>
    </>
  );
}
