import Link from "next/link";

export default function AuthNavigation({ isSignup }: { isSignup?: boolean }) {
  return (
    <p className="text-body-variant text-gray-medium dark:text-gray-light mt-6">
      {isSignup ? "Don’t have an account yet?" : "Already have an account?"}{" "}
      <Link
        href={isSignup ? "/signup" : "/signin"}
        className="text-primary hover:underline"
      >
        {isSignup ? "Sign up here" : "Sign in here"}
      </Link>
    </p>
  );
}
