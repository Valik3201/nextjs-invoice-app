import Link from "next/link";
import Button from "../components/Button/Button";

export default function NotFound() {
  return (
    <div>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-primary text-7xl tracking-tight font-bold lg:text-9xl text-primary-600 dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl">
            Something&apos;s missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-medium dark:text-gray-light">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to
            explore on the home page.
          </p>

          <Link
            href="/"
            className="inline-flex focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
          >
            <Button variant="primary">Back to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
