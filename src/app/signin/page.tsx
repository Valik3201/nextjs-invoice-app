"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form } from "formik";
import { signInValidationSchema } from "@/src/validation/authValidationSchema";
import { useAppDispatch, useAppSelector, useAppStore } from "@/src/lib/hooks";
import { resetErrors } from "@/src/lib/features/auth/authSlice";
import { signIn } from "@/src/lib/features/auth/authOperations";
import AuthError from "@/src/components/AuthError";
import InputField from "@/src/components/InputField";
import Button from "@/src/components/Button";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.errors.loginError);
  const store = useAppStore();
  const initialize = useRef(false);

  useEffect(() => {
    if (!initialize.current) {
      store.dispatch(resetErrors());
      initialize.current = true;
    }
  }, [store]);

  return (
    <div className="flex justify-center w-full">
      <div className="w-full md:w-80">
        <h1 className="text-heading-m md:text-heading-l mb-8">Sign In</h1>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={signInValidationSchema}
          validateOnChange={false}
          onSubmit={async (values) => {
            const { email, password } = values;

            try {
              await dispatch(signIn({ email, password })).unwrap();
              router.push("/invoices");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {(formik) => (
            <Form>
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

              {Object.keys(formik.errors).length > 0 && (
                <div className="text-error text-red-medium mb-[25px]">
                  - All fields are required
                </div>
              )}

              <Button variant="primary" type="submit" size="full">
                Sign In
              </Button>
            </Form>
          )}
        </Formik>

        <p className="text-body-variant text-gray-medium dark:text-gray-light mt-6">
          Don’t have an account yet?{" "}
          <Link href={"/signup"} className="text-primary hover:underline">
            Sign up here
          </Link>
        </p>

        {error && <AuthError errorCode={error.code} />}
      </div>
    </div>
  );
}
