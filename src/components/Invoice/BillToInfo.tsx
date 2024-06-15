import { Address } from "@/src/lib/types";

export default function BillToInfo({
  clientName,
  clientAddress,
}: {
  clientName: string;
  clientAddress: Address;
}) {
  return (
    <div className="flex flex-col">
      <div>
        <h3 className="text-blue-gray dark:text-gray-light text-body-variant mb-[13px]">
          Bill To
        </h3>
        <p className="text-heading-s-variant">
          {clientName ? clientName : "No client name"}
        </p>
      </div>

      <div className="text-blue-gray dark:text-gray-light text-body mt-2">
        <p>{clientAddress.street ? clientAddress.street : "No street"}</p>
        <p>{clientAddress.city ? clientAddress.city : "No city"}</p>
        <p>{clientAddress.postCode ? clientAddress.postCode : "No postcode"}</p>
        <p>{clientAddress.country ? clientAddress.country : "No country"}</p>
      </div>
    </div>
  );
}
