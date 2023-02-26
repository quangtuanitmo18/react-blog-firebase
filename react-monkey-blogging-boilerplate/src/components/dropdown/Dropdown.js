import React, { useState } from "react";
import { DropdownProvider } from "./dropdown-context";
import DropdownBlock from "./DropdownBlock";

const Dropdown = ({ className = "", children, ...props }) => {
  return (
    <DropdownProvider {...props}>
      <DropdownBlock className={className}>{children}</DropdownBlock>
    </DropdownProvider>
  );
};

export default Dropdown;
