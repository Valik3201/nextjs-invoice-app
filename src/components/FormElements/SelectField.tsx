"use client";

import { useState } from "react";
import { PaymentTerms } from "../../lib/types";
import ArrowIcon from "../../icons/ArrowIcon";

export default function SelectField({
  value,
  onChange,
}: {
  value: PaymentTerms;
  onChange: (value: PaymentTerms) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<PaymentTerms>(
    value || PaymentTerms.Net30Days
  );

  const handleTermSelect = (term: PaymentTerms) => {
    setSelectedTerm(term);
    setIsOpen(false);
    onChange(term);
  };

  const paymentTermsOptions: PaymentTerms[] = [
    PaymentTerms.Net1Day,
    PaymentTerms.Net7Days,
    PaymentTerms.Net14Days,
    PaymentTerms.Net30Days,
  ];

  return (
    <div className="mb-[25px] relative">
      <h4 className="block text-body-variant text-blue-gray mb-2">
        Payment Terms
      </h4>
      <div
        className="relative bg-white w-full h-12 text-heading-s-variant border border-gray-light rounded p-4 pr-8 
        focus:outline-none focus:ring-primary focus:border-primary hover:border-primary hover:cursor-pointer 
        dark:bg-dark-light dark:border-[#252945]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {`Net ${selectedTerm} ${selectedTerm === 1 ? "Day" : "Days"}`}

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mr-1.5 rotate-0">
          <span
            className={`transition duration-200 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <ArrowIcon />
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="absolute mt-2 z-10 bg-white top-full left-0 w-full rounded-lg shadow-filter-light divide-y-[1px] divide-gray-light dark:bg-dark-medium dark:shadow-filter-dark dark:divide-dark-light">
          {paymentTermsOptions.map((term) => (
            <div
              key={term}
              onClick={() => handleTermSelect(term)}
              className="text-heading-s-variant py-4 ps-6 hover:text-primary cursor-pointer transition duration-200 ease-in-out"
            >
              {`Net ${term} ${term === 1 ? "Day" : "Days"}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
