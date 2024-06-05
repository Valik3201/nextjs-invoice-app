"use client";

import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";
import { format } from "date-fns";
import ArrowIcon from "../../icons/ArrowIcon";
import CalendarIcon from "../../icons/CalendarIcon";

const options = {
  autoHide: true,
  todayBtn: false,
  clearBtn: false,
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background:
      "bg-white dark:bg-dark-medium w-full px-5 !shadow-filter-light !dark:shadow-filter-dark",
    todayBtn: "",
    clearBtn: "",
    icons:
      "p-0 hover:bg-white dark:bg-dark-medium hover:dark:bg-dark-medium focus:ring-0",
    text: "hover:text-primary-light hover:bg-white dark:hover:text-primary-light hover:dark:bg-dark-medium focus:ring-0",
    disabledText:
      "leading-4 text-dark-darkest/[0.08] hover:bg-white hover:text-primary-light hover:dark:bg-dark-medium dark:text-gray-light/[0.08] dark:hover:text-primary-light ",
    input: "",
    inputIcon: "text-blue-gray",
    selected: "text-primary bg-white dark:bg-dark-medium !dark:text-primary",
  },
  icons: {
    prev: () => <ArrowIcon />,
    next: () => <ArrowIcon />,
  },
  datepickerClassNames: "absolute top-12 left-0 w-full pb-4 z-20",
  defaultDate: new Date(),
  language: "en",
  disabledDates: [],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: `${new Date()}`,
};

export default function InputDate({
  name,
  value,
  onChange,
  error,
  action,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | false | undefined;
  action: "new" | "edit";
}) {
  const [show, setShow] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | string | null>(value);

  const handleChange = (selectedDate: Date) => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    setSelectedDate(formattedDate);
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: formattedDate,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <div className={`${action === "new" ? "" : "opacity-50"}`}>
      <div className="flex justify-between mb-2 text-body-variant text-blue-gray dark:text-gray-light">
        <p className={`${error ? "text-red-medium" : ""}`}>Invoice Date</p>
        {error && <p className="text-error text-red-medium pe-4">{error}</p>}
      </div>

      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
        classNames="relative"
      >
        <div className="relative">
          <div
            className={`absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none text-blue-gray dark:text-gray-light ${
              action === "new" ? "" : "opacity-50"
            }`}
          >
            <CalendarIcon />
          </div>

          <input
            type="text"
            className={`bg-white w-full h-12 text-heading-s-variant border border-gray-light rounded p-4 focus:outline-none focus:ring-primary focus:border-primary dark:bg-dark-light dark:border-[#252945] ${
              error
                ? "border-red-medium dark:border-red-medium "
                : "border-gray-light"
            }`}
            placeholder={`${format(new Date(), "dd MMM yyyy")}`}
            value={selectedDate ? format(selectedDate, "dd MMM yyyy") : ""}
            onFocus={() => setShow(true)}
            disabled={action === "new" ? false : true}
            readOnly
          />
        </div>
      </Datepicker>
    </div>
  );
}
