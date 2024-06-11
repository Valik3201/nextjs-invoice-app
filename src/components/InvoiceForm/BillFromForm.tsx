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
          name="billFrom.streetAddress"
          value={values.billFrom.streetAddress}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.billFrom?.streetAddress && errors.billFrom?.streetAddress
          }
        />
        <div className="flex flex-col md:flex-row md:gap-6">
          <div className="flex gap-6">
            <InputField
              label="City"
              name="billFrom.city"
              value={values.billFrom.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.billFrom?.city && errors.billFrom?.city}
            />
            <InputField
              label="Post Code"
              name="billFrom.postCode"
              value={values.billFrom.postCode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.billFrom?.postCode && errors.billFrom?.postCode}
            />
          </div>
          <InputField
            label="Country"
            name="billFrom.country"
            value={values.billFrom.country}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.billFrom?.country && errors.billFrom?.country}
            className="mt-6 md:mt-0"
          />
        </div>
      </div>
    </>
  );
}
