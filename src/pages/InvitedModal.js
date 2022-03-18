import React, { useState, useEffect, useRef } from "react";
import SimpleBottomSheet from "Components/SimpleBottomSheet";
import useWindowSize from "hooks/useWindowSize";
import { useNavigate } from "react-router-dom";
import Button from "Components/Button";
import Modal from "Components/Modal";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Fetch from "Helper/Fetch";
import {isAuth} from 'Helper/Auth'

export default function InvitedModal() {
  const [openInvteBottomSheet, setOpenInviteBottomSheet] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const location = useLocation();
  const windowSize = useWindowSize();
  const navigator = useNavigate();

  const teamID = useRef('');

  useEffect(() => {
    teamID.current = location.pathname.split('/')[2];
    sessionStorage.setItem('filimo:inviteteamID', teamID.current);
    if (isAuth()) {
      
    }
    else {
      navigator('/');

    }

    windowSize >= 1440
      ? setOpenInviteModal(true)
      : setOpenInviteBottomSheet(true);
  }, []);

  const hidePhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(phoneNumber.substr(4, 3), "***");
  };

  const handleAccept = async () => {
    const loginUrl = await Fetch({
      url: process.env.REACT_APP_API_URL+`/join-team/${teamID.current}/`,
      method: 'GET',
      redirect: 'follow'
    });
    if (!('ERROR' in loginUrl)) {
     toast.success('شما به تیم ملحق شدید.');
     sessionStorage.clear();
     navigator('/');

    }
    else {
      sessionStorage.clear();
    }
  };

  const handleReject = () => {
    sessionStorage.clear();
    toast.error('عضویت شما در تیم لغو شد.')
    navigator('/');

  };

  return (
    <main className="min-h-screen">
      <SimpleBottomSheet
        isOpen={openInvteBottomSheet}
        setIsOpen={setOpenInviteBottomSheet}
        backdropClose={false}
        style="bg-white"
      >
        <div className="container p-6 pt-4">
          <h2 className="text-base text-[#1d1d1d] font-dana-regular text-right">
            شما به تیم دعوت شدید.
            {/* ورود به تیم «اژدهای قرمز - ۶۷۸» */}
          </h2>

          <div className="flex justify-center mt-[100px]">
            <figure className="w-[156px] h-[156px]">
              <img
                className="w-full h-full object-contain"
                src={require("images/common/flags/41.png")}
                alt="team flag"
              />
            </figure>
          </div>

          <p className="text-sm text-[#4d4d4d] font-dana-regular leading-[1.79] mt-[73px]">
            {/* دوست شما با شماره{" "}
            <span dir="ltr">{hidePhoneNumber("09158569874")}</span> <br />
            شما را به تیم خود دعوت کرده است. <br />
            می‌توانید وارد شوید */}
            دوست شما را به تیم خود دعوت کرده است.<br/>
            میتوانید وارد شوید.
          </p>

          <div className="flex flex-col gap-y-2 mt-6">
            <Button type="primary" style="w-full" onClick={handleAccept}>
              پذیرفتن 
            </Button>
            <Button type="secondary" style="w-full" onClick={handleReject}>
              رد کردن
            </Button>
          </div>
        </div>
      </SimpleBottomSheet>

      <Modal
        alignCenter
        isOpen={openInviteModal}
        setIsOpen={setOpenInviteModal}
        backdropClose={false}
      >
        <div className="container p-6 pt-4">
          <h2 className="text-base text-[#1d1d1d] font-dana-regular text-right">
          شما به تیم دعوت شدید.
            {/* ورود به تیم «اژدهای قرمز - ۶۷۸» */}
          </h2>

          <div className="flex justify-center mt-[100px]">
            <figure className="w-[156px] h-[156px]">
              <img
                className="w-full h-full object-contain"
                src={require("images/common/flags/41.png")}
                alt="team flag"
              />
            </figure>
          </div>

         
          <p className="text-sm text-[#4d4d4d] font-dana-regular leading-[1.79] mt-[73px]">
            {/* دوست شما با شماره{" "}
            <span dir="ltr">{hidePhoneNumber("09158569874")}</span> <br />
            شما را به تیم خود دعوت کرده است. <br />
            می‌توانید وارد شوید */}
            دوستتون شما را به تیم خود دعوت کرده است.<br/>
            میتوانید وارد شوید.
          </p>

          <div className="flex flex-col gap-y-2 mt-6">
            <Button type="primary" style="w-full" onClick={handleAccept}>
            پذیرفتن
            </Button>
            <Button type="secondary" style="w-full" onClick={handleReject}>
              رد کردن
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
