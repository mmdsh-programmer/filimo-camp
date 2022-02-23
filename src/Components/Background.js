import React from "react";
import styles from "styles/Background.module.scss"

export default function Background() {
  return (
    <div className={`${styles["background"]} bg-bg-gradient-to-custom fixed top-0 left-0 w-screen h-screen -z-1`}>
        <div className={`${styles["oval"]} ${styles["top-oval"]} absolute left-0 top-0`}></div>
        <div className={`${styles["oval"]} ${styles["bottom-oval"]} absolute right-0 bottom-0`}></div>
    </div>
  );
}
