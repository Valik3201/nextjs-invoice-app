import Link from "next/link";

export default function AuthLinks() {
  return (
    <>
      <li className="hover:text-primary transition duration-200 ease-in-out">
        <Link href="/signup">Sign Up</Link>
      </li>
      <li className="hover:text-primary transition duration-200 ease-in-out">
        <Link href="/signin">Sign In</Link>
      </li>
    </>
  );
}
