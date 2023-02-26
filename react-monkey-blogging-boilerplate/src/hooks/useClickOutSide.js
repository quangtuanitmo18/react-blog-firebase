import { createRef } from "react";
import { useEffect, useRef, useState } from "react";

export default function useClickOutSide(element = "button") {
  const [show, setShow] = useState(false);
  const nodeRef = useRef();
  const dom = element;
  useEffect(() => {
    const handleClick = (e) => {
      // console.log(e.target);
      //   console.log(e.target);
      //   console.log(nodeRef.current);
      // console.log(nodeRef.current);
      if (
        nodeRef.current &&
        !nodeRef.current.contains(e.target) &&
        !e.target.matches(dom)
      ) {
        setShow(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return {
    show,
    setShow,
    nodeRef,
  };
}
