"use client";

import { useAppSelector } from "@/src/lib/hooks";
import Link from "next/link";
import Button from "../components/Button/Button";

export default function Home() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8 md:mb-[55px] lg:mb-[68px]">
        <div>
          <h1 className="text-heading-m md:text-heading-l mb-[6px]">
            Welcome to Invoices
          </h1>
          <p className="text-body-variant text-gray-medium dark:text-gray-light">
            Your Smart Solution for Invoice Management
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-white shadow-filter-light dark:bg-dark-medium dark:shadow-filter-dark">
          <h2 className="text-heading-s md:text-heading-m mb-4">
            Streamlined Invoice Management
          </h2>
          <p className="text-blue-gray dark:text-gray-light text-body-variant mb-4">
            Effortlessly manage your invoices with our intuitive platform.
            Create, edit, and delete invoices with ease.
          </p>

          <Link href={user ? "/invoices" : "/signup"}>
            <Button variant="primary">Get Started</Button>
          </Link>
        </div>
        <div className="p-6 rounded-lg bg-white shadow-filter-light dark:bg-dark-medium dark:shadow-filter-dark">
          <h2 className="text-heading-s md:text-heading-m mb-4">
            Error-Free Form Submissions
          </h2>
          <p className="text-blue-gray dark:text-gray-light text-body-variant mb-4">
            Say goodbye to submission errors. Our platform ensures your form
            submissions are accurate and validated.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-lg bg-white shadow-filter-light dark:bg-dark-medium dark:shadow-filter-dark mt-6">
        <h2 className="text-heading-s md:text-heading-m mb-4">
          Efficient Workflow
        </h2>
        <p className="text-blue-gray dark:text-gray-light text-body-variant mb-4">
          Increase productivity by saving draft invoices and marking pending
          invoices as paid. InvoiSmart streamlines your workflow for seamless
          business operations.
        </p>
      </div>
    </div>
  );
}
