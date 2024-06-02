import { FormikTouched, FormikErrors } from "formik";
import { Invoice } from "../lib/types";
import InputField from "./InputField";
import InputDate from "./InputDate";
import SelectField from "./SelectField";

export default function InvoiceDetailsForm({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setFieldValue,
}: {
  values: Invoice;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  touched: FormikTouched<Invoice>;
  errors: FormikErrors<Invoice>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <InputDate
          name="invoiceDate"
          value={values.invoiceDate}
          onChange={(e) => setFieldValue("invoiceDate", e.target.value)}
        />

        <SelectField
          onChange={(value) => setFieldValue("paymentTerms", value)}
        />
      </div>

      <InputField
        label="Project Description"
        name="projectDescription"
        value={values.projectDescription}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="e.g. Graphic Design Service"
        error={touched.projectDescription && errors.projectDescription}
      />
    </>
  );
}
