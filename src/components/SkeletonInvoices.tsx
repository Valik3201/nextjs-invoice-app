export default function SkeletonInvoices() {
  return (
    <>
      <div className="flex justify-between items-center mb-8 md:mb-[55px] lg:mb-[68px] animate-pulse">
        <div className="flex flex-col gap-2 md:gap-3">
          <div className="h-6 md:h-8 w-20 md:w-32 bg-gray-light rounded dark:bg-gray-medium"></div>
          <div className="h-2 md:h-3 w-16 md:w-40 bg-gray-light rounded dark:bg-gray-medium"></div>
        </div>

        <div className="flex gap-5 md:gap-10 items-center">
          <div className="h-8 w-14 md:w-36 bg-gray-light rounded dark:bg-gray-medium"></div>
          <div className="h-12 w-24 md:w-36 bg-gray-light rounded-full dark:bg-gray-medium"></div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full animate-pulse">
        <div className="h-[114px] md:h-[72px] w-full rounded-lg bg-gray-light dark:bg-gray-medium"></div>
        <div className="h-[114px] md:h-[72px] w-full rounded-lg bg-gray-light dark:bg-gray-medium"></div>
        <div className="h-[114px] md:h-[72px] w-full rounded-lg bg-gray-light dark:bg-gray-medium"></div>
      </div>
    </>
  );
}
