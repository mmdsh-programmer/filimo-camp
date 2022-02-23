import { React, useState } from "react";
import styles from "styles/Home.module.scss";
import { Link } from "react-router-dom";
import Menu from "components/Menu";
import SimpleBottomSheet from "components/SimpleBottomSheet";
import ArrowLeftIcon from "icons/home/arrow-left-circle.svg";
import TickIcon from "icons/home/tick.svg";
import Background from "components/Background";
import FilimoMap from "images/home/filimo-map.svg";
import StarIcon from "icons/home/star.svg";
import Button from "components/Button";
import TransparentStarIcon from "icons/home/transparent-star.svg";
import BlueStarIcon from "icons/home/blue-star.svg";

export default function Home() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); //menu state
  const [isLeaderBoardMenuOpen, setIsLeaderBoardMenuOpen] = useState(false); //menu state
  const [isSimpleBottomSheetOpen, setIsSimpleBottomSheetOpen] = useState(false); //common modal state

  const handleOpenProfileMenu = () => {
    setIsProfileMenuOpen(true);
  };

  const handleOpenLeaderBoardMenu = () => {
    setIsLeaderBoardMenuOpen(true);
  };

  const handleOpenSimpleModal = () => {
    setIsSimpleBottomSheetOpen(true);
  };

  const hidePhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(phoneNumber.substr(4, 3), "***");
  };

  return (
    <main className="min-h-screen">
      <Background />
      <section className={`${styles["top-menu-holder"]} sticky top-0`}>
        <div className="container p-6">
          <div className={`${styles["top-menu"]} flex bg-white items-center`}>
            <figure
              className={`${styles["avatar"]} overflow-hidden cursor-pointer`}
              onClick={handleOpenProfileMenu}
            >
              <img
                className="w-full h-full object-cover"
                src={require("images/home/avatar.webp")}
                alt="avatar logo"
              />
            </figure>

            <span
              className="light-text font-dana-regular text-xs ml-auto block mt-1 text-right"
              dir="ltr"
            >
              {hidePhoneNumber("09358944560")}
            </span>

            <div
              className={`${styles["score-holder"]} flex items-center cursor-pointer p-2`}
              onClick={handleOpenLeaderBoardMenu}
            >
              <span className="text-xs font-dana-regular ml-3 block mt-1">
                امتیاز
              </span>
              <span className="text-base font-dana-medium font-medium text-black ml-2 block mt-1">
                235
              </span>
              <img src={StarIcon} alt="star logo" />
            </div>
          </div>
        </div>
      </section>

      <section className="map-holder mt-6">
        <div className="container">
          <figure className={`${styles["map-holder"]} mx-auto`}>
            <img
              src={FilimoMap}
              alt="game map"
              title="نقشه بازی"
              className="w-full h-full object-cover"
            />
          </figure>
        </div>
      </section>

      <section className={`${styles["button-holder"]} w-full fixed bottom-0`}>
        <div className="container p-6">
          <div className={`${styles["button-row"]} flex gap-2 flex-wrap`}>
            <div className={`${styles["button"]}`}>
              <div className={styles["button-background"]}></div>
              <Link
                to="/invite"
                className="text-center block w-full h-full text-white font-dana-medium leading-8 p-2"
              >
                دعوت از دوستان
              </Link>
            </div>
            <div className={`${styles["button"]}`}>
              <div className={styles["button-background"]}></div>
              <Link
                to="/team"
                className="text-center block w-full h-full text-white font-dana-medium leading-8 p-2"
              >
                ایجاد تیم
              </Link>
            </div>

            <Button
              style={styles["button"]}
              type="primary"
              onClick={handleOpenSimpleModal}
            >
              چالش
            </Button>
          </div>
        </div>
      </section>

      {/* profile drawer */}
      <Menu isOpen={isProfileMenuOpen} setIsOpen={setIsProfileMenuOpen}>
        <div className="container px-4 py-[27px]">
          <div className="flex items-center my-2">
            <figure className="rounded-full overflow-hidden w-w-10/5 h-h-10/5 ml-[6px]">
              <img
                src={require("images/home/avatar.webp")}
                alt="پروفایل"
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="flex flex-col">
              <span className="text-base text-right text-[#333333] font-dana-regular">
                UID-34565
              </span>
              <span
                className="text-[12px] text-right light-text font-dana-regular"
                dir="ltr"
              >
                {hidePhoneNumber("09357894560")}
              </span>
            </div>
          </div>

          <div className="bg-[#f8f8f8] rounded-[10px] py-4 px-[6px] mt-4">
            <ul className="list-none flex flex-col gap-y-4">
              <li className="flex font-dana-regular text-[#1d1d1d] mx-[10px]">
                <span className="ml-auto text-base">امتیاز من</span>
                <span>234</span>
              </li>

              <li className="w-full h-[1px] bg-[#ececec]"></li>

              <li className="flex mx-[10px]">
                <span className="inline-block ml-auto text-base font-dana-regular text-[#7c7c7c]">
                  امتیاز از بازی
                </span>
                <span className="inline-block font-dana-regular">
                  <span className="text-[10px] ml-1 text-black">امتیاز</span>
                  <span className="text-sm text-black">230+</span>
                </span>
              </li>

              <li className="flex mx-[10px]">
                <span className="inline-block ml-auto text-base font-dana-regular text-[#7c7c7c]">
                  امتیاز از ماموریت
                </span>
                <span className="inline-block font-dana-regular">
                  <span className="text-[10px] ml-1 text-black">امتیاز</span>
                  <span className="text-sm text-black">230+</span>
                </span>
              </li>

              <li className="flex mx-[10px]">
                <span className="inline-block ml-auto text-base font-dana-regular text-[#7c7c7c]">
                  امتیاز از تماشا
                </span>
                <span className="inline-block font-dana-regular">
                  <span className="text-[10px] ml-1 text-black">امتیاز</span>
                  <span className="text-sm text-black">230+</span>
                </span>
              </li>

              <li className="flex mx-[10px]">
                <span className="inline-block ml-auto text-base font-dana-regular text-[#7c7c7c]">
                  امتیاز از دعوت
                </span>
                <span className="inline-block font-dana-regular">
                  <span className="text-[10px] ml-1 text-black">امتیاز</span>
                  <span className="text-sm text-black">230+</span>
                </span>
              </li>
            </ul>
          </div>

          <nav className="flex flex-col gap-y-2 mt-2">
            <li className="flex rounded-[10px] bg-[#f8f8f8] p-2">
              <Link
                className="text-base font-dana-regular text-[#1d1d1d] leading-[1.81] w-full"
                to="/team/1"
              >
                مشاهده جدول امتیازات
              </Link>
            </li>

            <li className="flex rounded-[10px] bg-[#f8f8f8] p-2">
              <Link
                className="text-base font-dana-regular text-[#1d1d1d] leading-[1.81] w-full"
                to="/team"
              >
                ایجاد تیم
              </Link>
            </li>

            <li className="flex rounded-[10px] bg-[#f8f8f8] p-2">
              <Link
                className="text-base font-dana-regular text-[#1d1d1d] leading-[1.81] w-full"
                to="/invite"
              >
                دعوت از دوستان
              </Link>
            </li>

            <li className="flex rounded-[10px] bg-[#f8f8f8] p-2">
              <Link
                className="text-base font-dana-regular text-[#1d1d1d] leading-[1.81] w-full"
                to="/"
              >
                شرایط و مقررات
              </Link>
            </li>
          </nav>
        </div>
      </Menu>

      {/* leader board  */}
      <Menu
        left
        isOpen={isLeaderBoardMenuOpen}
        setIsOpen={setIsLeaderBoardMenuOpen}
      >
        <div className="container py-6 px-4">
          <h2 className="text-base font-dana-regular text-[#333]">
            جدول امتیازات
          </h2>

          <ul className="list-none flex flex-col gap-y-2 mt-4">
            <li className="gold-badge p-2 flex items-center rounded-[10px] bg-[#f8f8f8] relative">
              <div className="ml-2">
                <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                  <img
                    className="w-full h-full object-cover"
                    src={require("images/home/board-avatar.webp")}
                    alt="team-logo"
                  />
                </div>
              </div>

              <span className="text-sm text-[#7c7c7c] text-right font-dana-regular ml-auto mt-1">
                تیم شاهین-345
              </span>

              <span className="text-sm text-black font-dana-regular ml-2 mt-1">
                234.789
              </span>

              <img
                src={TransparentStarIcon}
                className="w-4 h-4 object-contain"
                alt="star logo"
              />
            </li>

            <li className="silver-badge p-2 flex items-center rounded-[10px] bg-[#f8f8f8] relative">
              <div className="ml-2">
                <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                  <img
                    className="w-full h-full object-cover"
                    src={require("images/home/board-avatar.webp")}
                    alt="team-logo"
                  />
                </div>
              </div>

              <span className="text-sm text-[#7c7c7c] text-right font-dana-regular ml-auto mt-1">
                تیم شاهین-345
              </span>

              <span className="text-sm text-black font-dana-regular ml-2 mt-1">
                234.789
              </span>

              <img
                src={TransparentStarIcon}
                className="w-4 h-4 object-contain"
                alt="star logo"
              />
            </li>

            <li className="bronze-badge p-2 flex items-center rounded-[10px] bg-[#f8f8f8] relative">
              <div className="ml-2">
                <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                  <img
                    className="w-full h-full object-cover"
                    src={require("images/home/board-avatar.webp")}
                    alt="team-logo"
                  />
                </div>
              </div>

              <span className="text-sm text-[#7c7c7c] text-right font-dana-regular ml-auto mt-1">
                تیم شاهین-345
              </span>

              <span className="text-sm text-black font-dana-regular ml-2 mt-1">
                234.789
              </span>

              <img
                src={TransparentStarIcon}
                className="w-4 h-4 object-contain"
                alt="star logo"
              />
            </li>

            <li className="p-2 flex items-center rounded-[10px] bg-[#f8f8f8] relative">
              <div className="ml-2">
                <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                  <img
                    className="w-full h-full object-cover"
                    src={require("images/home/board-avatar.webp")}
                    alt="team-logo"
                  />
                </div>
              </div>

              <span className="text-sm text-[#7c7c7c] text-right font-dana-regular ml-auto mt-1">
                تیم شاهین-345
              </span>

              <span className="text-sm text-black font-dana-regular ml-2 mt-1">
                234.789
              </span>

              <img
                src={TransparentStarIcon}
                className="w-4 h-4 object-contain"
                alt="star logo"
              />
            </li>

            <li className="p-2 flex items-center rounded-[10px] bg-[#f8f8f8] relative">
              <div className="ml-2">
                <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                  <img
                    className="w-full h-full object-cover"
                    src={require("images/home/board-avatar.webp")}
                    alt="team-logo"
                  />
                </div>
              </div>

              <span className="text-sm text-[#7c7c7c] text-right font-dana-regular ml-auto mt-1">
                تیم شاهین-345
              </span>

              <span className="text-sm text-black font-dana-regular ml-2 mt-1">
                234.789
              </span>

              <img
                src={TransparentStarIcon}
                className="w-4 h-4 object-contain"
                alt="star logo"
              />
            </li>

            <li>
              <div className="w-full h-full flex flex-col px-[22px]">
                <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                <span className="w-1 h-1 opacity-40 bg-[#333] mb-2 rounded-full"></span>
              </div>
              <Link
                to="/team/1"
                className="flex items-center p-2 rounded-[10px] bg-[#acffd2] relative you"
              >
                <div className="ml-2">
                  <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                    <img
                      className="w-full h-full object-cover"
                      src={require("images/home/board-avatar.webp")}
                      alt="team-logo"
                    />
                  </div>
                </div>

                <span className="text-base text-[#170d53] font-semibold text-right font-dana-regular ml-auto mt-1">
                  تیم شما
                </span>

                <span className="text-sm text-[#170d53] font-semibold font-dana-regular ml-2 mt-1">
                  234.789
                </span>

                <img
                  src={BlueStarIcon}
                  className="w-4 h-4 object-contain"
                  alt="star logo"
                />
              </Link>
              <div className="w-full h-full flex flex-col px-[22px]">
                <span className="w-1 h-1 opacity-40 bg-[#333] mt-2 mb-[3px] rounded-full"></span>
                <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                <span className="w-1 h-1 opacity-40 bg-[#333] rounded-full"></span>
              </div>
            </li>

            <li className="p-2 flex items-center rounded-[10px] bg-[#f8f8f8] relative">
              <div className="ml-2">
                <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                  <img
                    className="w-full h-full object-cover"
                    src={require("images/home/board-avatar.webp")}
                    alt="team-logo"
                  />
                </div>
              </div>

              <span className="text-sm text-[#7c7c7c] text-right font-dana-regular ml-auto mt-1">
                تیم شاهین-345
              </span>

              <span className="text-sm text-black font-dana-regular ml-2 mt-1">
                234.789
              </span>

              <img
                src={TransparentStarIcon}
                className="w-4 h-4 object-contain"
                alt="star logo"
              />
            </li>
          </ul>
        </div>
      </Menu>

      <SimpleBottomSheet
        isOpen={isSimpleBottomSheetOpen}
        setIsOpen={setIsSimpleBottomSheetOpen}
        style="backdrop-blur-[4px] bg-white bg-opacity-75"
      >
        <div className="container p-4">
          <h3 className="text-base default-title-color mx-2 light-text font-dana-regular">
            چالش 5
          </h3>

          <div
            className={`${styles["challenge-items-holder"]} flex flex-col gap-y-2 my-4`}
          >
            <div
              className={`${styles["challenge-item"]} flex custom-list-item p-2 items-center`}
            >
              <h4
                className={`${styles["item-title"]} text-base text-right ml-auto default-title-color font-dana-regular`}
              >
                بازی
              </h4>
              <span className="text-sm default-title-color ml-2 font-dana-regular flex items-center">
                <span className="score-title ml-1">امتیاز</span>
                <span>230+</span>
              </span>
              <Link to="/test" className={`${styles["item-link"]} w-6 h-6`}>
                <img
                  className="w-full h-full object-contain"
                  src={ArrowLeftIcon}
                  alt="button icon"
                />
              </Link>
            </div>

            <div
              className={`${styles["challenge-item"]} flex custom-list-item p-2 items-center`}
            >
              <h4
                className={`${styles["item-title"]} text-base text-right ml-auto default-title-color font-dana-regular`}
              >
                ماموریت
              </h4>
              <span className="text-sm default-title-color ml-2 font-dana-regular flex items-center">
                <span className="score-title ml-1">امتیاز</span>
                <span>230+</span>
              </span>
              <Link to="/" className={`${styles["item-link"]} w-6 h-6`}>
                <img
                  className="w-full h-full object-contain"
                  src={TickIcon}
                  alt="button icon"
                />
              </Link>
            </div>
          </div>

          <div
            className={`${styles["video-suggestion"]} flex flex-col bg-white`}
          >
            <div className="p-4">
              <h4 className="text-base font-dana-regular light-text mb-3">
                تماشا{" "}
                <span className={styles["sub-title"]}>
                  (با دیدن هر ساعت فیلم ۵ امتیاز بگیر)
                </span>
              </h4>
              <div className={`${styles["video-box"]} flex gap-x-2`}>
                <a href="https://filimo.com" rel="noreferrer">
                  <div className={`${styles["video-item"]} flex items-center`}>
                    <img
                      className={`${styles["video-image"]} object-cover`}
                      src={require("images/home/video.png")}
                      alt="video"
                    />
                    <div
                      className={`${styles["video-info"]} flex flex-col mr-2`}
                    >
                      <span
                        className={`${styles["sub-title"]} block font-dana-regular`}
                      >
                        پیشنهاد فیلیمو
                      </span>
                      <h6
                        className={`${styles["video-title"]} text-base text-right default-title-color text-ellipsis overflow-hidden font-dana-regular`}
                      >
                        سریال جیران
                      </h6>
                    </div>
                  </div>
                </a>
                <a href="https://filimo.com" rel="noreferrer">
                  <div className={`${styles["video-item"]} flex items-center`}>
                    <img
                      className={`${styles["video-image"]} object-cover`}
                      src={require("images/home/video.png")}
                      alt="video"
                    />
                    <div
                      className={`${styles["video-info"]} flex flex-col mr-2`}
                    >
                      <span
                        className={`${styles["sub-title"]} block font-dana-regular`}
                      >
                        پیشنهاد فیلیمو
                      </span>
                      <h6
                        className={`${styles["video-title"]} text-base text-right default-title-color font-dana-regular`}
                      >
                        سریال جیران
                      </h6>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </SimpleBottomSheet>
    </main>
  );
}
