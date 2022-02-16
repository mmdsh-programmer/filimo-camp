import React from "react";
import styles from "styles/TextField.module.scss";

export default function TextField({ label, ...rest }) {
  return (
    <div
      className={`${styles["field-holder"]} custom-outline relative border-2 focus-within:border-blue-500 p-2 `}
    >
      <input
        {...rest}
        className="block w-full appearance-none focus:outline-none bg-transparent default-title-color text-sm"
      />
      <label
        htmlFor={rest.name}
        className={`${styles["custom-label"]} absolute top-2 right-3 bg-white -z-1 duration-300 origin-0 text-xs`}
      >
        {label}
      </label>
    </div>
  );
}
