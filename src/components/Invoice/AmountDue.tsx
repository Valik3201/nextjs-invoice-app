export default function AmountDue({ total }: { total?: number }) {
  return (
    <div className="w-full text-white bg-[#373B53] dark:bg-dark-darkest px-8 py-9 rounded-b-lg">
      <div className="flex justify-between w-full items-center">
        <p className="text-body">Amount Due</p>
        <p className="text-heading-m">£ {total ? total.toFixed(2) : "0.00"}</p>
      </div>
    </div>
  );
}
