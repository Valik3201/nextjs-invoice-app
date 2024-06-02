import { FieldArray, useFormikContext, getIn } from "formik";
import { nanoid } from "nanoid";
import { Invoice } from "../../lib/types";
import InputField from "./InputField";
import Button from "../Button/Button";
import TrashIcon from "../../icons/TrashIcon";

export default function ItemListFieldArray({ values }: { values: Invoice }) {
  const { handleChange, handleBlur, touched, errors, setFieldValue } =
    useFormikContext();

  const calculateTotal = (qty: any, price: any) => {
    const parsedQty = parseFloat(qty);
    const parsedPrice = parseFloat(price);
    return !parsedQty || !parsedPrice || isNaN(parsedQty) || isNaN(parsedPrice)
      ? 0
      : parsedQty * parsedPrice;
  };

  return (
    <>
      <h3 className="text-blue-gray-light text-lg font-bold -tracking-[0.38px] mb-4">
        Item List
      </h3>

      <FieldArray
        name="itemList"
        render={({ remove, push }) => (
          <>
            {/* Tablet & Desktop Styles */}
            <ul className="hidden md:block max-w-full">
              {values.itemList.length > 0 &&
                values.itemList.map((item, index) => (
                  <li key={item.id} className="flex gap-4 items-center">
                    <div className="w-[35%]">
                      <InputField
                        label={index === 0 ? "Item Name" : ""}
                        name={`itemList[${index}].itemName`}
                        value={item.itemName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          getIn(touched, `itemList[${index}].itemName`) &&
                          getIn(errors, `itemList[${index}].itemName`)
                        }
                      />
                    </div>
                    <div className="w-[15%]">
                      <InputField
                        label={index === 0 ? "Qty" : ""}
                        name={`itemList[${index}].qty`}
                        type="number"
                        value={item.qty}
                        onChange={(e) => {
                          handleChange(e);
                          const total = calculateTotal(
                            e.target.value,
                            getIn(values, `itemList.${index}.price`)
                          );
                          setFieldValue(`itemList.${index}.total`, total);
                        }}
                        onBlur={handleBlur}
                        placeholder="0"
                        error={
                          getIn(touched, `itemList[${index}].qty`) &&
                          getIn(errors, `itemList[${index}].qty`)
                        }
                      />
                    </div>
                    <div className="w-[15%]">
                      <InputField
                        label={index === 0 ? "Price" : ""}
                        name={`itemList[${index}].price`}
                        type="number"
                        value={item.price && item.price.toFixed(2)}
                        onChange={(e) => {
                          handleChange(e);
                          const total = calculateTotal(
                            getIn(values, `itemList.${index}.qty`),
                            e.target.value
                          );
                          setFieldValue(`itemList.${index}.total`, total);
                        }}
                        onBlur={handleBlur}
                        placeholder="0.00"
                        error={
                          getIn(touched, `itemList[${index}].price`) &&
                          getIn(errors, `itemList[${index}].price`)
                        }
                      />
                    </div>
                    <div className="w-[15%]">
                      <InputField
                        label={index === 0 ? "Total" : ""}
                        name={`itemList.${index}.total`}
                        value={item.total.toFixed(2)}
                        readOnly
                      />
                    </div>

                    <div className={`${index === 0 ? "mt-[15px]" : ""}`}>
                      <Button
                        variant="icon"
                        onClick={() => remove(index)}
                        icon={<TrashIcon />}
                        isOnlyIcon
                      />
                    </div>
                  </li>
                ))}
            </ul>

            {/* Mobile Styles */}
            <ul className="block md:hidden max-w-full">
              {values.itemList.length > 0 &&
                values.itemList.map((item, index) => (
                  <li key={item.id} className="flex flex-col gap-6">
                    <InputField
                      label={"Item Name"}
                      name={`itemList[${index}].itemName`}
                      value={item.itemName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        getIn(touched, `itemList[${index}].itemName`) &&
                        getIn(errors, `itemList[${index}].itemName`)
                      }
                    />
                    <div className="flex gap-4 -mt-[25px]">
                      <div className="w-[25%]">
                        <InputField
                          label={"Qty"}
                          name={`itemList[${index}].qty`}
                          type="number"
                          value={item.qty}
                          onChange={(e) => {
                            handleChange(e);
                            const total = calculateTotal(
                              e.target.value,
                              getIn(values, `itemList.${index}.price`)
                            );
                            setFieldValue(`itemList.${index}.total`, total);
                          }}
                          onBlur={handleBlur}
                          placeholder="0"
                          error={
                            getIn(touched, `itemList[${index}].qty`) &&
                            getIn(errors, `itemList[${index}].qty`)
                          }
                        />
                      </div>
                      <div className="w-[35%]">
                        <InputField
                          label={"Price"}
                          name={`itemList[${index}].price`}
                          type="number"
                          value={item.price && item.price.toFixed(2)}
                          onChange={(e) => {
                            handleChange(e);
                            const total = calculateTotal(
                              getIn(values, `itemList.${index}.qty`),
                              e.target.value
                            );
                            setFieldValue(`itemList.${index}.total`, total);
                          }}
                          onBlur={handleBlur}
                          placeholder="0.00"
                          error={
                            getIn(touched, `itemList[${index}].price`) &&
                            getIn(errors, `itemList[${index}].price`)
                          }
                        />
                      </div>
                      <div className="w-[35%]">
                        <InputField
                          label={"Total"}
                          name={`itemList.${index}.total`}
                          value={item.total.toFixed(2)}
                          readOnly
                        />
                      </div>

                      <div className="mt-[28px]">
                        <Button
                          variant="icon"
                          onClick={() => remove(index)}
                          icon={<TrashIcon />}
                          isOnlyIcon
                        />
                      </div>
                    </div>
                  </li>
                ))}
            </ul>

            <Button
              variant="default"
              size="full"
              onClick={() =>
                push({
                  id: nanoid(),
                  itemName: "",
                  qty: "",
                  price: "",
                  total: 0,
                })
              }
            >
              + Add New Item
            </Button>
          </>
        )}
      />
    </>
  );
}
