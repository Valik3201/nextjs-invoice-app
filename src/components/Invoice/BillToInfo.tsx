import { BillTo } from "@/src/lib/types";

export default function BillToInfo({ billTo }: { billTo: BillTo }) {
  return (
    <div className="flex flex-col">
      <div>
        <h3 className="text-blue-gray dark:text-gray-light text-body-variant mb-[13px]">
          Bill To
        </h3>
        <p className="text-heading-s-variant">
          {billTo.clientName ? billTo.clientName : "No client name"}
        </p>
      </div>

      <div className="text-blue-gray dark:text-gray-light text-body mt-2">
        <p>{billTo.streetAddress ? billTo.streetAddress : "No street"}</p>
        <p>{billTo.city ? billTo.city : "No city"}</p>
        <p>{billTo.postCode ? billTo.postCode : "No postcode"}</p>
        <p>{billTo.country ? billTo.country : "No country"}</p>
      </div>
    </div>
  );
}
