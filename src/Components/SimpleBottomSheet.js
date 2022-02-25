import { React, Fragment } from "react";

export default function SimpleBottomSheet({
  children,
  isOpen,
  setIsOpen,
  style,
}) {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      <div
        className={`w-screen h-screen bg-black bg-opacity-30 fixed left-0 top-0 transform ease-out transition-opacity ${
          isOpen
            ? "z-20 duration-500 opacity-100"
            : "-z-10 duration-500 opacity-0"
        }`}
        onClick={handleClose}
      ></div>
      <div
        className={`${style} rounded-tl-3xl rounded-tr-3xl z-20 w-full fixed bottom-0 left-0 transform ease-out transition-all ${
          isOpen
            ? "duration-500 -translate-y-0"
            : "duration-500 translate-y-full"
        }`}
      >
        {children}
      </div>
    </Fragment>
  );
}
