import { React, Fragment } from "react";

export default function Button({
  type = "secondary",
  style = "",
  onClick,
  disabled = false,
  children,
}) {
  return (
    <Fragment>
      {type === "primary" ? (
        <div className={`${style} button-primary overflow-hidden pb-1`}>
          <button
            className="text-center font-dana-demibold p-2 w-full h-full"
            onClick={onClick}
            disabled={disabled}
          >
            {children}
          </button>
        </div>
      ) : type === "secondary" ? (
        <div className={`${style} button-secondary overflow-hidden pb-1`}>
          <button
            className="text-center font-dana-medium p-2 w-full h-full"
            onClick={onClick}
            disabled={disabled}
          >
            {children}
          </button>
        </div>
      ) : (
        type === "disabled" && (
          <div className={`${style} button-disabled overflow-hidden pb-1`}>
            <button
              className="text-center font-dana-medium p-2 w-full h-full"
              onClick={onClick}
              disabled={disabled}
            >
              {children}
            </button>
          </div>
        )
      )}
    </Fragment>
  );
}
