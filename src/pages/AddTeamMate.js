import { React, useState, useEffect, useRef } from "react";
import SimpleBottomSheet from "Components/SimpleBottomSheet";
import TextField from "Components/TextField";
import Back from "Components/Back";
import Button from "Components/Button";
import EnvelopeIcon from "icons/add-teammate/envelope.svg";
import AddTeamMateIcon from "icons/add-teammate/add-teammate.svg";
import useWindowSize from "hooks/useWindowSize";
import Modal from "Components/Modal";
import { motion } from "framer-motion";
import { userData } from "Helper/helperFunc";
import { useNavigate } from "react-router-dom";
import { FindFlagAdd } from "Helper/flags";
import { FindAvatarAdd } from "Helper/avatars";
import Fetch from "Helper/Fetch";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "react-query";
import { CopyToClipboard } from 'react-copy-to-clipboard';


const getInvitedData = async () => {
  const result = await Fetch({
    url: process.env.REACT_APP_API_URL + "/join-to-team-request/",
    method: "GET",
  });

  if (!("ERROR" in result)) {
    const { data } = result;
    return data.data;
  }

  return false;
};

export default function AddTeamMate() {
  const PUBLIC_URL = 'https://filimo.com/Nowruz';
  const windowSize = useWindowSize();
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [teamImage, setTeamImage] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  let addteaminvited = useRef('');
  const queryClient = useQueryClient();

  const navigation = useNavigate();
  const { isLoading: isGetTeamLoading, data: getTeamData } = useQuery(
    "get-team",
    userData
  );
  const { isLoading: isGetInvitedLoading, data: invitedData } = useQuery(
    "get-invited",
    getInvitedData
  );

  const handleBottomSheetOpen = () => {
    setOpenBottomSheet(true);
  };

  const handleBottomSheetClose = () => {
    setOpenBottomSheet(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const checkPhoneNumber = (phoneNumber) => {
    return !!phoneNumber?.match("^(\\+98|0)?9\\d{9}$");
  };

  const handlePhoneNumberChange = ({ target: { value: inputValue } }) => {
    setPhoneNumber(inputValue);
  };

  const isNullObject = (object) => {
    return Object.keys(object).length === 0;
  };

  const hidePhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(phoneNumber.substr(7, 3), "***");
  };

  const inviteMember = async (phoneNumber) => {
    const raw = JSON.stringify({
      mobile: phoneNumber.replace(phoneNumber.charAt(0), 98),
    });

    const teamReq = await Fetch({
      url: process.env.REACT_APP_API_URL + "/join-to-team-request/",
      method: "POST",
      data: raw,
    });

    if (!("ERROR" in teamReq)) {
      toast.success("پیامک با موفقیت ارسال شد");
      queryClient.invalidateQueries("get-invited");
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    setLoading(false);
    setOpenModal(false);
    setIsCopied(false);
    // if (!checkPhoneNumber(phoneNumber)) {
    //   setHasError(true);
    //   setErrorMessage("شماره همراه صحیح نمیباشد");
    // } else {
    //   setHasError(false);
    //   setErrorMessage(null);
    // setLoading(true);
    //   inviteMember(phoneNumber);
    // }
  };

  const copyToClipBoard = () => {
    setIsCopied(true);


    navigator.clipboard.writeText(`${addteaminvited.current}`);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };



  const leaveTeam = async () => {
    const leave = await Fetch({
      url: process.env.REACT_APP_API_URL + "/leave-team/",
      method: "GET",
      redirect: "follow",
    });

    if (!("ERROR" in leave)) {
      toast.success("شما با موفقیت از تیم خارج شدید");
      navigation("/");
    }
  };

  if (isGetTeamLoading || isGetInvitedLoading) {
    return null;
  }

  if (!isGetTeamLoading && !isGetInvitedLoading) {
    if (isNullObject(getTeamData[1])) {
      navigation("/leader-board/teams/create");
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {addteaminvited.current = `سلام دوست عزیزم. ازت دعوت میکنم به تیم من بپیوندی. ${PUBLIC_URL}/join-team/${getTeamData[0]?.id}`}
      <Back>ایجاد تیم</Back>

      <section className="mt-4">
        <div className="container px-4">
          <div className="flex">
            <figure className="w-[72px] h-[72px] overflow-hidden">
              <img
                className="w-full h-full object-contain shadow-[0_4px_6px_0_rgba(0,0,0,0.27)]"
                src={
                  !isNullObject(getTeamData[1])
                    ? require(`images/common/flags/${FindFlagAdd(
                      +getTeamData[1]?.avator_code
                    )}`)
                    : require(`images/common/flags/41.png`)
                }
                alt="team"
              />

            </figure>

            <div className="mr-4 flex flex-col justify-center">
              <h2 className="text-[18px] text-white font-dana-demibold">
                تیم «{getTeamData[1]?.name}»
              </h2>
              <span className="text-sm text-white opacity-60 font-dana-regular mt-4 block">
                مجموع امتیاز : {getTeamData[1]?.total_score}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-y-auto">
        <div className="container px-4">
          <div className="flex flex-col landscape:mb-4">
            {/* use this when all items are empty */}

            {/* <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center mb-24 2xl:mt-14 2xl:min-h-fit 2xl:mb-60 landscape:mt-6">
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

            <div className="max-h-[calc(100vh-124px)] landscape:max-h-max">
              <dl className="list-none flex flex-col gap-y-2 mt-4 2xl:mt-4">
                <dt className="font-dana-regular text-sm text-[#3f8dcd] leading-8">
                  هم تیمی ها

                </dt>

                {!isNullObject(getTeamData[1]) &&
                  getTeamData[1]?.members?.map((member) => (
                    <dd
                      key={member.id}
                      className="p-2 flex items-center rounded-[10px] relative overflow-hidden bg-[rgba(255,255,255,0.1)]"
                    >
                      <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white ml-2">
                        <img
                          className="w-full h-full object-cover"
                          src={
                            member?.avatar_code
                              ? require(`images/common/avatars/${FindAvatarAdd(
                                +member.avatar_code
                              )}`)
                              : require("images/home/board-avatar.webp")
                          }
                          alt="team-logo"
                        />
                      </div>

                      <span className="text-base text-white text-right font-dana-medium ml-auto leading-[1.81] block mt-1">
                        {member?.mobile
                          ? hidePhoneNumber(String(member?.mobile))
                          : "--"}
                      </span>

                      <span className="text-xs text-white font-dana-regular mt-1 text-opacity-80">
                        امتیاز : {member.total_score}
                      </span>
                    </dd>
                  ))}
              </dl>

              {invitedData.length ? (
                <dl className="list-none flex flex-col gap-y-2 mt-6">
                  <dt className="font-dana-regular text-sm text-[#3f8dcd] leading-8">
                    دوستان دعوت شده
                  </dt>

                  {invitedData?.map((user, i) => (
                    <dd
                      key={user.mobile}
                      className="p-2 flex items-center rounded-[10px] relative overflow-hidden bg-[rgba(255,255,255,0.1)]"
                    >
                      <span
                        className="text-base text-white text-right font-dana-medium ml-auto leading-[1.81] block mt-1"
                        dir="ltr"
                      >
                        {user?.mobile
                          ? hidePhoneNumber(String(user?.mobile))
                          : "--"}
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
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="fixed bottom-0 left-0 right-0 2xl:relative 2xl:mt-4 landscape:relative">
        <div className="container px-4 pb-6">
          {getTeamData[0].is_team_head ? (
            <Button
              type="primary"
              onClick={
                windowSize > 768 ? handleModalOpen : handleBottomSheetOpen
              }
            >
              افزودن به تیم
            </Button>
          ) : (
            <Button type="secondary" onClick={leaveTeam}>
              خروج از تیم
            </Button>
          )}
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

          {/* <TextField
            type="number"
            maxLength={11}
            name="phone"
            placeholder=" "
            label="موبایل"
            onChange={handlePhoneNumberChange}
            value={phoneNumber.current}
            hasError={hasError}
            helperText={errorMessage}
          /> */}

          <p className="mt-2 text-xs font-dana-regular leading-6">
            لینک زیر را کپی کنید و به از دوستانتان بخواهید به تیمتان بپیوندند.

          </p>

          <div className="flex items-center bg-[#ddd] rounded-[10px] bg-opacity-30 mt-4 p-[3px]">
            <span className="block font-dana-regular text-[#4c4c4c] text-xs leading-[1.8] ml-auto mr-2 mt-1 max-w-[215px] overflow-hidden">
              {` ${PUBLIC_URL}/join-team/${getTeamData[0]?.id}`}
            </span>

            <CopyToClipboard text={addteaminvited.current}
              onCopy={() => setIsCopied(true)}>

              <button
                className="font-dana-medium text-sm text-[#f78e32] py-3 px-2 bg-white rounded-[10px]"
               
              >
                {isCopied ? "کپی شد" : "کپی کد "}
              </button>
            </CopyToClipboard>

          </div>

          <Button
            type="primary"
            style="mt-4"
            onClick={handleSubmit}
            disabled={loading}
            loading={loading}
          >
            متوجه شدم
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

          {/* <TextField
            type="number"
            maxLength={11}
            name="phone"
            placeholder=" "
            label="موبایل"
            onChange={handlePhoneNumberChange}
            value={phoneNumber.current}
            hasError={hasError}
            helperText={errorMessage}
          /> */}

          <p className="mt-2 text-xs font-dana-regular leading-6">
            لینک زیر را کپی کنید و به از دوستانتان بخواهید به تیمتان بپیوندند.

          </p>

          <div className="flex items-center bg-[#ddd] rounded-[10px] bg-opacity-30 mt-4 p-[3px]">
            <span className="block font-dana-regular text-[#4c4c4c] text-xs leading-[1.8] ml-auto mr-2 mt-1 max-w-[215px] overflow-hidden">
              {` ${PUBLIC_URL}/join-team/${getTeamData[0]?.id}`}
            </span>

            <CopyToClipboard text={addteaminvited.current}
              onCopy={() => setIsCopied(true)}>

              <button
                className="font-dana-medium text-sm text-[#f78e32] py-3 px-2 bg-white rounded-[10px]"
               
              >
                {isCopied ? "کپی شد" : "کپی کد "}
              </button>
            </CopyToClipboard>
          </div>

          <Button
            type="primary"
            style="mt-4"
            onClick={handleSubmit}
            disabled={loading}
            loading={loading}
          >
            متوجه شدم
          </Button>
        </div>
      </Modal>
    </motion.main>
  );
}
