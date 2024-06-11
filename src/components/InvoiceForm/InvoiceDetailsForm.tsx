import { FormikTouched, FormikErrors } from "formik";
import { Invoice } from "../../lib/types";
import InputField from "../FormElements/InputField";
import InputDate from "../FormElements/InputDate";
import SelectField from "../FormElements/SelectField";

export default function InvoiceDetailsForm({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setFieldValue,
  action,
}: {
  values: Invoice;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  touched: FormikTouched<Invoice>;
  errors: FormikErrors<Invoice>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  action: "new" | "edit";
}) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <InputDate
          name="invoiceDate"
          value={values.invoiceDate}
          onChange={(e) => setFieldValue("invoiceDate", e.target.value)}
          action={action}
          error={
            touched.invoiceDate && !values.invoiceDate
              ? "cant'be empty"
              : undefined
          }
        />

        <SelectField
          value={values.paymentTerms}
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
