"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form } from "formik";
import { signUpValidationSchema } from "@/src/validation/authValidationSchema";
import { useAppDispatch, useAppSelector, useAppStore } from "@/src/lib/hooks";
import { resetErrors } from "@/src/lib/features/auth/authSlice";
import { signUp } from "@/src/lib/features/auth/authOperations";
import AuthError from "@/src/components/Auth/AuthError";
import InputField from "@/src/components/InvoiceForm/InputField";
import Button from "@/src/components/Button/Button";

export default function SignUp() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.errors.registerError);
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
        <h1 className="text-heading-m md:text-heading-l mb-8">
          Create an account
        </h1>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={signUpValidationSchema}
          validateOnChange={false}
          onSubmit={async (values) => {
            const { name, email, password } = values;

            try {
              await dispatch(
                signUp({ email, password, displayName: name })
              ).unwrap();
              router.push("/invoices");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {(formik) => (
            <Form>
              <InputField
                label="Name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={
                  formik.touched.name && formik.errors.name
                    ? "can’t be empty"
                    : undefined
                }
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

        <p className="text-body-variant text-gray-medium dark:text-gray-light mt-6">
          Already have an account?{" "}
          <Link href={"/signin"} className="text-primary hover:underline">
            Sign in here
          </Link>
        </p>

        {error && <AuthError errorCode={error.code} />}
      </div>
    </div>
  );
}
