import { nanoid } from "nanoid";
import { InvoiceItem } from "@/src/lib/types";

export default function InvoiceItems({
  itemList,
}: {
  itemList: InvoiceItem[];
}) {
  return (
    <div className="w-full bg-[#F9FAFE] dark:bg-dark-medium px-6 md:px-8 py-6 md:py-9 rounded-t-lg mt-9 md:mt-11">
      <div className="hidden md:flex justify-between w-full mb-8">
        <h3 className="text-blue-gray dark:text-gray-light text-body-variant w-2/5">
          Item Name
        </h3>
        <h3 className="text-blue-gray dark:text-gray-light text-body-variant w-1/5 text-center">
          QTY.
        </h3>
        <h3 className="text-blue-gray dark:text-gray-light text-body-variant w-1/5 text-right">
          Price
        </h3>
        <h3 className="text-blue-gray dark:text-gray-light text-body-variant w-1/5 text-right">
          Total
        </h3>
      </div>

      {itemList.length !== 0 ? (
        <>
          {/* Tablet & Desktop Styles */}
          <ul className="hidden md:flex flex-col gap-8 w-full">
            {itemList.map((item, index) => (
              <li
                className="flex justify-between w-full text-heading-s-variant"
                key={nanoid()}
              >
                <p className="w-2/5">{item.itemName}</p>
                <p className="w-1/5 text-center text-blue-gray dark:text-gray-light">
                  {item.qty}
                </p>
                <p className="w-1/5 text-right text-blue-gray dark:text-gray-light">
                  £ {item.price && item.price.toFixed(2)}
                </p>
                <p className="w-1/5 text-right">£ {item.total.toFixed(2)}</p>
              </li>
            ))}
          </ul>

          {/*  Mobile Styles */}
          <ul className="flex md:hidden flex-col gap-8 w-full">
            {itemList.map((item, index) => (
              <li
                className="flex justify-between items-center w-full text-heading-s-variant"
                key={nanoid()}
              >
                <div className="flex flex-col items-start gap-2">
                  <p>{item.itemName}</p>

                  <p className="text-center text-blue-gray dark:text-gray-light">
                    {item.qty} x £ {item.price && item.price.toFixed(2)}
                  </p>
                </div>

                <p className="text-right">£ {item.total.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-body-variant text-center text-blue-gray dark:text-gray-light">
          No items. You can edit this invoice to add items.
        </p>
      )}
    </div>
  );
}
