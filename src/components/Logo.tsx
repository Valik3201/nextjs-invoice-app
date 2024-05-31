import Image from "next/image";

export default function Logo() {
  return (
    <div className="relative w-[72px] md:w-20 lg:w-full">
      <div className="relative top-0 left-0 z-10">
        <Image src="/logo.svg" alt="Logo" width={103} height={103} priority />
      </div>
    </div>
  );
}
