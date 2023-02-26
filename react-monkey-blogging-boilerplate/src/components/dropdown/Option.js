import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  const handleOnClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="py-[15px] px-[25px] cursor-pointer flex items-center justify-between hover:text-primary transition-all"
      onClick={handleOnClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
