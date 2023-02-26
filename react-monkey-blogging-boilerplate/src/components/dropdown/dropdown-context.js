import useClickOutSide from "hooks/useClickOutSide";
import { createContext, useContext, useState } from "react";

const DropdownContext = createContext();
function DropdownProvider(props) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  });
  const toggle = () => {
    setShow(!show);
  };
  const handleSetCoords = (e) => {
    setCoords(e.target.getBoundingClientRect());
  };
  const values = { show, setShow, toggle, coords, handleSetCoords };
  return (
    <DropdownContext.Provider value={values}>
      {props.children}
    </DropdownContext.Provider>
  );
}
function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined")
    throw new Error("useDropdown must be used within DropdownProvider");
  return context;
}
export { useDropdown, DropdownProvider };
