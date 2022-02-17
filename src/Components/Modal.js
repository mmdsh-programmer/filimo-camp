import { React, Fragment, useEffect } from "react";
import styles from "styles/Modal.module.scss";
import InstagramIcon from "icons/modal/social-icons/instagram.svg";
import WhatsappIcon from "icons/modal/social-icons/whatsapp.svg";
import FacebookIcon from "icons/modal/social-icons/facebook.svg";
import TwitterIcon from "icons/modal/social-icons/twitter.svg";

export default function Modal({
  isOpen,
  setIsOpen,
  isSuccess,
  isUnseccess,
  children,
}) {
  const handleClose = () => {
    setIsOpen(false);
  };

  //   useEffect(() => {
  //     isOpen
  //       ? document.body.style.setProperty("overflow", "hidden")
  //       : document.body.style.removeProperty("overflow");
  //   }, [isOpen]);

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
      <div
        className={`${
          styles["modal-container"]
        } bg-white overflow-y-auto overflow-x-hidden fixed left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 overflow-auto transform ease-out transition-opacity duration-500 
            ${isOpen ? "opacity-100 z-50" : "opacity-0 -z-1"}`}
      >
        {isSuccess || isUnseccess ? (
          <div className="container p-4">
            <div
              className={`${styles["profile-image"]} rounded-full overflow-hidden mx-auto`}
            >
              {/* <img
                className="w-full h-full object-cover"
                src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
                alt="profile image"
              /> */}
            </div>
            {isSuccess ? (
              <p
                className={`${styles["notification"]} text-center text-xs mt-2`}
              >
                جواب عالی دادی <br />
                غنچه بودی شکفتی :)
              </p>
            ) : (
              <p
                className={`${styles["notification"]} text-center text-xs mt-2`}
              >
                گند زدی که! <br /> حالا اشکالی نداره… یبار دیگه میتونی این مرحله
                رو بری (برای بازی)
              </p>
            )}

            {isSuccess ? (
              <Fragment>
                <div
                  className={`${styles["score-box"]} flex p-2 items-center mt-4`}
                >
                  <span className={`${styles["score-text"]} text-xs ml-auto`}>
                    امتیاز این مرحله
                  </span>
                  <span className="text-xl dfault-title-color ml-2">۵</span>
                  <span className={`${styles["score-text"]} text-xs`}>
                    امتیاز
                  </span>
                </div>

                <div
                  className={`${styles["social-media-holder"]} flex gap-x-2 items-center mt-4`}
                >
                  <span className={`${styles["score-text"]} text-xs`}>
                    در شبکه‌های اجتماعی منتشر کن
                  </span>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="w-full h-full object-contain"
                      src={InstagramIcon}
                      alt="instagram icon"
                    />
                  </a>
                  <a
                    href="https://whatsapp.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="w-full h-full object-contain"
                      src={WhatsappIcon}
                      alt="whatsapp icon"
                    />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="w-full h-full object-contain"
                      src={FacebookIcon}
                      alt="facebook icon"
                    />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="w-full h-full object-contain"
                      src={TwitterIcon}
                      alt="twitter icon"
                    />
                  </a>
                </div>

                <button className="fill-button rounded-2lg px-3 py-2 w-full mt-6" onClick={handleClose}>
                  برو مرحله بعدی
                </button>
              </Fragment>
            ) : (
              <Fragment>
                <div className="flex gap-x-2 mt-20">
                  <button
                    className="outlined-button rounded-2lg px-3 py-2 w-full mt-6"
                    onClick={handleClose}
                  >
                    بعدا
                  </button>

                  <button
                    className="fill-button rounded-2lg px-3 py-2 w-full mt-6"
                    onClick={handleClose}
                  >
                    دوباره
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        ) : (
          children
        )}
      </div>
    </Fragment>
  );
}
