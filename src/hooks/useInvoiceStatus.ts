import { useState } from "react";
import { InvoiceStatus } from "@/src/lib/types";

export const useInvoiceStatus = () => {
  const [selectedStatuses, setSelectedStatuses] = useState<Set<InvoiceStatus>>(
    new Set()
  );

  const handleStatusChange = (status: InvoiceStatus) => {
    setSelectedStatuses((prevSelectedStatuses) => {
      const newSelectedStatuses = new Set(prevSelectedStatuses);
      if (newSelectedStatuses.has(status)) {
        newSelectedStatuses.delete(status);
      } else {
        newSelectedStatuses.add(status);
      }
      return newSelectedStatuses;
    });
  };

  return { selectedStatuses, handleStatusChange };
};
