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
          name="billTo.clientName"
          value={values.billTo.clientName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.billTo?.clientName && errors.billTo?.clientName}
        />
        <InputField
          label="Client Email"
          type="email"
          name="billTo.clientEmail"
          value={values.billTo.clientEmail}
          onChange={handleChange}
          placeholder="e.g. email@example.com"
          error={touched.billTo?.clientEmail && errors.billTo?.clientEmail}
        />
        <InputField
          label="Street Address"
          name="billTo.streetAddress"
          value={values.billTo.streetAddress}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.billTo?.streetAddress && errors.billTo?.streetAddress}
        />
        <div className="flex flex-col md:flex-row md:gap-6">
          <div className="flex gap-6">
            <InputField
              label="City"
              name="billTo.city"
              value={values.billTo.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.billTo?.city && errors.billTo?.city}
            />
            <InputField
              label="Post Code"
              name="billTo.postCode"
              value={values.billTo.postCode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.billTo?.postCode && errors.billTo?.postCode}
            />
          </div>
          <InputField
            label="Country"
            name="billTo.country"
            value={values.billTo.country}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.billTo?.country && errors.billTo?.country}
            className="mt-6 md:mt-0"
          />
        </div>
      </div>
    </>
  );
}
