"use client";

import { useState, useEffect } from "react";
import CloseIcon from "@/src/icons/CloseIcon";

export default function Modal({
  handleConfirm,
  id,
}: {
  handleConfirm: () => void;
  id: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleYes = () => {
    handleConfirm();
    closeModal();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="py-4 px-6 rounded-full text-heading-s-variant text-white bg-red-medium hover:bg-red-light transition duration-200 ease-in-out"
      >
        Delete
      </button>

      {isOpen && (
        <div
          onClick={handleBackdropClick}
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full bg-dark-darkest/50"
        >
          <div className="relative w-80 md:w-[480px] max-h-full">
            <div className="relative bg-white shadow-item p-8 md:p-12 rounded-lg dark:bg-dark-light">
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-6 right-6 stroke-dark-darkest dark:stroke-gray-light"
              >
                <CloseIcon />
                <span className="sr-only">Close modal</span>
              </button>

              <div className="flex flex-col items-start justify-center gap-3 pb-[14px]">
                <h2 className="text-heading-m">Confirm Deletion</h2>
                <p className="text-body-variant text-gray-medium">
                  Are you sure you want to delete invoice #{id}? This action
                  cannot be undone.
                </p>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={closeModal}
                  type="button"
                  className="py-4 px-6 rounded-full text-heading-s-variant text-blue-gray-light bg-[#F9FAFE] hover:bg-gray-light dark:text-gray-light dark:bg-dark-medium dark:hover:bg-white/10 transition duration-200 ease-in-out"
                >
                  Cancel
                </button>

                <button
                  onClick={handleYes}
                  type="button"
                  className="py-4 px-6 rounded-full text-heading-s-variant text-white bg-red-medium hover:bg-red-light transition duration-200 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
