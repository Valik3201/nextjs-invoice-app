import Link from "next/link";

export default function ForgotPasswordLink() {
  return (
    <Link
      href={"/forgot-password"}
      className="w-full flex justify-end mt-2 mb-6"
    >
      <button
        type="button"
        className="text-body-variant text-right text-primary hover:underline"
      >
        Forgot password?
      </button>
    </Link>
  );
}
