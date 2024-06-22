"use client";

import React, { useEffect, createContext, useContext, ReactNode } from "react";
import { useToggleState } from "@/src/hooks/useToggleState";
import Button from "../Button/Button";
import CloseIcon from "@/src/icons/CloseIcon";

interface ModalContextProps {
  closeModal: () => void;
  handleConfirm: () => void;
}

const ModalContext = createContext<ModalContextProps>({
  closeModal: () => {},
  handleConfirm: () => {},
});

interface ModalProps {
  handleConfirm: () => void;
  children: ReactNode;
  trigger?: ReactNode | string | null;
  shouldCloseOnConfirm?: boolean;
  isOpen?: boolean;
  toggleState?: () => void;
}

function Modal({
  handleConfirm,
  children,
  trigger,
  shouldCloseOnConfirm = true,
  isOpen: externalIsOpen,
  toggleState: externalToggleState,
}: ModalProps) {
  const { state: internalIsOpen, toggleState: internalToggleState } =
    useToggleState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const toggleState = externalToggleState || internalToggleState;

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

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      toggleState();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      toggleState();
    }
  };

  const handleConfirmAction = () => {
    handleConfirm();
    if (shouldCloseOnConfirm) {
      toggleState();
    }
  };

  const renderTrigger = () => {
    if (typeof trigger === "string") {
      return (
        <Button variant="red" onClick={toggleState} className="px-5">
          {trigger}
        </Button>
      );
    } else if (React.isValidElement(trigger)) {
      return React.cloneElement(trigger as React.ReactElement, {
        onClick: toggleState,
      });
    } else {
      return null;
    }
  };

  return (
    <ModalContext.Provider
      value={{ closeModal: toggleState, handleConfirm: handleConfirmAction }}
    >
      <>
        {renderTrigger()}

        {isOpen && (
          <div
            onClick={handleBackdropClick}
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full bg-dark-darkest/50"
          >
            <div className="relative w-80 md:w-[480px] max-h-full">
              <div className="relative bg-white shadow-item p-8 md:p-12 rounded-lg dark:bg-dark-light">
                <button
                  type="button"
                  onClick={toggleState}
                  className="absolute top-6 right-6 stroke-dark-darkest dark:stroke-gray-light"
                >
                  <CloseIcon />
                  <span className="sr-only">Close modal</span>
                </button>

                {children}
              </div>
            </div>
          </div>
        )}
      </>
    </ModalContext.Provider>
  );
}

function Header({ children }: { children: ReactNode }) {
  return <h2 className="text-heading-m mb-3">{children}</h2>;
}

function Body({ children }: { children: ReactNode }) {
  return (
    <div className="text-body-variant text-gray-medium mb-[14px]">
      {children}
    </div>
  );
}

function Message({ children }: { children: ReactNode }) {
  return <div className="text-body text-gray-medium">{children}</div>;
}

function DiscardBtn({ children }: { children: ReactNode }) {
  const { closeModal } = useContext(ModalContext);

  return <Button onClick={closeModal}>{children}</Button>;
}

function ConfirmBtn({
  children,
  variant = "red",
}: {
  children: ReactNode;
  variant?:
    | "red"
    | "primary"
    | "default"
    | "white"
    | "dark"
    | "icon"
    | "facebook";
}) {
  const { handleConfirm } = useContext(ModalContext);

  return (
    <Button variant={variant} type="submit" onClick={handleConfirm}>
      {children}
    </Button>
  );
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Message = Message;
Modal.DiscardBtn = DiscardBtn;
Modal.ConfirmBtn = ConfirmBtn;

export default Modal;
