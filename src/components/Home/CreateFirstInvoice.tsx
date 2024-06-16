import { useAppSelector } from "@/src/lib/hooks";
import Link from "next/link";
import Button from "../Button/Button";

export default function CreateFirstInvoice() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-heading-m md:text-heading-l mt-2 md:mt-8">
        Create your first invoice
      </h2>
      <Link href={user ? "/invoices" : "/signup"}>
        <Button variant="primary">Get Started</Button>
      </Link>
    </div>
  );
}
