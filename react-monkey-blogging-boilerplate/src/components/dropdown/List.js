import { Portal } from "components/portal";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useDropdown } from "./dropdown-context";

const List = ({ className = "", children }) => {
  const { show, coords } = useDropdown();

  return (
    <>
      {show && (
        <Portal overlay={false}>
          <div
            className={`absolute left-0 w-full bg-white shadow-sm top-full z-[10] ${className}`}
            style={{
              top: coords.top + coords.height + window.scrollY,
              left: coords.left + window.scrollX,
              width: coords.width,
            }}
          >
            {children}
          </div>
        </Portal>
      )}
    </>
  );
};

export default List;
