import { FormikTouched, FormikErrors } from "formik";
import { Invoice } from "../../lib/types";

export default function ErrorMessages({
  errors,
  touched,
  values,
}: {
  errors: FormikErrors<Invoice>;
  touched: FormikTouched<Invoice>;
  values: Invoice;
}) {
  return (
    <div className="text-error text-red-medium mt-6">
      {Object.keys(errors).length > 0 && <p>- All fields are required</p>}

      {values.itemList.length === 0 &&
        Object.keys(touched).some((key) => key.startsWith("itemList")) && (
          <p>- An item must be added</p>
        )}
    </div>
  );
}
