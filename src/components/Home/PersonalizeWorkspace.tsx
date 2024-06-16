import Image from "next/image";

export default function PersonalizeWorkspace() {
  return (
    <div className="flex flex-col items-center gap-6 bg-white rounded-lg p-8 shadow-item dark:bg-dark-light">
      <div className="space-y-4">
        <h2 className="text-heading-m">Personalize Your Workspace</h2>
        <p className="text-body-variant text-gray-medium dark:text-gray-light">
          Choose between light and dark modes
        </p>
      </div>

      <Image
        src="/mockups/mockup-3.png"
        alt="Theme Toggle Macbook"
        width={666}
        height={444}
      />
    </div>
  );
}
