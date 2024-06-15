import { Address } from "@/src/lib/types";

export default function SenderAddressInfo({
  senderAddress,
}: {
  senderAddress: Address;
}) {
  return (
    <div className="md:text-right text-blue-gray dark:text-gray-light text-body">
      <p>{senderAddress.street ? senderAddress.street : "No street"}</p>
      <p>{senderAddress.city ? senderAddress.city : "No city"}</p>
      <p>{senderAddress.postCode ? senderAddress.postCode : "No postcode"}</p>
      <p>{senderAddress.country ? senderAddress.country : "No country"}</p>
    </div>
  );
}
