export default function SkeletonInvoice() {
  return (
    <>
      <div className="flex flex-col gap-9 md:gap-6">
        <div className="w-full animate-pulse">
          <div className="h-20 md:h-[91px] w-full rounded-lg bg-gray-light dark:bg-gray-medium"></div>
        </div>

        <div className="w-full h-[400px] rounded-lg bg-gray-light dark:bg-gray-medium animate-pulse"></div>
      </div>
    </>
  );
}
