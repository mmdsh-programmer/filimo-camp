import { React, useState } from "react";
import styles from "styles/Home.module.scss";
import { Link } from "react-router-dom";
import Menu from "components/Menu";
import BottomSheet from "components/BottomSheet";
import SimpleBottomSheet from "components/SimpleBottomSheet";
import Modal from "components/Modal";
import ArrowLeftIcon from "icons/home/arrow-left-circle.svg";
import TickIcon from "icons/home/tick.svg";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false); //menu state
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); //main bottom sheet content state
  const [isBottomSheetFullyClosed, setIsBottomSheetFullyClosed] =
    useState(false); //main bottom sheet full shown state
  const [isSimpleBottomSheetOpen, setIsSimpleBottomSheetOpen] = useState(false); //common modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeAllBottomSheets = () => {
    setIsBottomSheetOpen(false);
    setIsBottomSheetFullyClosed(true);
    setIsSimpleBottomSheetOpen(false);
  };

  const openSimpleBottomSheet = () => {
    setIsSimpleBottomSheetOpen(true);
  };

  const openBottomSheet = () => {
    setIsBottomSheetFullyClosed(false);
  };

  const handleBottomSheets = (closeAll, selectedBottomSheet) => {
    closeAll();
    selectedBottomSheet();
  };

  return (
    <main className="min-h-screen">
      <section className="button-holder">
        <div className="container">
          <div className="flex px-6 py-4">
            <button
              className={`${styles["button-register"]} text-base`}
              onClick={openMenu}
            >
              ثبت نام
            </button>
          </div>
        </div>
      </section>

      <section className="map-holder mt-6">
        <div className="container">
          <figure className={`${styles["map-holder"]} mx-auto`}>
            <img
              src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
              alt="game map"
              title="نقشه بازی"
              className="w-full h-full object-cover"
            />
          </figure>
        </div>
      </section>

      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
      <BottomSheet
        isOpen={isBottomSheetOpen}
        setIsOpen={setIsBottomSheetOpen}
        isFullyClosed={isBottomSheetFullyClosed}
        callBack={() =>
          handleBottomSheets(closeAllBottomSheets, openSimpleBottomSheet)
        }
      />
      <SimpleBottomSheet
        isOpen={isSimpleBottomSheetOpen}
        setIsOpen={setIsSimpleBottomSheetOpen}
        callBack={() =>
          handleBottomSheets(closeAllBottomSheets, openBottomSheet)
        }
      >
        <div className="container p-4">
          <h3 className="text-base default-title-color mx-2">چالش ۵</h3>

          <div
            className={`${styles["challenge-items-holder"]} flex flex-col gap-y-2 my-4`}
          >
            <div
              className={`${styles["challenge-item"]} flex custom-list-item p-2 items-center`}
            >
              <h4
                className={`${styles["item-title"]} text-base text-right ml-auto default-title-color`}
              >
                بازی
              </h4>
              <span className="text-sm default-title-color ml-2">
                <span className="score-title ml-1">امتیاز</span>۲۳۰+
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
                className={`${styles["item-title"]} text-base text-right ml-auto default-title-color`}
              >
                ماموریت
              </h4>
              <span className="text-sm default-title-color ml-2">
                <span className="score-title ml-1">امتیاز</span>۲۳۰+
              </span>
              <Link
                to="/"
                className={`${styles["item-link"]} w-6 h-6`}
                onClick={openModal}
              >
                <img
                  className="w-full h-full object-contain"
                  src={TickIcon}
                  alt="button icon"
                />
              </Link>
            </div>
          </div>

          <div className={`${styles["video-suggestion"]} flex flex-col`}>
            <h4 className="text-base">
              تماشا{" "}
              <span className={styles["sub-title"]}>
                (با دیدن هر ساعت فیلم ۵ امتیاز بگیر)
              </span>
            </h4>

            <div className={`${styles["video-box"]} flex gap-x-2 my-4 p-4`}>
              <a href="https://filimo.com" rel="noreferrer">
                <div className={`${styles["video-item"]} flex items-center`}>
                  <img
                    className={`${styles["video-image"]} object-cover`}
                    src={`${process.env.PUBLIC_URL}/images/home/video.png`}
                    alt="video"
                  />
                  <div className={`${styles["video-info"]} flex flex-col mr-2`}>
                    <span className={`${styles["sub-title"]} block`}>
                      پیشنهاد فیلیمو
                    </span>
                    <h6
                      className={`${styles["video-title"]} text-base text-right default-title-color text-ellipsis overflow-hidden`}
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
                    src={`${process.env.PUBLIC_URL}/images/home/video.png`}
                    alt="video"
                  />
                  <div className={`${styles["video-info"]} flex flex-col mr-2`}>
                    <span className={`${styles["sub-title"]} block`}>
                      پیشنهاد فیلیمو
                    </span>
                    <h6
                      className={`${styles["video-title"]} text-base text-right default-title-color`}
                    >
                      سریال جیران
                    </h6>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </SimpleBottomSheet>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        isUnseccess
      ></Modal>
    </main>
  );
}
