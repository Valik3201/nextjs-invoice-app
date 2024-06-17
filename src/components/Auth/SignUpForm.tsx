import { Formik, Form } from "formik";
import { signUpValidationSchema } from "@/src/validation/authValidationSchema";
import { useAuth } from "@/src/hooks/useAuth";
import InputField from "@/src/components/FormElements/InputField";
import Button from "@/src/components/Button/Button";

export default function SignUpForm() {
  const { handleSignUp } = useAuth();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={signUpValidationSchema}
      validateOnChange={false}
      onSubmit={handleSignUp}
    >
      {(formik) => (
        <Form className="flex flex-col gap-6">
          <InputField
            label="Name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name}
            placeholder="John Doe"
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
            placeholder="example@mail.com"
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
            placeholder="Password"
          />

          <Button variant="primary" type="submit" size="full">
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
}
