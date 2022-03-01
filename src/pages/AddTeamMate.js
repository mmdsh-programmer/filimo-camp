import { React, useState } from "react";
import SimpleBottomSheet from "components/SimpleBottomSheet";
import TextField from "components/TextField";
import Back from "components/Back";
import Button from "components/Button";
import EnvelopeIcon from "icons/add-teammate/envelope.svg";
import AddTeamMateIcon from "icons/add-teammate/add-teammate.svg";
import useWindowSize from "hooks/useWindowSize";
import Modal from "components/Modal";
import { motion } from "framer-motion";

export default function AddTeamMate() {
  const windowSize = useWindowSize();
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleBottomSheetOpen = () => {
    setOpenBottomSheet(true);
  };

  const handleBottomSheetClose = () => {
    setOpenBottomSheet(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Back>ایجاد تیم</Back>
      <section className="overflow-y-auto">
        <div className="container px-4">
          <div className="flex flex-col">
            {/* use this when all items are empty */}

            {/* <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center mb-24 2xl:mt-14 2xl:min-h-fit 2xl:mb-60">
              <img
                className="w-44 h-44 object-contain"
                src={AddTeamMateIcon}
                alt="add teammate"
              />

              <p className="text-sm text-white font-dana-regular leading-8 text-center mt-4">
                هیچکس در تیم تو نیست! <br />
                دوستان خود را به تیم بیافزایید
              </p>
            </div> */}

            <dl className="list-none flex flex-col gap-y-2 mt-4 2xl:mt-4">
              <dt className="font-dana-regular text-sm text-[#3f8dcd] leading-8">
                هم تیمی ها
              </dt>

              {[...Array(4)].map((e, i) => (
                <dd
                  key={i}
                  className="p-2 flex items-center rounded-[10px] relative overflow-hidden bg-[rgba(255,255,255,0.1)]"
                >
                  <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white ml-2">
                    <img
                      className="w-full h-full object-cover"
                      src={require("images/home/board-avatar.webp")}
                      alt="team-logo"
                    />
                  </div>

                  <span className="text-base text-white text-right font-dana-medium ml-auto leading-[1.81] block mt-1">
                    09123457689
                  </span>

                  <span className="text-xs text-white font-dana-regular mt-1 text-opacity-80">
                    در تیم قرار گرفت
                  </span>
                </dd>
              ))}
            </dl>

            <dl className="list-none flex flex-col gap-y-2 mt-6">
              <dt className="font-dana-regular text-sm text-[#3f8dcd] leading-8">
                دوستان دعوت شده
              </dt>

              {[...Array(3)].map((e, i) => (
                <dd
                  key={i}
                  className="p-2 flex items-center rounded-[10px] relative overflow-hidden bg-[rgba(255,255,255,0.1)]"
                >
                  <span className="text-base text-white text-right font-dana-medium ml-auto leading-[1.81] block mt-1">
                    09123457689
                  </span>

                  <span className="text-xs text-white font-dana-regular ml-2 mt-1 text-opacity-80">
                    پیام ارسال شده
                  </span>

                  <img
                    className="w-6 h-6 object-contain"
                    src={EnvelopeIcon}
                    alt="envelope icon"
                  />
                </dd>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="fixed bottom-0 left-0 right-0 2xl:relative 2xl:mt-4">
        <div className="container px-4 pb-6">
          <Button
            type="primary"
            onClick={windowSize > 768 ? handleModalOpen : handleBottomSheetOpen}
          >
            افزودن به تیم
          </Button>
        </div>
      </section>

      <SimpleBottomSheet
        isOpen={openBottomSheet}
        setIsOpen={setOpenBottomSheet}
        style="bg-white"
      >
        <div className="container px-6 py-4">
          <h2 className="text-right text-base mb-6 font-dana-regular text-[#1d1d1d]">
            افزودن به ترکیب تیم
          </h2>

          <TextField type="text" name="phone" placeholder=" " label="موبایل" />

          <p className="mt-2 text-xs font-dana-regular leading-6">
            شماره هم‌تیمی خود را وارد کنید تا لینک از طریق sms برای او ارسال
            شود.
          </p>

          <div className="flex items-center bg-[#ddd] rounded-[10px] bg-opacity-30 mt-4 p-[3px]">
            <span className="block font-dana-regular text-[#4c4c4c] text-xs leading-[1.8] ml-auto mr-2 mt-1">
              camp.filimo.com/eyd1400/team
            </span>

            <button className="font-dana-medium text-sm text-[#f78e32] py-3 px-2 bg-white rounded-[10px]">
              کپی لینک
            </button>
          </div>

          <Button type="primary" style="mt-4">
            ارسال پیامک
          </Button>
        </div>
      </SimpleBottomSheet>

      <Modal
        alignCenter
        width={360}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      >
        <div className="container px-6 py-4">
          <h2 className="text-right text-base mb-6 font-dana-regular text-[#1d1d1d]">
            افزودن به ترکیب تیم
          </h2>

          <TextField type="text" name="phone" placeholder=" " label="موبایل" />

          <p className="mt-2 text-xs font-dana-regular leading-6">
            شماره هم‌تیمی خود را وارد کنید تا لینک از طریق sms برای او ارسال
            شود.
          </p>

          <div className="flex items-center bg-[#ddd] rounded-[10px] bg-opacity-30 mt-4 p-[3px]">
            <span className="block font-dana-regular text-[#4c4c4c] text-xs leading-[1.8] ml-auto mr-2 mt-1">
              camp.filimo.com/eyd1400/team
            </span>

            <button className="font-dana-medium text-sm text-[#f78e32] py-3 px-2 bg-white rounded-[10px]">
              کپی لینک
            </button>
          </div>

          <Button type="primary" style="mt-4">
            ارسال پیامک
          </Button>
        </div>
      </Modal>
    </motion.main>
  );
}
