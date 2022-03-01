import React from "react";
import FilimoLogo from "icons/common/filimo-logo.svg";
import FilimoLogoType from "icons/common/filimo-logo-type.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full hidden 2xl:block"
    >
      <div className="container px-14 pt-8 pb-6 2xl:max-w-[1440px]">
        <div className="flex items-center">
          <Link to="/" className="ml-[17px]">
            <figure className="flex w-32 h-10 overflow-hidden">
              <img
                className="w-10 h-full object-contain ml-[10px]"
                src={FilimoLogo}
                alt="filimo logo"
              />
              <img
                className="w-[78px] h-full object-contain"
                src={FilimoLogoType}
                alt="filimo logo type"
              />
            </figure>
          </Link>

          <h2 className="text-base text-white font-dana-medium mt-1 ml-auto">
            کمپین نوروزی فیلیمو
          </h2>

          <nav>
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
    </motion.header>
  );
}
