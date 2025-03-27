import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  isFullscreen?: boolean;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  isFullscreen = false,
  title,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? "w-full h-full"
    : "relative max-w-2xl w-full rounded-sm bg-white shadow-lg";

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999 ">
      <div
        className="fixed inset-0 h-full w-full bg-gray-400/50 "
        onClick={onClose}
      ></div>
      <div
        ref={modalRef}
        className={`${contentClasses}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary h-15 flex justify-between items-center px-4">
          <h2 className="text-[20px] text-white font-bold">{title}</h2>
          <button onClick={onClose} className="text-white cursor-pointer">
            <FontAwesomeIcon icon={faRemove} width={30} height={30} />
          </button>
        </div>
        <div className={`${className}`}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
