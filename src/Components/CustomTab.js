import { useEffect, useState, useRef } from "react";
import { Tab } from "@headlessui/react";
import TransparentStarIcon from "icons/home/transparent-star.svg";
import BlueStarIcon from "icons/home/blue-star.svg";
import { Link } from "react-router-dom";
import TransparentAddUserIcon from "icons/home/transparent-add-user-icon.svg";
import BlueAddUserIcon from "icons/home/blue-add-user-icon.svg";
import Fetch from "../Helper/Fetch";
import { FindFlagAdd } from "Helper/flags";
import { avatars, FindAvatarAdd } from "Helper/avatars";
import { userData } from 'Helper/helperFunc'
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CustomTab() {
  const [userLeaderBoardData, setuserLeaderBoardData] = useState([]);
  const [teamLeaderBoardData, setteamLeaderBoardData] = useState([]);
  const [userReferralLeaderBoardData, setuserReferralLeaderBoardData] = useState([]);
  let user_referral_rank = useRef();
  let user_rank = useRef();
  let team_rank = useRef()

  let userFilimoID;
  let teamID;
  const userLeaderBoard = async () => {
    const userLeaderBoardUrl = await Fetch({
      url: 'http://37.152.185.94:8001/user/user-leader-board/',
      method: 'GET',

    });

    if (!('ERROR' in userLeaderBoardUrl)) {


      setuserLeaderBoardData(userLeaderBoardUrl?.data.data.board);

      user_rank.current = userLeaderBoardUrl?.data.data.user_rank;

      debugger
    } else {

    }
  }
  const teamLeaderBoard = async () => {
    const teamLeaderBoardUrl = await Fetch({
      url: 'http://37.152.185.94:8001/user/team-leader-board/',
      method: 'GET',

    });

    if (!('ERROR' in teamLeaderBoardUrl)) {

      setteamLeaderBoardData(teamLeaderBoardUrl?.data.data.board)
      team_rank.current = teamLeaderBoardUrl?.data.data.team_rank;

    } else {

    }
  }
  const userReferralLeaderBoard = async () => {
    const userReferralLeaderBoardURL = await Fetch({
      url: 'http://37.152.185.94:8001/user/user-referral-leader-board/',
      method: 'GET',

    });

    if (!('ERROR' in userReferralLeaderBoardURL)) {

      setuserReferralLeaderBoardData(userReferralLeaderBoardURL?.data.data.board);
      user_referral_rank.current = userReferralLeaderBoardURL?.data.data.user_referral_rank;


    } else {

    }
  }
  const funcreqHandler = () => {
    userLeaderBoard();
    teamLeaderBoard();
    userReferralLeaderBoard();
  }
  useEffect(async () => {
    funcreqHandler();
    let result = await userData();
    let userFilimoID = result[0].filimo_id;
    let teamID = result[1].id;
  }, [])
  const tabList = ["امتیازات فردی", "امتیازات تیمی", "امتیاز از دعوت"];

  const hidePhoneNumber = (phoneNumber) => {
    if (phoneNumber === "null") {
      return '---'
    }
    else
      return phoneNumber.replace(phoneNumber.substr(4, 3), "***");
  };

  const handleTabChange = (e) => {
    console.log(e);


  };

  return (
    <div className="w-full">
      <Tab.Group onChange={handleTabChange}>
        <Tab.List className="flex p-1 bg-[#ddd] rounded-[10px]">
          {tabList.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full p-2 text-[13px] leading-7 font-dana-regular rounded-[10px]",
                  "focus:outline-none",
                  selected ? "bg-white" : "text-[#7c7c7c]"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className={classNames("bg-white")}>
            <ul className="list-none flex flex-col gap-y-2 mt-4">
              {userLeaderBoardData.map((e, i) => {
                // console.log(userLeaderBoardData.current);
                debugger;
                if (i + 1 === user_rank.current) {
                  return (
                    <li>
                      {!(user_rank.current === 1) ? (<div className="w-full h-full flex flex-col px-[22px]">
                        <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                        <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                        <span className="w-1 h-1 opacity-40 bg-[#333] mb-2 rounded-full"></span>
                      </div>) : null}
                      <Link
                        to={`/leader-board/$
                      "individual"
                     `}
                        className="flex items-center p-2 rounded-[10px] bg-[#acffd2] relative you"
                      >
                        <div className="ml-2">
                          <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                            <img
                              className="w-full h-full object-cover"
                              src={e.avatar_code ? require(`images/common/avatars/${FindAvatarAdd(parseInt(e.avatar_code))}`) : require(`images/common/avatars/${FindAvatarAdd(217)}`)}

                              alt="team-logo"
                            />
                          </div>
                        </div>

                        <span className="text-base text-[#170d53] font-semibold text-right font-dana-regular ml-auto mt-1">
                          شما
                        </span>

                        <span className="text-sm text-[#170d53] font-semibold font-dana-regular ml-2 mt-1">
                          {e.total_score}
                        </span>

                        <img
                          src={BlueStarIcon}
                          className="w-4 h-4 object-contain"
                          alt="star logo"
                        />
                      </Link>
                      {!(user_rank.current >= 10) ? (<div className="w-full h-full flex flex-col px-[22px]">
                        <span className="w-1 h-1 opacity-40 bg-[#333] mt-2 mb-[3px] rounded-full"></span>
                        <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                        <span className="w-1 h-1 opacity-40 bg-[#333] rounded-full"></span>
                      </div>) : null
                      }
                      {/* } */}

                    </li>

                  )
                } else {
                  return (
                    <li
                      key={i}
                      className={`${i + 1 === 1
                        ? "gold-badge"
                        : i + 1 === 2
                          ? "silver-badge"
                          : i + 1 === 3 && "bronze-badge"
                        } p-2 flex items-center rounded-[10px] bg-[#f8f8f8] relative`}
                    >
                      <div className="ml-2">
                        <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">


                          <img
                            className="w-full h-full object-cover"
                            src={e?.avatar_code ? require(`images/common/avatars/${FindAvatarAdd(parseInt(e.avatar_code))}`) : require(`images/common/avatars/${FindAvatarAdd(217)}`)}

                            alt="team-logo"
                          />


                        </div>
                      </div>

                      <span
                        className="text-sm text-[#7c7c7c] text-right font-dana-regular ml-auto mt-1"
                        dir="ltr"
                      >


                        {hidePhoneNumber(String(e?.mobile))}

                      </span>

                      <span className="text-sm text-black font-dana-regular ml-2 mt-1">

                        {String(e?.total_score)}
                      </span>

                      <img
                        src={

                          TransparentStarIcon

                        }
                        className="w-4 h-4 object-contain"
                        alt="star logo"
                      />
                    </li>
                  )
                }

              })}



            </ul>
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white")}>
            <ul className="list-none flex flex-col gap-y-2 mt-4">
              {teamLeaderBoardData.map((e, i) => {
                if (i + 1 === team_rank.current) {
                  return (<li>
                    {!(team_rank.current === 1) ? (<div className="w-full h-full flex flex-col px-[22px]">
                      <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                      <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                      <span className="w-1 h-1 opacity-40 bg-[#333] mb-2 rounded-full"></span>
                    </div>) : null}
                    <Link
                      to={`/leader-board/$
                          "individual"
                         `}
                      className="flex items-center p-2 rounded-[10px] bg-[#acffd2] relative you"
                    >
                      <div className="ml-2">
                        <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                          <img
                            className="w-full h-full object-cover"
                            src={e.avator_code ? require(`images/common/flags/${FindFlagAdd(parseInt(e.avator_code))}`) : require(`images/common/flags/${FindFlagAdd(150)}`)}
                            alt="team-logo"
                          />
                        </div>
                      </div>

                      <span className="text-base text-[#170d53] font-semibold text-right font-dana-regular ml-auto mt-1">
                        تیم شما
                      </span>

                      <span className="text-sm text-[#170d53] font-semibold font-dana-regular ml-2 mt-1">
                        {e.total_score}
                      </span>

                      <img
                        src={BlueStarIcon}
                        className="w-4 h-4 object-contain"
                        alt="star logo"
                      />
                    </Link>
                    {!(team_rank.current >= 10) ?
                      (<div className="w-full h-full flex flex-col px-[22px]">
                        <span className="w-1 h-1 opacity-40 bg-[#333] mt-2 mb-[3px] rounded-full"></span>
                        <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                        <span className="w-1 h-1 opacity-40 bg-[#333] rounded-full"></span>
                      </div>) : null}
                  </li>)
                }
                else {
                  return (
                    <li
                      key={i}
                      className={`${i + 1 === 1
                        ? "gold-badge"
                        : i + 1 === 2
                          ? "silver-badge"
                          : i + 1 === 3 && "bronze-badge"
                        } p-2 flex items-center rounded-[10px] bg-[#f8f8f8] relative`}
                    >
                      <div className="ml-2">
                        <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">

                          <img
                            className="w-full h-full object-cover"
                            src={e.avator_code ? require(`images/common/flags/${FindFlagAdd(parseInt(e.avator_code))}`) : require(`images/common/flags/${FindFlagAdd(150)}`)}
                            alt="team-logo"
                          />

                        </div>
                      </div>

                      <span
                        className="text-sm text-[#7c7c7c] text-right font-dana-regular ml-auto mt-1"
                        dir="ltr"
                      >

                        {e.name}
                      </span>

                      <span className="text-sm text-black font-dana-regular ml-2 mt-1">

                        {String(e.total_score)}
                      </span>

                      <img
                        src={

                          TransparentStarIcon
                        }
                        className="w-4 h-4 object-contain"
                        alt="star logo"
                      />
                    </li>
                  )
                }

              }
              )}


            </ul>
          </Tab.Panel>

          <Tab.Panel className={classNames("bg-white")}>
            <ul className="list-none flex flex-col gap-y-2 mt-4">
              {userReferralLeaderBoardData.map((e, i) => {
                if (i + 1 === team_rank.current) {
                  return (
                    <li>
                      {!(user_rank.current === 1) ? (<div className="w-full h-full flex flex-col px-[22px]">
                        <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                        <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                        <span className="w-1 h-1 opacity-40 bg-[#333] mb-2 rounded-full"></span>
                      </div>) : null}

                      <Link
                        to={`/leader-board/$
                        "individual"
                       `}
                        className="flex items-center p-2 rounded-[10px] bg-[#acffd2] relative you"
                      >
                        <div className="ml-2">
                          <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                            <img
                              className="w-full h-full object-cover"
                              src={e.avator_code ? require(`images/common/avatars/${FindAvatarAdd(parseInt(e.avatar_code))}`) : require(`images/common/avatars/${FindAvatarAdd(217)}`)}

                              alt="team-logo"
                            />
                          </div>
                        </div>

                        <span className="text-base text-[#170d53] font-semibold text-right font-dana-regular ml-auto mt-1">
                          شما
                        </span>

                        <span className="text-sm text-[#170d53] font-semibold font-dana-regular ml-2 mt-1">
                          {e.ref_score}
                        </span>

                        <img
                          src={BlueAddUserIcon}
                          className="w-4 h-4 object-contain"
                          alt="star logo"
                        />
                      </Link>
                      {!(user_rank.current >= 10) ? (<div className="w-full h-full flex flex-col px-[22px]">
                        <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                        <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                        <span className="w-1 h-1 opacity-40 bg-[#333] mb-2 rounded-full"></span>
                      </div>) : null}
                    </li>)
                }
                else {
                  return (
                    <li
                      key={i}
                      className={`${i + 1 === 1
                        ? "gold-badge"
                        : i + 1 === 2
                          ? "silver-badge"
                          : i + 1 === 3 && "bronze-badge"
                        } p-2 flex items-center rounded-[10px] bg-[#f8f8f8] relative`}
                    >
                      <div className="ml-2">
                        <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">


                          <img
                            className="w-full h-full object-cover"
                            src={e.avator_code ? require(`images/common/avatars/${FindAvatarAdd(parseInt(e.avatar_code))}`) : require(`images/common/avatars/${FindAvatarAdd(217)}`)}

                            alt="team-logo"
                          />


                        </div>
                      </div>

                      <span
                        className="text-sm text-[#7c7c7c] text-right font-dana-regular ml-auto mt-1"
                        dir="ltr"
                      >


                        {hidePhoneNumber(String(e.mobile))}

                      </span>

                      <span className="text-sm text-black font-dana-regular ml-2 mt-1">

                        {String(e.ref_score)}
                      </span>

                      <img
                        src={

                          TransparentAddUserIcon

                        }
                        className="w-4 h-4 object-contain"
                        alt="star logo"
                      />
                    </li>
                  )
                }

              })}




            </ul>
          </Tab.Panel>
          {/* )
          })} */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
