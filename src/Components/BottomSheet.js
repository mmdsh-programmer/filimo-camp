import { React, Fragment } from "react";
import styles from "styles/BottomSheet.module.scss";
import ArrowDown from "icons/bottom-sheet/arrow-down.svg";
import { Link } from "react-router-dom";

export default function BottomSheet({ isOpen, setIsOpen }) {
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <div
        className={`${
          styles["backdrop"]
        } w-screen h-screen bg-black bg-opacity-30 fixed left-0 top-0 transform ease-out transition-opacity ${
          isOpen
            ? "z-10 duration-500 opacity-100"
            : "-z-10 duration-500 opacity-0"
        }`}
        onClick={handleClose}
      ></div>
      <div
        className={`${styles["bottom-sheet-holder"]} bg-white z-20 w-full fixed bottom-0 left-0`}
      >
        <div className={`${styles["expandable-panel"]} relative`}>
          <div className="container px-4 pt-4">
            <div className="flex flex-col">
              <div className={`${styles["panel-header"]} flex`}>
                <button
                  className={`${styles["panel-arrow-holder"]} w-8 h-8 p-1 rounded-full absolute left-2/4 -translate-x-1/2`}
                  onClick={handleChange}
                >
                  <img
                    className={`w-6 h-6 object-contain transform ease-out transition-all duration-300 ${
                      !isOpen && "rotate-180"
                    }`}
                    src={ArrowDown}
                    alt="arrow down"
                  />
                </button>

                <div className="flex flex-col ml-6">
                  <span
                    className={`${styles["score-title"]} block text-right text-sm mb-2`}
                  >
                    امتیاز من
                  </span>
                  <span className={`${styles["score-value"]} block text-right`}>
                    ۲۳۰+
                  </span>
                </div>

                <div className="flex flex-col">
                  <span
                    className={`${styles["score-title"]} block text-right text-sm mb-2`}
                  >
                    لیست امتیازات
                  </span>
                  <span className={`${styles["score-value"]} block text-right`}>
                    ۵۳۷
                  </span>
                </div>
              </div>
            </div>

            <div className={`${styles["divider"]} w-full my-4`}></div>

            <div
              className={`${
                styles["details-panel"]
              } ease-out transition-all duration-700 ${
                isOpen ? "max-h-44 overflow-y-hidden" : "max-h-0 overflow-hidden"
              }`}
            >
              <ul className="list-none">
                <li className="flex mb-4">
                  <span
                    className={`${styles["details-title"]} inline-block ml-auto text-base`}
                  >
                    امتیاز از بازی
                  </span>
                  <span className={`${styles["details-content"]} inline-block`}>
                    <span className={`${styles["content-title"]}`}>امتیاز</span>
                    <span className={`${styles["content-score"]} text-right`}>
                      ۲۳۰+
                    </span>
                  </span>
                </li>

                <li className="flex mb-4">
                  <span
                    className={`${styles["details-title"]} inline-block ml-auto text-base`}
                  >
                    امتیاز از ماموریت
                  </span>
                  <span className={`${styles["details-content"]} inline-block`}>
                    <span className={`${styles["content-title"]}`}>امتیاز</span>
                    <span className={`${styles["content-score"]} text-right`}>
                      ۲۳۰+
                    </span>
                  </span>
                </li>

                <li className="flex mb-4">
                  <span
                    className={`${styles["details-title"]} inline-block ml-auto text-base`}
                  >
                    امتیاز از تماشا
                  </span>
                  <span className={`${styles["details-content"]} inline-block`}>
                    <span className={`${styles["content-title"]}`}>امتیاز</span>
                    <span className={`${styles["content-score"]} text-right`}>
                      ۲۳۰+
                    </span>
                  </span>
                </li>

                <li className="flex mb-4">
                  <span
                    className={`${styles["details-title"]} inline-block ml-auto text-base`}
                  >
                    امتیاز از دعوت
                  </span>
                  <span className={`${styles["details-content"]} inline-block`}>
                    <span className={`${styles["content-title"]}`}>امتیاز</span>
                    <span className={`${styles["content-score"]} text-right`}>
                      ۲۳۰+
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={`${styles["fixed-panel"]} relative bg-white`}>
          <div className={`container px-4 pb-4`}>
            <div className="flex flex-wrap gap-2">
              <Link
                className={`${styles["button"]} ${styles["disable"]} text-base text-center`}
                to="/"
              >
                دعوت از دوستان
              </Link>
              <Link
                className={`${styles["button"]} ${styles["disable"]} text-base text-center`}
                to="/"
              >
                ایجاد تیم
              </Link>
              <Link
                className={`${styles["button"]} ${styles["main"]} ${styles["disable"]} text-base text-center`}
                to="/"
              >
                چالش
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
