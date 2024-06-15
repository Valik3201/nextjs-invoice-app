import { FormikTouched, FormikErrors } from "formik";
import { Invoice } from "../../lib/types";
import InputField from "../FormElements/InputField";

export default function BillFromForm({
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
      <h3 className="text-primary text-heading-s-variant mb-6">Bill From</h3>
      <div className="flex flex-col gap-6">
        <InputField
          label="Street Address"
          name="senderAddress.street"
          value={values.senderAddress.street}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.senderAddress?.street && errors.senderAddress?.street}
        />
        <div className="flex flex-col md:flex-row md:gap-6">
          <div className="flex gap-6">
            <InputField
              label="City"
              name="senderAddress.city"
              value={values.senderAddress.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.senderAddress?.city && errors.senderAddress?.city}
            />
            <InputField
              label="Post Code"
              name="senderAddress.postCode"
              value={values.senderAddress.postCode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.senderAddress?.postCode &&
                errors.senderAddress?.postCode
              }
            />
          </div>
          <InputField
            label="Country"
            name="senderAddress.country"
            value={values.senderAddress.country}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.senderAddress?.country && errors.senderAddress?.country
            }
            className="mt-6 md:mt-0"
          />
        </div>
      </div>
    </>
  );
}
