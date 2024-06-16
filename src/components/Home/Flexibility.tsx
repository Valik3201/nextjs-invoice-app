import Image from "next/image";

export default function Flexibility() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg p-8 shadow-item dark:bg-dark-light">
      <div className="md:ps-4 space-y-4">
        <h2 className="text-heading-m">Flexibility at Your Fingertips</h2>
        <ul className="text-body-variant text-gray-medium dark:text-gray-light list-disc space-y-2 ms-4">
          <li>Save drafts for later refinement</li>
          <li>Quickly mark pending invoices as paid</li>
        </ul>
      </div>
      <div className="pt-6 md:pt-0 pe-10 md:pe-20">
        <Image
          src="/buttons/mark-as-paid.png"
          alt="Mark as paid button"
          width={150}
          height={50}
          className="rotate-6"
        />
        <Image
          src="/buttons/save-as-draft.png"
          alt="Save as draft button"
          width={150}
          height={50}
          className="dark:hidden -rotate-3 translate-x-10"
        />
        <Image
          src="/buttons/save-as-draft-dark.png"
          alt="Save as draft button"
          width={150}
          height={50}
          className="hidden dark:block -rotate-3 translate-x-10"
        />
      </div>
    </div>
  );
}
