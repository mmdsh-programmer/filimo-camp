import React from "react";
import { Link } from "react-router-dom";
import Back from "components/Back";
import TransparentStarIcon from "icons/home/transparent-star.svg";
import BlueStarIcon from "icons/home/blue-star.svg";
import { motion } from "framer-motion";

export default function TeamLeaderBoard() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Back>جدول امتیازات</Back>
      <div className="container py-6 px-4">
        <ul className="list-none flex flex-col gap-y-2 mt-4 2xl:mt-0">
          <li className="gold-badge p-2 flex items-center rounded-[10px] bg-[#f9f9f9] bg-opacity-10 relative">
            <div className="ml-2">
              <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                <img
                  className="w-full h-full object-cover"
                  src={require("images/home/board-avatar.webp")}
                  alt="team-logo"
                />
              </div>
            </div>

            <span className="text-sm text-white text-right font-dana-regular ml-6 w-[112px] overflow-hidden text-ellipsis mt-1">
              تیم شاهین-345
            </span>

            <span className="font-dana-regular text-sm text-white text-opacity-60 ml-auto mt-1">
              نفر 7
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

          <li className="silver-badge p-2 flex items-center rounded-[10px] bg-[#f9f9f9] bg-opacity-10 relative">
            <div className="ml-2">
              <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                <img
                  className="w-full h-full object-cover"
                  src={require("images/home/board-avatar.webp")}
                  alt="team-logo"
                />
              </div>
            </div>

            <span className="text-sm text-white text-right font-dana-regular ml-6 w-[112px] overflow-hidden text-ellipsis mt-1">
              تیم شاهین-345
            </span>

            <span className="font-dana-regular text-sm text-white text-opacity-60 ml-auto mt-1">
              نفر 7
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

          <li className="bronze-badge p-2 flex items-center rounded-[10px] bg-[#f9f9f9] bg-opacity-10 relative">
            <div className="ml-2">
              <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                <img
                  className="w-full h-full object-cover"
                  src={require("images/home/board-avatar.webp")}
                  alt="team-logo"
                />
              </div>
            </div>

            <span className="text-sm text-white text-right font-dana-regular ml-6 w-[112px] overflow-hidden text-ellipsis mt-1">
              تیم شاهین-345
            </span>

            <span className="font-dana-regular text-sm text-white text-opacity-60 ml-auto mt-1">
              نفر 7
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

          <li className="p-2 flex items-center rounded-[10px] bg-[#f9f9f9] bg-opacity-10 relative">
            <div className="ml-2">
              <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                <img
                  className="w-full h-full object-cover"
                  src={require("images/home/board-avatar.webp")}
                  alt="team-logo"
                />
              </div>
            </div>

            <span className="text-sm text-white text-right font-dana-regular ml-6 w-[112px] overflow-hidden text-ellipsis mt-1">
              تیم شاهین-345
            </span>

            <span className="font-dana-regular text-sm text-white text-opacity-60 ml-auto mt-1">
              نفر 3
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

          <li className="p-2 flex items-center rounded-[10px] bg-[#f9f9f9] bg-opacity-10 relative">
            <div className="ml-2">
              <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                <img
                  className="w-full h-full object-cover"
                  src={require("images/home/board-avatar.webp")}
                  alt="team-logo"
                />
              </div>
            </div>

            <span className="text-sm text-white text-right font-dana-regular ml-6 w-[112px] overflow-hidden text-ellipsis mt-1">
              تیم شاهین-345
            </span>

            <span className="font-dana-regular text-sm text-white text-opacity-60 ml-auto mt-1">
              نفر 5
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

          <li>
            <div className="w-full h-full flex flex-col px-[22px]">
              <span className="w-1 h-1 opacity-60 bg-white bg-opacity-60 mb-[3px] rounded-full"></span>
              <span className="w-1 h-1 opacity-60 bg-white bg-opacity-60 mb-[3px] rounded-full"></span>
              <span className="w-1 h-1 opacity-60 bg-white bg-opacity-60 mb-2 rounded-full"></span>
            </div>
            <Link
              to="/leader-board/teams/my-team"
              className="flex items-center p-2 rounded-[10px] bg-[#acffd2] bg-opacity-80 shadow-[0_2px_4px_0_rgba(154,227,191,0.57)] relative"
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

              <span className="text-base text-[#170d53] text-right font-dana-regular ml-6 w-[112px] overflow-hidden text-ellipsis mt-1">
                تیم شما
              </span>

              <span className="font-dana-regular text-sm text-[#170d53] text-opacity-60 ml-auto mt-1">
                نفر 7
              </span>

              <span className="text-sm text-[#170d53] font-dana-regular ml-2 mt-1">
                234.789
              </span>

              <img
                src={BlueStarIcon}
                className="w-4 h-4 object-contain"
                alt="star logo"
              />
            </Link>
            <div className="w-full h-full flex flex-col px-[22px]">
              <span className="w-1 h-1 opacity-60 bg-white bg-opacity-60 mt-2 mb-[3px] rounded-full"></span>
              <span className="w-1 h-1 opacity-60 bg-white bg-opacity-60 mb-[3px] rounded-full"></span>
              <span className="w-1 h-1 opacity-60 bg-white bg-opacity-60 rounded-full"></span>
            </div>
          </li>

          <li className="p-2 flex items-center rounded-[10px] bg-[#f9f9f9] bg-opacity-10 relative">
            <div className="ml-2">
              <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-white">
                <img
                  className="w-full h-full object-cover"
                  src={require("images/home/board-avatar.webp")}
                  alt="team-logo"
                />
              </div>
            </div>

            <span className="text-sm text-white text-right font-dana-regular ml-6 w-[112px] overflow-hidden text-ellipsis mt-1">
              تیم شاهین-345
            </span>

            <span className="font-dana-regular text-sm text-white text-opacity-60 ml-auto mt-1">
              نفر 7
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
    </motion.main>
  );
}
