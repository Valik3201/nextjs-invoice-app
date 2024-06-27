import { useAppSelector } from "@/src/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button/Button";

export default function Hero() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex justify-between items-center">
      <div className="w-[40%] flex flex-col gap-4">
        <h1 className="text-heading-m md:text-heading-l">
          Work smarter with the invoice app
        </h1>
        <p className="text-body-variant text-gray-medium dark:text-gray-light">
          Streamline your invoicing process with ease
        </p>
        <Link href={user ? "/invoices" : "/signup"}>
          <Button variant="primary">Get Started</Button>
        </Link>
      </div>
      <Image
        src="/mockups/mockup-1.png"
        alt="Mockup with iPhone"
        width={400}
        height={500}
        className="w-[60%]"
        priority
      />
    </div>
  );
}
