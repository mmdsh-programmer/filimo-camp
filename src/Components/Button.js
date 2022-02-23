import { React, Fragment } from "react";

export default function Button({
  type = "secondary",
  style = "",
  onClick,
  children,
}) {
  return (
    <Fragment>
      {type === "primary" ? (
        <div className={`${style} button-primary overflow-hidden pb-1`}>
          <button className="text-center font-dana-demibold p-3 w-full h-full" onClick={onClick}>
            {children}
          </button>
        </div>
      ) : (
        <div className={`${style} button-secondary overflow-hidden pb-1`}>
          <button className="text-center font-dana-medium p-3 w-full h-full" onClick={onClick}>
            {children}
          </button>
        </div>
      )}
    </Fragment>
  );
}
