import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import TransparentStarIcon from "icons/home/transparent-star.svg";
import BlueStarIcon from "icons/home/blue-star.svg";
import { Link } from "react-router-dom";
import TransparentAddUserIcon from "icons/home/transparent-add-user-icon.svg";
import BlueAddUserIcon from "icons/home/blue-add-user-icon.svg";
import Fetch from "../Helper/Fetch";
import { flags, FindFlagAdd } from "Helper/flags";
import { avatars, FindAvatarAdd } from "Helper/avatars";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CustomTab() {
  let userLeaderBoardData;
  let teamLeaderBoardData;
  let userFilimoID = localStorage.getItem("filimoId");
  let userFilimoPho = localStorage.getItem("filimoNumberPh");
  const userLeaderBoard = async () => {
    const userLeaderBoardUrl = await Fetch({
      url: 'http://37.152.185.94:8001/user/user-leader-board/',
      method: 'GET',

    });

    if (!('ERROR' in userLeaderBoardUrl)) {

      userLeaderBoardData = [...userLeaderBoardUrl.data];
      console.log('userLeaderBoardData', userLeaderBoardData);

    } else {

    }
  }
  const teamLeaderBoard = async () => {
    const teamLeaderBoardUrl = await Fetch({
      url: 'http://37.152.185.94:8001/user/team-leader-board/',
      method: 'GET',

    });

    if (!('ERROR' in teamLeaderBoardUrl)) {

      teamLeaderBoardData = [...teamLeaderBoardUrl.data];
      console.log('teamLeaderBoardData', teamLeaderBoardData);

    } else {

    }
  }


  useEffect(() => {
    userLeaderBoard();
    teamLeaderBoard();
  }, [])
  const tabList = ["امتیازات فردی", "امتیازات تیمی", "امتیاز از دعوت"];

  const hidePhoneNumber = (phoneNumber) => {
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
              {[...Array(5)].map((e, i) => (
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
                        src={require(`images/common/avatars/${FindAvatarAdd(userLeaderBoardData?.avator_code | 201)}`)}
                        alt="team-logo"
                      />


                    </div>
                  </div>

                  <span
                    className="text-sm text-[#7c7c7c] text-right font-dana-regular ml-auto mt-1"
                    dir="ltr"
                  >


                    {hidePhoneNumber('09151170865')}

                  </span>

                  <span className="text-sm text-black font-dana-regular ml-2 mt-1">

                    {String(userLeaderBoardData?.total_score)}
                  </span>

                  <img
                    src={

                      TransparentAddUserIcon

                    }
                    className="w-4 h-4 object-contain"
                    alt="star logo"
                  />
                </li>
              ))}

              <li>
                <div className="w-full h-full flex flex-col px-[22px]">
                  <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                  <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                  <span className="w-1 h-1 opacity-40 bg-[#333] mb-2 rounded-full"></span>
                </div>
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
                        src={require("images/home/board-avatar.webp")}
                        alt="team-logo"
                      />
                    </div>
                  </div>

                  <span className="text-base text-[#170d53] font-semibold text-right font-dana-regular ml-auto mt-1">
                شما
                  </span>

                  <span className="text-sm text-[#170d53] font-semibold font-dana-regular ml-2 mt-1">
                    234.789
                  </span>

                  <img
                    src={ BlueAddUserIcon}
                    className="w-4 h-4 object-contain"
                    alt="star logo"
                  />
                </Link>
                <div className="w-full h-full flex flex-col px-[22px]">
                  <span className="w-1 h-1 opacity-40 bg-[#333] mt-2 mb-[3px] rounded-full"></span>
                  <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                  <span className="w-1 h-1 opacity-40 bg-[#333] rounded-full"></span>
                </div>
              </li>

              <li className="p-2 flex items-center rounded-[10px] bg-[#f8f8f8] relative">
                <div className="ml-2">
                  <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                    <img
                      className="w-full h-full object-cover"
                      src={require("images/home/board-avatar.webp")}
                      alt="team-logo"
                    />
                  </div>
                </div>

                <span className="text-sm text-[#7c7c7c] text-right font-dana-regular ml-auto mt-1" dir="ltr">
                
                  {  hidePhoneNumber("09357894360")}
                   
                </span>

                <span className="text-sm text-black font-dana-regular ml-2 mt-1">
                  234.789
                </span>

                <img
                  src={
                    TransparentAddUserIcon 
                  }
                  className="w-4 h-4 object-contain"
                  alt="star logo"
                />
              </li>
            </ul>
          </Tab.Panel>
          {/* {[...Array(tabList.length)].map((posts, tabId) => {
            // debugger;
            return(
              <Tab.Panel key={tabId} className={classNames("bg-white")}>
                <ul className="list-none flex flex-col gap-y-2 mt-4">
                  {[...Array(5)].map((e, i) => (
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
  
                          {tabId === 0 || tabId === 2
                            ? <img
                              className="w-full h-full object-cover"
                              src={require(`images/common/avatars/${FindAvatarAdd(userLeaderBoardData?.avator_code | 201)}`)}
                              alt="team-logo"
                            />
                            : <img
                              className="w-full h-full object-cover"
                              src={require(`images/common/flags/${FindFlagAdd(teamLeaderBoardData?.avator_code | 150)}`)}
                              alt="team-logo"
                            />}
  
                        </div>
                      </div>
  
                      <span
                        className="text-sm text-[#7c7c7c] text-right font-dana-regular ml-auto mt-1"
                        dir="ltr"
                      >
                        {tabId === 0 || tabId === 2
                          // ? hidePhoneNumber(userLeaderBoardData?.filimo_id)
                          ? hidePhoneNumber('09151170865')
                          : "تیم شاهین"}
                      </span>
  
                      <span className="text-sm text-black font-dana-regular ml-2 mt-1">
                        {tabId === 0 || tabId === 2
                          ? String(userLeaderBoardData?.total_score)
                          : String(teamLeaderBoardData?.total_score)}
                      </span>
  
                      <img
                        src={
                          tabId === 2
                            ? TransparentAddUserIcon
                            : TransparentStarIcon
                        }
                        className="w-4 h-4 object-contain"
                        alt="star logo"
                      />
                    </li>
                  ))}
  
                  <li>
                    <div className="w-full h-full flex flex-col px-[22px]">
                      <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                      <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                      <span className="w-1 h-1 opacity-40 bg-[#333] mb-2 rounded-full"></span>
                    </div>
                    <Link
                      to={`/leader-board/${tabId === 0 || tabId === 2
                        ? "individual"
                        : "teams/my-team"
                        }`}
                      className="flex items-center p-2 rounded-[10px] bg-[#acffd2] relative you"
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
  
                      <span className="text-base text-[#170d53] font-semibold text-right font-dana-regular ml-auto mt-1">
                        {tabId === 1 ? "تیم شما" : "شما"}
                      </span>
  
                      <span className="text-sm text-[#170d53] font-semibold font-dana-regular ml-2 mt-1">
                        234.789
                      </span>
  
                      <img
                        src={tabId === 2 ? BlueAddUserIcon : BlueStarIcon}
                        className="w-4 h-4 object-contain"
                        alt="star logo"
                      />
                    </Link>
                    <div className="w-full h-full flex flex-col px-[22px]">
                      <span className="w-1 h-1 opacity-40 bg-[#333] mt-2 mb-[3px] rounded-full"></span>
                      <span className="w-1 h-1 opacity-40 bg-[#333] mb-[3px] rounded-full"></span>
                      <span className="w-1 h-1 opacity-40 bg-[#333] rounded-full"></span>
                    </div>
                  </li>
  
                  <li className="p-2 flex items-center rounded-[10px] bg-[#f8f8f8] relative">
                    <div className="ml-2">
                      <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                        <img
                          className="w-full h-full object-cover"
                          src={require("images/home/board-avatar.webp")}
                          alt="team-logo"
                        />
                      </div>
                    </div>
  
                    <span className="text-sm text-[#7c7c7c] text-right font-dana-regular ml-auto mt-1" dir="ltr">
                      {tabId === 0 || tabId === 2
                        ? hidePhoneNumber("09357894360")
                        : "تیم شاهین"}
                    </span>
  
                    <span className="text-sm text-black font-dana-regular ml-2 mt-1">
                      234.789
                    </span>
  
                    <img
                      src={
                        tabId === 2 ? TransparentAddUserIcon : TransparentStarIcon
                      }
                      className="w-4 h-4 object-contain"
                      alt="star logo"
                    />
                  </li>
                </ul>
              </Tab.Panel>
            )
          })} */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
