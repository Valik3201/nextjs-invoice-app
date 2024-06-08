"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form } from "formik";
import { signInValidationSchema } from "@/src/validation/authValidationSchema";
import { useAppDispatch, useAppSelector, useAppStore } from "@/src/lib/hooks";
import { resetErrors } from "@/src/lib/features/auth/authSlice";
import {
  signIn,
  loginWithProvider,
} from "@/src/lib/features/auth/authOperations";
import AuthError from "@/src/components/Auth/AuthError";
import InputField from "@/src/components/InvoiceForm/InputField";
import Button from "@/src/components/Button/Button";
import GoogleIcon from "@/src/icons/GoogleIcon";
import FacebookIcon from "@/src/icons/FacebookIcon";

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

  const handleSubmit = async (
    values: {
      email: string;
      password: string;
    },
    { setSubmitting }: any
  ) => {
    const { email, password } = values;

    try {
      await dispatch(signIn({ email, password })).unwrap();
      router.push("/invoices");
    } catch (error) {
      console.log(error);
    }

    setSubmitting(false);
  };

  const handleLoginwithProvider = async ({
    provider,
  }: {
    provider: "google" | "facebook";
  }) => {
    try {
      await dispatch(loginWithProvider({ provider })).unwrap();
      router.push("/invoices");
    } catch (error) {
      console.log(`Error login with ${provider}`, error);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full md:w-80">
        <h1 className="text-heading-m md:text-heading-l mb-8">Welcome back</h1>

        <div className="flex flex-col gap-4">
          <Button
            variant="white"
            type="submit"
            size="full"
            icon={<GoogleIcon />}
            onClick={() => handleLoginwithProvider({ provider: "google" })}
          >
            Sign In with Google
          </Button>

          <Button
            variant="facebook"
            type="submit"
            size="full"
            icon={<FacebookIcon />}
            onClick={() => handleLoginwithProvider({ provider: "facebook" })}
          >
            Sign In with Facebook
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-px w-full bg-gray-light dark:bg-dark-medium"></div>
          <h2 className="text-body-variant md:text-heading-s-variant my-6 text-center">
            or
          </h2>
          <div className="h-px w-full bg-gray-light dark:bg-dark-medium"></div>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={signInValidationSchema}
          validateOnChange={false}
          onSubmit={handleSubmit}
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

              <Button variant="primary" type="submit" size="full">
                Sign In
              </Button>
            </Form>
          )}
        </Formik>

        <p className="text-body-variant text-gray-medium dark:text-gray-light my-6">
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
