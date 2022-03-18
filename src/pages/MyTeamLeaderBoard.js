import React, { useState, useEffect } from "react";
import Modal from "Components/Modal";
import AddIcon from "icons/team/add.svg";
import Back from "Components/Back";
import Button from "Components/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "react-query";
import { userData } from "Helper/helperFunc";
import { FindAvatarAdd } from "Helper/avatars";
import Fetch from "Helper/Fetch";
import { toast } from "react-toastify";

export default function MyTeamLeaderBoard() {
  const [openModal, setOpenModal] = useState(false);
  const [acceptOpenModal, setacceptOpenModal] = useState(false);
  const [acceptUserRemoverOpenModal, setacceptUserRemoverOpenModal] = useState(false);
  let navigate = useNavigate();
  const { isLoading, data } = useQuery("get-team", userData);

  const queryClient = useQueryClient();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const hidePhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(phoneNumber.substr(7, 3), "***");
  };

  const isNullObject = (object) => {
    return Object.keys(object).length === 0;
  };
  const removeUserReq = async (userId) => {
    const raw = {
      user_id: userId,
    };

    const remove = await Fetch({
      url: "http://37.152.185.94:8001/user/remove-member/",
      method: "POST",
      data: JSON.stringify(raw),
      redirect: "follow",
    });

    if (!("ERROR" in remove)) {
      toast.success("کاربر با موفقیت از تیم حذف شد");
      queryClient.invalidateQueries("get-team");
    }
  };
  const removeUser = async (userId) => {
    setacceptUserRemoverOpenModal(true);
    // removeUserReq(userId);
  }
  const leaveTeamReq = async () => {
    const leave = await Fetch({
      url: "http://37.152.185.94:8001/user/leave-team/",
      method: "GET",
      redirect: "follow",
    });

    if (!("ERROR" in leave)) {
      toast.success("شما با موفقیت از تیم خارج شدید");
      navigate("/leader-board/teams/create");
    }
  }

  const leaveTeam = async () => {
    setacceptOpenModal(true);

  };

  if (isLoading) {
    return null;
  }

  if (!isLoading) {
    if (Object.keys(data[1]).length === 0) {
      navigate("/leader-board/teams/create");
    }
  }

  return (
    <>
      <Modal alignCenter isOpen={acceptUserRemoverOpenModal} setIsOpen={setacceptUserRemoverOpenModal}>
        <div className="container p-8" >
          <p className="text-base text-black font-dana-regular ">آیا میخواهید از تیم خارج حذف کنید؟</p>
          <div className="flex gap-x-2 mt-8">
            <Button type="primary" onClick={leaveTeamReq}>بله</Button>
            <Button type="secondary" onClick={() => { setacceptUserRemoverOpenModal(false) }}>خیر  </Button>
          </div>

        </div>
      </Modal>
      <Modal alignCenter isOpen={acceptOpenModal} setIsOpen={setacceptOpenModal}>
        <div className="container p-8" >
          <p className="text-base text-black font-dana-regular ">آیا میخواهید از تیم خارج شوید؟</p>
          <div className="flex gap-x-2 mt-8">
            <Button type="primary" onClick={leaveTeamReq}>بله</Button>
            <Button type="secondary" onClick={() => { setacceptOpenModal(false) }}>خیر  </Button>
          </div>

        </div>
      </Modal>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <Back>جدول امتیازات</Back>

        <section className="mt-6 2xl:mt-0">
          <div className="container px-4">
            <h2 className="text-base text-white font-dana-regular">
              مجموع امتیازات تیم
            </h2>

            <span className="text-4xl text-white font-dana-medium mt-2 block">
              {data[1]?.total_score}
            </span>
          </div>
        </section>

        <section className="my-6 mb-[100px] 2xl:mb-4">
          <div className="container px-4">
            <ul className="list-none flex flex-col gap-y-2 mt-4">
              {!isNullObject(data[1]) &&
                data[1]?.members?.map((member, index) => (
                  <li
                    className="p-2 flex items-center rounded-[10px] bg-[#f9f9f9] bg-opacity-10 relative cursor-pointer"
                    key={member.id}
                  >
                    <span className="text-sm text-white font-dana-regular ml-[6px] block mt-1">
                      {index + 1}
                      {console.log(member)}
                    </span>

                    <div className="ml-3">
                      <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                        <img
                          className="w-full h-full object-cover"
                          src={
                            member.avatar_code
                              ? require(`images/common/avatars/${FindAvatarAdd(
                                +member.avatar_code
                              )}`)
                              : require("images/home/board-avatar.webp")
                          }
                          alt="team-logo"
                        />
                      </div>
                    </div>

                    <span
                      className="text-base text-white text-right font-dana-regular ml-auto mt-1"
                      dir="ltr"
                    >
                      {hidePhoneNumber(
                        member?.mobile ? String(member.mobile) : "--"
                      )}
                    </span>

                    <span className="text-sm text-white font-dana-regular mt-1 ml-4">
                      {member?.total_score}
                    </span>


                    {
                      data[0].id === member.id && !data[0].is_team_head ? (
                        <button
                          className="text-sm font-dana-medium text-[#cc304b] leading-8"
                          onClick={() => leaveTeam(member.id)}
                        >
                          خروج از تیم
                        </button>
                      ) :
                        (
                          data[0].is_team_head && data[0].id !== member.id ? (
                            <button
                              className="text-sm font-dana-medium text-[#cc304b] leading-8"
                              onClick={() => removeUser(member.id)}
                            >
                              حذف از تیم
                            </button>
                          ) : null
                        )
                    }
                    {/* {data[0].is_team_head && data[0].id !== member.id ? (

                    ): (
                        data[0].id === member.id && (
                    <button
                      className="text-sm font-dana-medium text-[#cc304b] leading-8"
                      onClick={() => leaveTeam(member.id)}
                    >
                      خروج از تیم
                    </button>
                    )
                    )} */}
                  </li>
                ))}
            </ul>
          </div>
        </section>

        {data[0].is_team_head && (
          <section className="fixed bottom-0 left-0 w-full 2xl:relative">
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
                    می‌توانید تا {(5 - (data[1]?.members.length))} نفر اضافه کنید
                  </span>

                  <span className="text-sm font-dana-regular block mt-1">
                    افزودن
                  </span>
                </div>
              </Button>
            </div>
          </section>
        )}

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
      </motion.main></>
  );
}
