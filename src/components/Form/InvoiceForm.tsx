import { Formik, Form } from "formik";
import { Invoice } from "../../lib/types";
import { invoiceValidationSchema } from "../../validation/invoiceValidationSchema";
import { useInvoiceForm } from "../../hooks/useInvoiceForm";
import ItemListFieldArray from "./ItemListFieldArray";
import BillFromForm from "./BillFromForm";
import BillToForm from "./BillToForm";
import InvoiceDetailsForm from "./InvoiceDetailsForm";
import ErrorMessages from "./ErrorMessages";
import FormActions from "./FormActions";
import GoBackButton from "../Button/GoBackButton";

export default function InvoiceForm({
  initialValues,
  closeForm,
  action,
}: {
  initialValues: Invoice;
  closeForm: () => void;
  action: "new" | "edit";
}) {
  const { handleSubmit, handleSaveAsDraft, handleDiscard } =
    useInvoiceForm(closeForm);

  return (
    <div className="relative md:w-[616px] max-h-full pl-6 md:pl-14 pr-2 md:pr-10 py-6 md:pb-28 md:py-16">
      <Formik
        initialValues={initialValues}
        validationSchema={invoiceValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          resetForm,
          setFieldValue,
          setSubmitting,
        }) => (
          <Form>
            <GoBackButton handleDiscard={() => handleDiscard(resetForm)} />

            <h2 className="text-heading-m mb-6 md:mb-12">New Invoice</h2>

            <div className="h-[calc(100svh_-_245px)] overflow-y-scroll overflow-x-hidden pb-12 md:pb-32 lg:pb-8 pl-0.5 pr-4">
              <BillFromForm
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
              />

              <BillToForm
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
              />

              <InvoiceDetailsForm
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
                setFieldValue={setFieldValue}
                action={action}
              />

              <ItemListFieldArray values={values} />

              <ErrorMessages
                errors={errors}
                touched={touched}
                values={values}
              />

              <FormActions
                action={action}
                handleDiscard={() => handleDiscard(resetForm)}
                handleSaveAsDraft={() =>
                  handleSaveAsDraft(values, { resetForm, setSubmitting })
                }
                handleSubmit={() => setSubmitting(true)}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
