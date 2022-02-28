import { React, useState } from "react";
import Back from "components/Back";
import TransparentStarIcon from "icons/home/transparent-star.svg";
import BlueStarIcon from "icons/home/blue-star.svg";
import Modal from "components/Modal";
import Button from "components/Button";
import { motion } from "framer-motion";

export default function PersonalLeaderBoard() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Back>جدول امتیازات</Back>

      <section>
        <div className="container px-4">
          <ul className="list-none flex flex-col gap-y-2 mt-4 2xl:mt-0">
            {[...Array(5)].map((e, i) => (
              <li
                key={i}
                className={`${
                  i + 1 === 1
                    ? "gold-badge"
                    : i + 1 === 2
                    ? "silver-badge"
                    : i + 1 === 3 && "bronze-badge"
                } p-2 flex items-center rounded-[10px] bg-[#f9f9f9] bg-opacity-10 relative cursor-pointer`}
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

                <span className="text-sm text-white text-right font-dana-regular ml-auto mt-1">
                  09123457689
                </span>

                <span className="text-sm text-white font-dana-regular ml-2 mt-1">
                  234.789
                </span>

                <img
                  src={TransparentStarIcon}
                  className="w-4 h-4 object-contain"
                  alt="star logo"
                />
              </li>
            ))}

            <li onClick={handleOpenModal} className="cursor-pointer">
              <div className="w-full h-full flex flex-col px-[22px]">
                <span className="w-1 h-1 opacity-30 bg-white mb-[3px] rounded-full"></span>
                <span className="w-1 h-1 opacity-30 bg-white mb-[3px] rounded-full"></span>
                <span className="w-1 h-1 opacity-30 bg-white mb-2 rounded-full"></span>
              </div>

              <div className="flex items-center p-2 rounded-[10px] bg-[#acffd2] bg-opacity-80 shadow-[0_2px_4px_0_rgba(154,227,191,0.57)] relative">
                <div className="ml-2">
                  <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                    <img
                      className="w-full h-full object-cover"
                      src={require("images/home/board-avatar.webp")}
                      alt="team-logo"
                    />
                  </div>
                </div>

                <span className="text-base text-[#160d53] text-right font-dana-regular ml-auto mt-1">
                  شما
                </span>

                <span className="text-sm text-[#160d53] font-dana-regular ml-2 mt-1">
                  234.789
                </span>

                <img
                  src={BlueStarIcon}
                  className="w-4 h-4 object-contain"
                  alt="star logo"
                />
              </div>

              <div className="w-full h-full flex flex-col px-[22px]">
                <span className="w-1 h-1 opacity-30 bg-white mt-2 mb-[3px] rounded-full"></span>
                <span className="w-1 h-1 opacity-30 bg-white mb-[3px] rounded-full"></span>
                <span className="w-1 h-1 opacity-30 bg-white rounded-full"></span>
              </div>
            </li>

            <li className="p-2 flex items-center rounded-[10px] bg-[#f9f9f9] bg-opacity-10 relative cursor-pointer">
              <div className="ml-2">
                <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                  <img
                    className="w-full h-full object-cover"
                    src={require("images/home/board-avatar.webp")}
                    alt="team-logo"
                  />
                </div>
              </div>

              <span className="text-sm text-white text-right font-dana-regular ml-auto mt-1">
                09123457689
              </span>

              <span className="text-sm text-white font-dana-regular ml-2 mt-1">
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
      </section>

      <Modal alignCenter isOpen={openModal} setIsOpen={setOpenModal}>
        <div className="container pt-2 pb-4 px-4">
          <h5 className="text-xs font-dana-regular text-[#333] mb-4 leading-8 text-right">
            امتیازات
          </h5>

          <ul className="list-none flex flex-col gap-y-2">
            <li className="custom-list-item p-2 flex items-center">
              <div className="relative ml-2">
                <div className="team-logow-8 h-8 overflow-hidden rounded-full">
                  <img
                    className="w-full h-full object-cover"
                    src={require("images/home/board-avatar.webp")}
                    alt="team-logo"
                  />
                </div>

                <div className="absolute -bottom-[2px] -right-[2px] rounded-full bg-[#e98e1a] w-3 h-3 border-2 border-white"></div>
              </div>

              <span className="text-base text-black font-dana-regular ml-auto block mt-1">
                09357894560
              </span>

              <span className="text-sm text-[#1d1d1d] font-dana-regular block mt-1">
                234.789
              </span>
            </li>
          </ul>

          <ul className="list-none mt-3 mb-7 flex flex-col gap-y-4">
            <li className="flex">
              <span className="inline-block ml-auto text-base text-[#1d1d1d] font-dana-regular">
                امتیاز از بازی
              </span>
              <span className="inline-block text-sm font-dana-regular text-[#1d1d1d] mt-1">
                <span className="ml-1 text-[10px]">امتیاز</span>
                <span className="text-right">230+</span>
              </span>
            </li>

            <li className="flex">
              <span className="inline-block ml-auto text-base text-[#1d1d1d] font-dana-regular">
                امتیاز از ماموریت
              </span>
              <span className="inline-block text-sm font-dana-regular text-[#1d1d1d] mt-1">
                <span className="ml-1 text-[10px]">امتیاز</span>
                <span className="text-right">230+</span>
              </span>
            </li>

            <li className="flex">
              <span className="inline-block ml-auto text-base text-[#1d1d1d] font-dana-regular">
                امتیاز از تماشا
              </span>
              <span className="inline-block text-sm font-dana-regular text-[#1d1d1d] mt-1">
                <span className="ml-1 text-[10px]">امتیاز</span>
                <span className="text-right">230+</span>
              </span>
            </li>

            <li className="flex">
              <span className="inline-block ml-auto text-base text-[#1d1d1d] font-dana-regular">
                امتیاز از دعوت
              </span>
              <span className="inline-block text-sm font-dana-regular text-[#1d1d1d] mt-1">
                <span className="ml-1 text-[10px]">امتیاز</span>
                <span className="text-right">230+</span>
              </span>
            </li>
          </ul>

          <Button type="primary" onClick={handleCloseModal}>
            <span className="mt-1 block">گرفتم</span>
          </Button>
        </div>
      </Modal>
    </motion.main>
  );
}
