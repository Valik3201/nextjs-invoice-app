"use client";

import { useState } from "react";

export default function Modal({
  handleConfirm,
  id,
}: {
  handleConfirm: () => void;
  id: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      <button
        onClick={openModal}
        className="py-4 px-6 rounded-full text-heading-s-variant text-white bg-red-medium hover:bg-red-light transition duration-200 ease-in-out"
      >
        Delete
      </button>

      {isOpen && (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full bg-black/50">
          <div className="relative w-[480px] max-h-full">
            <div className="relative bg-white shadow-item p-12 rounded-lg">
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-6 right-6"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 1L13 13" stroke="#52555F" strokeWidth="2" />
                  <path
                    d="M1 13L13 0.999999"
                    stroke="#52555F"
                    strokeWidth="2"
                  />
                </svg>
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
