import React from "react";

export default function Button({
  type = "secondary",
  style = "",
  onClick,
  disabled = false,
  loading = false,
  autoWidth = false,
  children,
}) {
  return (
    <div
      className={`${style} ${
        type === "primary"
          ? "button-primary"
          : type === "secondary"
          ? "button-secondary"
          : type === "disabled" && "button-disabled"
      } overflow-hidden pb-1 transition-all duration-300 ease-out ${autoWidth ? "w-fit" : "w-full"}`}
    >
      <button
        className={`text-center font-dana-demibold p-2 ${
          autoWidth ? "w-[50px]" : "w-full"
        } h-full`}
        onClick={onClick}
        disabled={disabled}
      >
        {loading ? (
          <div
            className={`flex justify-center transition-all duration-500 ease-out ${
              loading ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              style={{ borderTopColor: "transparent" }}
              className="w-4 h-4 border-black border-[2px] border-solid rounded-full animate-spin m-1"
            ></div>
          </div>
        ) : (
          children
        )}
      </button>
    </div>
  );
}
