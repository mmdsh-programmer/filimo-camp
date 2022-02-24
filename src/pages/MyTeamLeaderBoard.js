import React, { useState } from "react";
import Modal from "components/Modal";
import AddIcon from "icons/team/add.svg";
import Back from "components/Back";
import Background from "components/Background";
import Button from "components/Button";
import { useNavigate } from "react-router-dom";

export default function MyTeamLeaderBoard() {
  const [openModal, setOpenModal] = useState(false);
  let navigate = useNavigate();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const hidePhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(phoneNumber.substr(7, 3), "***");
  };

  return (
    <main className="min-h-screen">
      <Background />
      <Back>جدول امتیازات</Back>

      <section className="mt-6">
        <div className="container px-4">
          <h2 className="text-base text-white font-dana-regular">
            مجموع امتیازات تیم
          </h2>

          <span className="text-4xl text-white font-dana-medium mt-2 block">
            23567
          </span>
        </div>
      </section>

      <section className="my-6 mb-[100px]">
        <div className="container px-4">
          <ul className="list-none flex flex-col gap-y-2 mt-4">
            {[...Array(5)].map((e, index) => (
              <li
                className="p-2 flex items-center rounded-[10px] bg-[#f9f9f9] bg-opacity-10 relative"
                onClick={handleOpenModal}
                key={index}
              >
                <span className="text-sm text-white font-dana-regular ml-[6px] block mt-1">
                  {index + 1}
                </span>

                <div className="ml-3">
                  <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                    <img
                      className="w-full h-full object-cover"
                      src={require("images/home/board-avatar.webp")}
                      alt="team-logo"
                    />
                  </div>
                </div>

                <span
                  className="text-base text-white text-right font-dana-regular ml-auto mt-1"
                  dir="ltr"
                >
                  {hidePhoneNumber("9357894056")}
                </span>

                <span className="text-sm text-white font-dana-regular mt-1">
                  234.789
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="fixed bottom-0 left-0 w-full">
        <div className="container p-4 pb-8">
          <Button
            type="primary"
            onClick={() => navigate("/leader-board/teams/add-teammate")}
          >
            <div className="flex items-center">
              <img
                className="w-6 h-6 object-contain ml-[6px]"
                src={AddIcon}
                alt="add icon"
              />

              <span className="block text-base font-dana-demibold ml-auto text-[#1d1d1d] mt-1">
                می‌توانید تا ۷ نفر اضافه کنید
              </span>

              <span className="text-sm font-dana-regular block mt-1">
                افزودن
              </span>
            </div>
          </Button>
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

          <button
            className="w-full text-sm font-dana-medium text-[#cc304b] mt-4 leading-8"
            onClick={handleCloseModal}
          >
            حذف از تیم
          </button>
        </div>
      </Modal>
    </main>
  );
}
