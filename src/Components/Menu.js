import { React, Fragment, useEffect } from "react";

export default function Menu({ isOpen, setIsOpen, left = false, children }) {
  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    isOpen
      ? document.body.style.setProperty("overflow", "hidden")
      : document.body.style.removeProperty("overflow");
  }, [isOpen]);

  return (
    <Fragment>
      <div
        className={`w-screen h-screen bg-black bg-opacity-20 fixed left-0 top-0 transform ease-out transition-opacity 
        ${
          isOpen
            ? "z-40 duration-1000 opacity-100"
            : "-z-10 duration-1000 opacity-0"
        }`}
        onClick={handleClose}
      ></div>
      <aside
        className={`w-[311px] shadow-[0_2px_16px_0_rgba(0,0,0,0.1)] h-full bg-white fixed ${
          left
            ? "left-0 rounded-tr-3xl rounded-br-3xl"
            : "right-0 rounded-tl-3xl rounded-bl-3xl"
        } top-0 z-50 overflow-auto transform ease-out transition-all duration-500 
        ${
          isOpen
            ? left
              ? "-translate-x-0"
              : "translate-x-0"
            : left
            ? "-translate-x-full"
            : "translate-x-full"
        }`}
      >
        {children}
      </aside>
    </Fragment>
  );
}
