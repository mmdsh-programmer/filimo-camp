import { React, Fragment, useEffect } from "react";
import styles from "styles/Menu.module.scss";
import { Link } from "react-router-dom";

export default function Menu({ isOpen, setIsOpen }) {
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
        className={`${
          styles["menu"]
        } h-full bg-white fixed right-0 top-0 z-50 overflow-auto transform ease-out transition-all duration-500 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="container px-4 py-2">
          <div className={`${styles["menu-profile"]} flex items-center my-2`}>
            <figure
              className={`${styles["profile-avatar"]} rounded-full overflow-hidden`}
            >
              {/* <img
                src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
                alt="پروفایل"
                className="w-full h-full object-cover"
              /> */}
            </figure>

            <div className={`${styles["profile-details"]} flex flex-col`}>
              <span className="text-base text-right">آرین مقبلی</span>
              <span className="text-sm text-right">۰۹۳۵۷۸۹۴۵۶۰</span>
            </div>
          </div>

          <div className={`${styles["divider"]} w-full`}></div>

          <nav className={`${styles["menu-links"]}`}>
            <ul className="list-none flex flex-col">
              <li className="flex mt-4">
                <span className="ml-auto text-base">امتیاز من</span>
                <span id="points" className="text-base">
                  234
                </span>
              </li>
              <li className="flex mt-4">
                <Link className="text-base" to="/">
                  مشاهده جدول امتیازات (فردی)
                </Link>
              </li>
              <li className="flex mt-4">
                <Link className="text-base" to="/team">
                  ایجاد تیم
                </Link>
              </li>
              <li className="flex mt-4">
                <Link className="text-base" to="/invite">
                  دعوت از دوستان
                </Link>
              </li>
              <li className="flex mt-4">
                <Link className="text-base" to="/rules">
                  شرایط و مقررات
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* <div className={styles["menu__profile"]}></div> */}
      </aside>
    </Fragment>
  );
}
