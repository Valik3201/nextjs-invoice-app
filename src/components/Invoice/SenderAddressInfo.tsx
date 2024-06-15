import { BillFrom } from "@/src/lib/types";

export default function SenderAddressInfo({
  billFrom,
}: {
  billFrom: BillFrom;
}) {
  return (
    <div className="md:text-right text-blue-gray dark:text-gray-light text-body">
      <p>{billFrom.streetAddress ? billFrom.streetAddress : "No street"}</p>
      <p>{billFrom.city ? billFrom.city : "No city"}</p>
      <p>{billFrom.postCode ? billFrom.postCode : "No postcode"}</p>
      <p>{billFrom.country ? billFrom.country : "No country"}</p>
    </div>
  );
}
