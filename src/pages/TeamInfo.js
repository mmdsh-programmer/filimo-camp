import React, { useState } from "react";
import styles from "styles/Team.module.scss";
import Modal from "components/Modal";
import { Link } from "react-router-dom";
import AddIcon from "icons/team/add.svg";

export default function TeamInfo() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const randomColor = () => {
    const badgeColors = ["#e9c61a", "#d3d3d3", "#e98e1a", "#1a95e9", "#891ae9"];
    return badgeColors[Math.floor(Math.random() * badgeColors.length)];
  };

  return (
    <main className="bg-white min-h-screen">
      <section className="container px-4 pt-4">
        <h1 className="text-base default-title-color">جدول امتیازات</h1>
      </section>

      <section className="mt-6">
        <div className="container px-4">
          <h2 className="text-base default-title-color">مجموع امتیازات تیم</h2>

          <span className="text-4xl font-medium default-title-color mt-2 block">
            ۲۳۵۶۷
          </span>
        </div>
      </section>

      <section className={`${styles["team-holder"]} my-6`}>
        <div className="container px-4">
          <ul className="list-none flex flex-col gap-y-2">
            <li
              className="custom-list-item p-2 flex items-center"
              onClick={handleOpenModal}
            >
              <span className="text-sm default-title-color ml-2">1</span>

              <div className={`${styles["team-logo-holder"]} relative ml-2`}>
                <div
                  className={`${styles["team-logo"]} w-8 h-8 overflow-hidden rounded-full`}
                >
                  {/* <img
                    className="w-full h-full object-cover"
                    src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
                    alt="team-logo"
                  /> */}
                </div>
              </div>

              <span className="text-base default-title-color ml-auto text-right">
                ۰۹۱۲۳۴۵۷۶۸۹
              </span>

              <span className="text-sm default-title-color">۲۳۴.۷۸۹</span>
            </li>

            <li
              className="custom-list-item p-2 flex items-center"
              onClick={handleOpenModal}
            >
              <span className="text-sm default-title-color ml-2">2</span>

              <div className={`${styles["team-logo-holder"]} relative ml-2`}>
                <div
                  className={`${styles["team-logo"]} w-8 h-8 overflow-hidden rounded-full`}
                >
                  {/* <img
                    className="w-full h-full object-cover"
                    src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
                    alt="team-logo"
                  /> */}
                </div>
              </div>

              <span className="text-base default-title-color ml-auto text-right">
                ۰۹۱۲۳۴۵۷۶۸۹
              </span>

              <span className="text-sm default-title-color">۲۳۴.۷۸۹</span>
            </li>

            <li
              className="custom-list-item p-2 flex items-center"
              onClick={handleOpenModal}
            >
              <span className="text-sm default-title-color ml-2">3</span>

              <div className={`${styles["team-logo-holder"]} relative ml-2`}>
                <div
                  className={`${styles["team-logo"]} w-8 h-8 overflow-hidden rounded-full`}
                >
                  {/* <img
                    className="w-full h-full object-cover"
                    src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
                    alt="team-logo"
                  /> */}
                </div>
              </div>

              <span className="text-base default-title-color ml-auto text-right">
                ۰۹۱۲۳۴۵۷۶۸۹
              </span>

              <span className="text-sm default-title-color">۲۳۴.۷۸۹</span>
            </li>

            <li
              className="custom-list-item p-2 flex items-center"
              onClick={handleOpenModal}
            >
              <span className="text-sm default-title-color ml-2">4</span>

              <div className={`${styles["team-logo-holder"]} relative ml-2`}>
                <div
                  className={`${styles["team-logo"]} w-8 h-8 overflow-hidden rounded-full`}
                >
                  {/* <img
                    className="w-full h-full object-cover"
                    src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
                    alt="team-logo"
                  /> */}
                </div>
              </div>

              <span className="text-base default-title-color ml-auto text-right">
                ۰۹۱۲۳۴۵۷۶۸۹
              </span>

              <span className="text-sm default-title-color">۲۳۴.۷۸۹</span>
            </li>

            <li
              className="custom-list-item p-2 flex items-center"
              onClick={handleOpenModal}
            >
              <span className="text-sm default-title-color ml-2">5</span>

              <div className={`${styles["team-logo-holder"]} relative ml-2`}>
                <div
                  className={`${styles["team-logo"]} w-8 h-8 overflow-hidden rounded-full`}
                >
                  {/* <img
                    className="w-full h-full object-cover"
                    src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
                    alt="team-logo"
                  /> */}
                </div>
              </div>

              <span className="text-base default-title-color ml-auto text-right">
                ۰۹۱۲۳۴۵۷۶۸۹
              </span>

              <span className="text-sm default-title-color">۲۳۴.۷۸۹</span>
            </li>

            <li
              className="custom-list-item active p-2 flex items-center"
              onClick={handleOpenModal}
            >
              <span className="text-sm default-title-color ml-2">6</span>

              <div className={`${styles["team-logo-holder"]} relative ml-2`}>
                <div
                  className={`${styles["team-logo"]} w-8 h-8 overflow-hidden rounded-full`}
                >
                  {/* <img
                    className="w-full h-full object-cover"
                    src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
                    alt="team-logo"
                  /> */}
                </div>
              </div>

              <span className="text-base default-title-color ml-auto text-right">
                شما
              </span>

              <span className="text-sm default-title-color">۲۳۴.۷۸۹</span>
            </li>

            <li
              className="custom-list-item p-2 flex items-center"
              onClick={handleOpenModal}
            >
              <span className="text-sm default-title-color ml-2">7</span>

              <div className={`${styles["team-logo-holder"]} relative ml-2`}>
                <div
                  className={`${styles["team-logo"]} w-8 h-8 overflow-hidden rounded-full`}
                >
                  {/* <img
                    className="w-full h-full object-cover"
                    src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
                    alt="team-logo"
                  /> */}
                </div>
              </div>

              <span className="text-base default-title-color ml-auto text-right">
                ۰۹۱۲۳۴۵۷۶۸۹
              </span>

              <span className="text-sm default-title-color">۲۳۴.۷۸۹</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="fixed bottom-0 left-0 w-full bg-white">
        <div className="container p-4">
          <div className="flex custom-list-item p-2 items-center">
            <Link className="ml-3 w-6 h-6" to="/invite">
              <img
                className="w-full h-full object-contain"
                src={AddIcon}
                alt="add icon"
              />
            </Link>

            <span className="block text-sm default-title-color ml-auto leading-8">
              می‌توانید تا ۷ نفر اضافه کنید
            </span>

            <Link to="/invite" className="text-sm default-title-color">
              افزودن
            </Link>
          </div>
        </div>
      </section>

      <Modal isOpen={openModal} setIsOpen={setOpenModal}>
        <div className="container pt-2 pb-4 px-4">
          <h5 className={`${styles["team-modal-title"]} text-xs mb-4`}>
            امتیازات
          </h5>

          <ul
            className={`${styles["modal-team-holder"]} "list-none flex flex-col gap-y-2"`}
          >
            <li className="custom-list-item p-2 flex items-center">
              <div className={`${styles["team-logo-holder"]} relative ml-2`}>
                <div
                  className={`${styles["team-logo"]} w-8 h-8 overflow-hidden rounded-full`}
                >
                  {/* <img
                    className="w-full h-full object-cover"
                    src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
                    alt="team-logo"
                  /> */}
                </div>

                <div
                  className={`${styles["logo-badge"]} absolute rounded-full`}
                  style={{ backgroundColor: randomColor() }}
                ></div>
              </div>

              <span
                className={`${styles["team-name"]} text-base default-title-color ml-2 overflow-hidden text-ellipsis text-right`}
              >
                آرین
              </span>

              <span className="text-sm ml-auto sub-title">۰۹۳۵۷۸۹۴۵۶۰</span>

              <span className="text-sm default-title-color">۲۳۴.۷۸۹</span>
            </li>
          </ul>

          <ul className="list-none mt-3 mb-7">
            <li className="flex mb-4">
              <span className="inline-block ml-auto text-base">
                امتیاز از بازی
              </span>
              <span className="inline-block text-sm">
                <span className="score-title ml-1">امتیاز</span>
                <span className="text-right">۲۳۰+</span>
              </span>
            </li>

            <li className="flex mb-4">
              <span className="inline-block ml-auto text-base">
                امتیاز از ماموریت
              </span>
              <span className="inline-block text-sm">
                <span className="score-title ml-1">امتیاز</span>
                <span className="text-right">۲۳۰+</span>
              </span>
            </li>

            <li className="flex mb-4">
              <span className="inline-block ml-auto text-base">
                امتیاز از تماشا
              </span>
              <span className="inline-block text-sm">
                <span className="score-title ml-1">امتیاز</span>
                <span className="text-right">۲۳۰+</span>
              </span>
            </li>

            <li className="flex mb-4">
              <span className="inline-block ml-auto text-base">
                امتیاز از دعوت
              </span>
              <span className="inline-block text-sm">
                <span className="score-title ml-1">امتیاز</span>
                <span className="text-right">۲۳۰+</span>
              </span>
            </li>
          </ul>

          <button
            className="w-full fill-button p-2 rounded-2lg"
            onClick={handleCloseModal}
          >
            گرفتم
          </button>
        </div>
      </Modal>
    </main>
  );
}
