import React, { useState } from "react";
import Background from "components/Background";
import Button from "components/Button";
import Modal from "components/Modal";
import CloseIcon from "icons/modal/close.svg";
import StarIcon from "icons/home/star.svg";

export default function Challenge() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openUnsuccessModal, setOpenUnSuccessModal] = useState(false);

  const handleSelection = ({ target: { value } }) => {
    setSelectedAnswer(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    selectedAnswer === "قرمز" ? handleOpenSuccess() : handleOpenUnsuccess();
  };

  const handleOpenSuccess = () => {
    setOpenSuccessModal(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccessModal(false);
  };

  const handleOpenUnsuccess = () => {
    setOpenUnSuccessModal(true);
  };

  const handleCloseUnsuccess = () => {
    setOpenUnSuccessModal(false);
  };

  return (
    <main className="h-screen">
      <Background />

      <section className="2xl:h-full">
        <div className="container p-6 pb-[100px] 2xl:h-full">
          <div className="flex flex-col 2xl:justify-center 2xl:h-full">
            <h1 className="text-base text-white font-dana-regular leading-[1.81]">
              سوال
            </h1>
            <span className="font-dana-regular text-xs text-[#7c7c7c]">
              مرحله ۱۴
            </span>

            <div className="mt-10">
              <h2 className="text-base text-white font-dana-regular">
                کلاه شخصیت کلاه‌قرمزی چه رنگی است؟
              </h2>
              <div className="flex flex-col">
                <div className="w-full mt-4 max-h-56 overflow-hidden rounded-[10px]">
                  <img
                    className="w-full h-full object-cover"
                    src={require("images/challenge/challenge-image.webp")}
                    alt="question image"
                  />
                </div>
              </div>

              <div className="mt-14">
                <form>
                  <ul className="flex flex-col gap-y-2">
                    <li className="relative rounded-[10px] bg-[#f9f9f9] bg-opacity-10 overflow-hidden">
                      <input
                        className="sr-only peer"
                        type="radio"
                        value="نارنجی"
                        name="answer"
                        id="answer_1"
                        onChange={handleSelection}
                      />
                      <label
                        className="font-dana-regular text-sm text-white flex p-2 pt-[10px] leading-[2.07] cursor-pointer 
                      peer-checked:bg-white peer-checked:text-black peer-checked:font-dana-medium peer-checked:ring-2 peer-checked:border-transparent"
                        htmlFor="answer_1"
                      >
                        نارنجی
                      </label>
                    </li>

                    <li className="relative rounded-[10px] bg-[#f9f9f9] bg-opacity-10 overflow-hidden">
                      <input
                        className="sr-only peer"
                        type="radio"
                        value="قرمز"
                        name="answer"
                        id="answer_2"
                        onChange={handleSelection}
                      />
                      <label
                        className="font-dana-regular text-sm text-white flex p-2 pt-[10px] leading-[2.07] cursor-pointer 
                      peer-checked:bg-white peer-checked:text-black peer-checked:font-dana-medium peer-checked:ring-2 peer-checked:border-transparent"
                        htmlFor="answer_2"
                      >
                        قرمز
                      </label>
                    </li>

                    <li className="relative rounded-[10px] bg-[#f9f9f9] bg-opacity-10 overflow-hidden">
                      <input
                        className="sr-only peer"
                        type="radio"
                        value="سبز"
                        name="answer"
                        id="answer_3"
                        onChange={handleSelection}
                      />
                      <label
                        className="font-dana-regular text-sm text-white flex p-2 pt-[10px] leading-[2.07] cursor-pointer 
                      peer-checked:bg-white peer-checked:text-black peer-checked:font-dana-medium peer-checked:ring-2 peer-checked:border-transparent"
                        htmlFor="answer_3"
                      >
                        سبز
                      </label>
                    </li>

                    <li className="relative rounded-[10px] bg-[#f9f9f9] bg-opacity-10 overflow-hidden">
                      <input
                        className="sr-only peer"
                        type="radio"
                        value="آبی"
                        name="answer"
                        id="answer_4"
                        onChange={handleSelection}
                      />
                      <label
                        className="font-dana-regular text-sm text-white flex p-2 pt-[10px] leading-[2.07] cursor-pointer 
                      peer-checked:bg-white peer-checked:text-black peer-checked:font-dana-medium peer-checked:ring-2 peer-checked:border-transparent"
                        htmlFor="answer_4"
                      >
                        آبی
                      </label>
                    </li>
                  </ul>

                  <div className="flex w-full fixed bottom-0 left-0 2xl:relative">
                    <div className="container px-6 pb-6 2xl:px-0">
                      <Button
                        type={`${selectedAnswer ? "primary" : "disabled"}`}
                        style="w-full mt-8"
                        disabled={!selectedAnswer}
                        onClick={handleSubmit}
                      >
                        تایید
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* sucess modal */}
      <Modal
        alignCenter
        isOpen={openSuccessModal}
        setIsOpen={setOpenSuccessModal}
      >
        <button
          className="absolute left-4 top-4 w-6 h-6"
          onClick={handleCloseSuccess}
        >
          <img src={CloseIcon} alt="close button" />
        </button>
        <div className="container px-6 pb-[27px] py-7">
          <div className="rounded-full overflow-hidden mx-auto w-52 h-52">
            <img
              className="w-full h-full object-cover"
              src={require("images/challenge/happy.webp")}
              alt="profile image"
            />
          </div>

          <h6 className="text-center font-dana-medium text-[22px] text-black leading-[2.5]">
            ایول
          </h6>

          <p className="text-center font-dana-regular text-xs text-black">
            جواب عالی دادی، غنچه بودی شکفتی :)
          </p>

          <div className="flex items-center border-[1px] border-[#f1f1f1] rounded-[5px] p-2 mt-4">
            <span className="font-dana-regular text-xs text-black leading-8 ml-auto">
              امتیاز این مرحله
            </span>
            <span className="font-dana-medium text-xl text-black ml-1 mt-[6px]">
              5
            </span>
            <img
              className="w-4 h-4 object-contain"
              src={StarIcon}
              alt="star icon"
            />
          </div>

          <Button
            type="primary"
            style="w-full mt-14"
            onClick={handleCloseSuccess}
          >
            اشتراک‌گذاری در صفحات اجتماعی
          </Button>
        </div>
      </Modal>

      {/* unsucess modal */}
      <Modal
        alignCenter
        isOpen={openUnsuccessModal}
        setIsOpen={setOpenUnSuccessModal}
      >
        <button
          className="absolute left-4 top-4 w-6 h-6"
          onClick={handleCloseUnsuccess}
        >
          <img src={CloseIcon} alt="close button" />
        </button>
        <div className="container px-6 pb-[27px] py-7">
          <div className="rounded-full overflow-hidden mx-auto w-52 h-52">
            <img
              className="w-full h-full object-cover"
              src={require("images/challenge/sad.webp")}
              alt="profile image"
            />
          </div>

          <h6 className="text-center font-dana-medium text-[22px] text-black leading-[2.5]">
            گند زدی که!
          </h6>

          <p className="text-center font-dana-regular text-xs text-black">
            حالا اشکالی نداره…
          </p>

          <div className="flex items-center border-[1px] border-[#f1f1f1] rounded-[5px] p-2 mt-4">
            <span className="font-dana-regular text-xs text-black leading-8 ml-auto">
              امتیاز این مرحله
            </span>
            <span className="font-dana-medium text-xl text-black ml-1 mt-[6px]">
              5
            </span>
            <img
              className="w-4 h-4 object-contain"
              src={StarIcon}
              alt="star icon"
            />
          </div>

          <div className="flex gap-x-2 mt-14">
            <Button
              type="secondary"
              style="w-24"
              onClick={handleCloseUnsuccess}
            >
              بعدا
            </Button>
            <Button
              type="primary"
              style="flex-[1]"
              onClick={handleCloseUnsuccess}
            >
              دوباره
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
