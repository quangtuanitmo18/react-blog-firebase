import React from "react";
import { useDropdown } from "./dropdown-context";

const Select = ({
  placeholder = "",
  isIcon = true,
  className = "",
  children,
}) => {
  const { show, toggle, handleSetCoords } = useDropdown();

  const handleClickSelect = (e) => {
    handleSetCoords(e);
    toggle();
  };

  return (
    <div
      className={`flex items-center justify-between py-[15px] px-[25px] bg-white border border-grayf1 rounded-lg cursor-pointer font-medium ${className}`}
      onClick={handleClickSelect}
    >
      {placeholder ? <span>{placeholder}</span> : children}

      {isIcon && (
        <span className="pointer-events-none">
          {show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </span>
      )}
    </div>
  );
};

export default Select;
