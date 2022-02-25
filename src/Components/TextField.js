import React from "react";
import styles from "styles/TextField.module.scss";

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
        className={`${styles["field-holder"]} ${
          styles["custom-outline"]
        }  relative border-2 focus-within:${
          !hasError && "border-blue-500"
        } p-2 ${hasError ? "border-red-600" : styles["field-color"]}`}
      >
        <input
          {...input}
          className={`${style?.input} block w-full font-dana-regular text-[#1b1b1b] appearance-none focus:outline-none bg-transparent default-title-color text-sm`}
        />
        <label
          htmlFor={input.name}
          className={`${styles["custom-label"]} ${style?.label} font-dana-regular absolute mt-[2px] right-3 bg-white -z-1 duration-300 origin-0 text-xs`}
        >
          {label}
        </label>
      </div>
      {hasError && (
        <span
          className={`${styles["helper-text"]} text-xs text-red-600 text-right mr-1`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}
