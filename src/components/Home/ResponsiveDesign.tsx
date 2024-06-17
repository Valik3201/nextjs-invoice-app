import Image from "next/image";

export default function ResponsiveDesign() {
  return (
    <div className="flex flex-col gap-4 items-center bg-white rounded-lg p-8 shadow-item dark:bg-dark-light">
      <div className="space-y-4">
        <h2 className="text-heading-m md:text-center">
          Sleek, Responsive Design
        </h2>
        <p className="text-body-variant text-gray-medium dark:text-gray-light">
          Seamlessly adapts to your device for optimal viewing
        </p>
      </div>

      <Image
        src="/mockups/mockup-4.png"
        alt="View App on Macbook, iPad, iPhone"
        width={666}
        height={444}
      />
    </div>
  );
}
