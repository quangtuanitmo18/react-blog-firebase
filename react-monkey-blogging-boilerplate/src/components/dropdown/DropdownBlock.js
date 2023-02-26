import React, { useEffect, useRef } from "react";
import { useDropdown } from "./dropdown-context";

const DropdownBlock = ({ className = "", children }) => {
  const { show, setShow } = useDropdown();
  const nodeRef = useRef();
  useEffect(() => {
    if (show) {
      const handleClick = (e) => {
        if (nodeRef.current && !nodeRef.current.contains(e.target)) {
          setShow(false);
        }
      };
      window.addEventListener("click", handleClick);
      return () => {
        window.removeEventListener("click", handleClick);
      };
    }
  }, [show]);

  return (
    <div className={`relative inline-block w-full ${className}`} ref={nodeRef}>
      {children}
    </div>
  );
};

export default DropdownBlock;
