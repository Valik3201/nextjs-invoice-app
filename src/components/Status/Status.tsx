import DotIcon from "@/src/icons/DotIcon";

export default function Status({ status }: { status: string }) {
  const color = getColor(status);

  function getColor(status: string) {
    switch (status) {
      case "pending":
        return "#FF8F00";
      case "paid":
        return "#33D69F";
      case "draft":
        return "#373B53";
      default:
        return "";
    }
  }

  return (
    <>
      {status === "draft" ? (
        <div className="flex justify-center gap-2 rounded-[0.38rem] p-3 lg:p-4 w-[104px] bg-[#373B53]/10 text-[#373B53] dark:bg-[#dfe3fa]/10 dark:text-white">
          <DotIcon />
          <span className="capitalize text-heading-s-variant">{status}</span>
        </div>
      ) : (
        <div
          className="flex justify-center gap-2 rounded-[0.38rem] p-3 lg:p-4 w-[104px]"
          style={{ backgroundColor: `${color}15`, color: `${color}` }}
        >
          <DotIcon />
          <span className="capitalize text-heading-s-variant">{status}</span>
        </div>
      )}
    </>
  );
}
