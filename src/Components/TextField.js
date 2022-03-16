import React from "react";

export default function TextField({
  label,
  hasError,
  helperText,
  style,
  ...input
}) {
  return (
    <div className={style ? style.container : ""}>
      <div
        className={`rounded-[10px] custom-outline relative border-2 focus-within:${
          !hasError && "border-blue-500"
        } p-2 ${hasError ? "border-red-600" : "border-[1px] border-[#bbb]"}`}
      >
        <input
          {...input}
          className={`${style?.input} default-input block w-full font-dana-regular text-[#1b1b1b] appearance-none focus:outline-none bg-transparent default-title-color text-sm`}
        />
        <label
          htmlFor={input.name}
          className={`text-[#bbb] leading-[2] top-[5px] ${style?.label} font-dana-regular absolute mt-[2px] right-3 bg-white duration-300 origin-0 text-xs`}
        >
          {label}
        </label>
      </div>
      {hasError && (
        <span className="text-xs text-red-600 block text-right mr-1 font-dana-regular mt-1">
          {helperText}
        </span>
      )}
    </div>
  );
}
