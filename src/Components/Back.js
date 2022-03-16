import React from "react";
import { Link } from "react-router-dom";
import BackIcon from "icons/common/back.svg";
import FilimoLogo from "icons/common/filimo-logo.svg";

export default function Back({ style, children }) {
  return (
    <section className={`${style} mb-2 2xl:mb-0`}>
      <div className="container px-2 pt-4 2xl:px-16 2xl:pt-8 2xl:pb-14 2xl:max-w-[1440px]">
        <div className="flex relative">
          <Link to="/" className="w-6 h-6 ml-2">
            <img
              className="w-full h-full object-contain"
              src={BackIcon}
              alt="back icon"
            />
          </Link>
          <h1 className="text-base text-white font-dana-regular">{children}</h1>

          <Link
            to="/"
            className="block absolute -top-[2px] left-2/4 -translate-x-2/4 2xl:hidden"
          >
            <figure className=" w-[26px] h-[26px] overflow-hidden">
              <img
                src={FilimoLogo}
                className="w-full h-full object-contain"
                alt="filimo logo"
              />
            </figure>
          </Link>

          <nav className="hidden 2xl:block mr-auto">
            <ul className="list-none flex gap-x-11">
              <li>
                <Link to="/" className="text-base text-white font-dana-medium">
                  شرایط و مقرارت
                </Link>
              </li>
              <li>
                <Link
                  to="/leader-board/teams/create"
                  className="text-base text-white font-dana-medium"
                >
                  ایجاد تیم
                </Link>
              </li>
              <li>
                <Link
                  to="/invite"
                  className="text-base text-white font-dana-medium"
                >
                  دعوت از دوستان
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
