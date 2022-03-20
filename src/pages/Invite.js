import { React, useState, useEffect } from "react";
import SimpleBottomSheet from "Components/SimpleBottomSheet";
import TextField from "Components/TextField";
import Back from "Components/Back";
import Button from "Components/Button";
import useWindowSize from "hooks/useWindowSize";
import Modal from "Components/Modal";
import { motion } from "framer-motion";
import AddTeamMateIcon from "icons/add-teammate/add-teammate.svg";
import { userData } from "Helper/helperFunc";
import Fetch from "Helper/Fetch";
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Invite() {
  const PUBLIC_URL = 'https://filimo.com/nowruz';
  const windowSize = useWindowSize();
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [yourScore, setYourScore] = useState(0);

  const handleBottomSheetOpen = () => {
    setOpenBottomSheet(true);
  };

  const handleBottomSheetClose = () => {
    setOpenBottomSheet(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
    setIsCopied(false)
  };

  useEffect(() => {
    getUserData();
    getUserScore();
  }, []);

  const getUserData = async () => {
    const userInfo = await userData();
    setUserInfo(userInfo);

  };

  const getUserScore = async () => {
    const getScore = await Fetch({
      url: process.env.REACT_APP_API_URL + "/user_scores/",
      method: "GET",
      redirect: "follow",
    });

    if (!("ERROR" in getScore)) {
      // setYourScore()
      const {
        data: { data: finalData },
      } = getScore;
      setYourScore(finalData?.referral_score);
    } else {
    }
  };

  const copyToClipBoard = () => {
    setIsCopied(true);

    navigator.clipboard.writeText(`${PUBLIC_URL + '/register/?refCode=' + userInfo[0]?.unique_code}`);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Back style="mb-6">معرفی دوستان</Back>
      <section className=" 2xl:h-fit">
        <div className="container px-4">
          <div className="flex flex-col">
            {/* use this when all items are empty */}

            {/* <div className="flex flex-col self-center items-center justify-center 2xl:mt-14 2xl:min-h-fit 2xl:mb-60 mt-11 landscape:mt-6">
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

            {/* <div className="max-h-[calc(100vh-290px)]">
              <dl className="list-none flex flex-col gap-y-2 mt-4 2xl:mt-0">
                <dt className="font-dana-regular text-sm text-[#aa59c0]">
                  معرفی شده‌های فعال
                </dt>
                <dd className="p-2 flex items-center rounded-[10px] relative overflow-hidden">
                  <div className="opacity-10 bg-[#f9f9f9] absolute left-0 top-0 -z-1 w-full h-full"></div>
                  <span className="text-base text-white text-right font-dana-medium ml-6 leading-[1.81] block mt-1">
                    09123457689
                  </span>

                  <span className="text-xs text-white font-dana-regular ml-auto mt-1">
                    به مسابقه وارد شد
                  </span>

                  <span className="flex font-dana-regular text-white items-center mt-1">
                    <span className="text-[10px] ml-[6px]">امتیاز</span>
                    <span className="text-sm">5+</span>
                  </span>
                </dd>
                <dd className="p-2 flex items-center rounded-[10px] relative overflow-hidden">
                  <div className="opacity-10 bg-[#f9f9f9] absolute left-0 top-0 -z-1 w-full h-full"></div>
                  <span className="text-base text-white text-right font-dana-medium ml-6 leading-[1.81] block mt-1">
                    09123457689
                  </span>

                  <span className="text-xs text-white font-dana-regular ml-auto mt-1">
                    به مسابقه وارد شد
                  </span>

                  <span className="flex font-dana-regular text-white items-center mt-1">
                    <span className="text-[10px] ml-[6px]">امتیاز</span>
                    <span className="text-sm">5+</span>
                  </span>
                </dd>
                <dd className="p-2 flex items-center rounded-[10px] relative overflow-hidden">
                  <div className="opacity-10 bg-[#f9f9f9] absolute left-0 top-0 -z-1 w-full h-full"></div>
                  <span className="text-base text-white text-right font-dana-medium ml-6 leading-[1.81] block mt-1">
                    09123457689
                  </span>

                  <span className="text-xs text-white font-dana-regular ml-auto mt-1">
                    به مسابقه وارد شد
                  </span>

                  <span className="flex font-dana-regular text-white items-center mt-1">
                    <span className="text-[10px] ml-[6px]">امتیاز</span>
                    <span className="text-sm">5+</span>
                  </span>
                </dd>
              </dl>

              <dl className="list-none flex flex-col gap-y-2 mt-4">
                <dt className="font-dana-regular text-sm text-[#aa59c0]">
                  دوستان دعوت شده
                </dt>
                <dd className="p-2 flex items-center rounded-[10px] relative overflow-hidden">
                  <div className="opacity-10 bg-[#f9f9f9] absolute left-0 top-0 -z-1 w-full h-full"></div>
                  <span className="text-base text-white text-right font-dana-medium ml-6 leading-[1.81] block mt-1">
                    09123457689
                  </span>

                  <span className="text-xs text-white font-dana-regular ml-auto mt-1">
                    ثبت نام انجام شد
                  </span>

                  <span className="text-white mt-1">-</span>
                </dd>
                <dd className="p-2 flex items-center rounded-[10px] relative overflow-hidden">
                  <div className="opacity-10 bg-[#f9f9f9] absolute left-0 top-0 -z-1 w-full h-full"></div>
                  <span className="text-base text-white text-right font-dana-medium ml-6 leading-[1.81] block mt-1">
                    09123457689
                  </span>

                  <span className="text-xs text-white font-dana-regular ml-auto mt-1">
                    ثبت نام انجام شد
                  </span>

                  <span className="text-white mt-1">-</span>
                </dd>
              </dl>
            </div> */}

            <h2 className="text-2xl font-dana-demibold text-white mt-4 text-center">
              امتیاز شما از دعوت <br />
              <span className="font-dana-demibold text-5xl mt-9 block">
                {yourScore}
              </span>
            </h2>
          </div>
        </div>
      </section>

      <section className="fixed bottom-0 left-0 right-0">
        <div className="container px-4 pb-6">
          <div className="p-4 my-4 border-[1px] border-opacity-10 border-white rounded-[10px] bg-white bg-opacity-5">
            <p className="text-sm text-white font-dana-regular text-opacity-50 leading-[2.07]">
              شما می‌توانید دوستان خود را به کمپین معرفی کنید و برای معرفی هر
              دوست وارد شده به کمپین ۵ امتیاز دریافت کنید.
            </p>
          </div>

          <Button
            type="primary"
            onClick={windowSize > 768 ? handleModalOpen : handleBottomSheetOpen}
          >
            معرفی به دوستان
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
            دعوت از دوستان
          </h2>

          <p className="leading-[2] text-[#4c4c4c] mt-2 text-xs font-dana-regular">
            به ازای هر یک از دوستان که اولین بازی را انجام دهند ۵ امتیاز برای
            شما ثبت می‌شود.
          </p>

          <div className="flex items-center bg-[#ddd] rounded-[10px] bg-opacity-30 mt-4 p-[3px] justify-center">
            <span className="block font-dana-regular text-[#4c4c4c] text-xs leading-[1.8] ml-2 mr-2 mt-1 text-center overflow-hidden">
              {PUBLIC_URL + '/register/?refCode=' + userInfo[0]?.unique_code}
            </span>
          </div>
          <CopyToClipboard text= {PUBLIC_URL + '/register/?refCode=' + userInfo[0]?.unique_code}
            onCopy={() => setIsCopied(true)}>

            <Button type="primary" style="mt-4">
              {isCopied ? "کپی شد" : "کپی کد "}
            </Button>
          </CopyToClipboard>

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
            دعوت از دوستان
          </h2>

          <p className="leading-[2] text-[#4c4c4c] mt-2 text-xs font-dana-regular">
            به ازای هر یک از دوستان که اولین بازی را انجام دهند ۵ امتیاز برای
            شما ثبت می‌شود.
          </p>

          <div className="flex items-center bg-[#ddd] rounded-[10px] bg-opacity-30 mt-4 p-[3px] justify-center">
            <span className="block font-dana-regular text-[#4c4c4c] text-xs leading-[1.8] ml-2 mr-2 mt-1 text-center overflow-hidden">
              {PUBLIC_URL + '/register/?refCode=' + userInfo[0]?.unique_code}

            </span>
          </div>

          <CopyToClipboard text= {PUBLIC_URL + '/register/?refCode=' + userInfo[0]?.unique_code}
            onCopy={() => setIsCopied(true)}>

            <Button type="primary" style="mt-4">
              {isCopied ? "کپی شد" : "کپی کد "}
            </Button>
          </CopyToClipboard>
        </div>
      </Modal>
    </motion.main>
  );
}
