import { Formik, Form } from "formik";
import { signInValidationSchema } from "@/src/validation/authValidationSchema";
import { useAuth } from "@/src/hooks/useAuth";
import ForgotPasswordLink from "@/src/components/Auth/ForgotPasswordLink";
import InputField from "@/src/components/FormElements/InputField";
import Button from "@/src/components/Button/Button";

export default function SignInForm() {
  const { handleLogin } = useAuth();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={signInValidationSchema}
      validateOnChange={false}
      onSubmit={handleLogin}
    >
      {(formik) => (
        <Form>
          <div className="flex flex-col gap-6">
            <InputField
              label="Email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email}
              placeholder="name@company.com"
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
              placeholder="•••••••••••••"
            />
          </div>

          <ForgotPasswordLink />

          <Button variant="primary" type="submit" size="full">
            Sign In
          </Button>
        </Form>
      )}
    </Formik>
  );
}
