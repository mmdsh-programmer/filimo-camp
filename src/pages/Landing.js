import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FilimoLogo from "icons/common/filimo-logo.svg";
import Button from "Components/Button";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "icons/landing/arrow-left-icon.svg";
import FilimoMap from "images/home/filimo-map.svg";

export default function Landing() {
  const navigation = useNavigate();

  return (
    <Fragment>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-opacity-0 absolute top-0 left-0 z-10"
      >
        <div className="custom-container py-4 md:py-7">
          <div className="flex justify-center">
            <Link to="/">
              <picture>
                <source
                  media="(min-width:768px)"
                  srcset={require("images/landing/filimo-logo.webp")}
                />
                <img
                  className="w-[26px] h-[26px] md:w-32 md:h-10 object-contain"
                  src={FilimoLogo}
                  alt="filimo logo"
                />
              </picture>
            </Link>
          </div>
        </div>
      </motion.header>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <section className="relative">
          <div className="absolute overflow-hidden w-screen h-full bg-bg-gradient-to-custom z-[2]">
            <div className="bg-[#cc304b] opacity-25 blur-[50px] w-64 h-80 rounded-full absolute -left-[80px] -top-[100px] md:w-[600px] md:h-[600px] md:-left-[260px] md:-top-[180px]"></div>
            <div className="bg-[#ffc23a] opacity-25 blur-[50px] w-64 h-80 rounded-full absolute -right-[80px] -bottom-[100px] md:w-[600px] md:h-[600px] md:-right-[160px] md:-bottom-[180px]"></div>
          </div>

          <div className="custom-container relative z-[5] px-4 pt-[70px] md:pt-[138px] xl:px-[135px]">
            <div className="flex flex-col-reverse items-center md:flex-row md:justify-between">
              <div className="mt-7 md:mt-0">
                <h1 className="text-3xl text-white text-center font-dana-demibold md:text-right md:text-[40px]">
                  عیدی گیم فیلیمو
                </h1>

                <p className="text-base text-white text-right font-dana-medium leading-[1.88] mt-[14px] max-w-[568px] mx-auto md:mt-5 md:mx-0 md:text-[22px] md:leading-[2.13]">
                  تو عیدی گیم فیلیمو فرصت اینو داری که خودت به تنهایی یا بهمراه
                  یک تیم کلی بازی و چالش رو تجربه کنی و در انتها هم کلی جایزه رو
                  مال خودت کنی
                </p>

                <ul className="list-none mt-7 flex flex-col gap-y-[18px]">
                  <li className="flex items-center">
                    <img
                      className="w-[15px] h-[15px] object-contain ml-[10px]"
                      src={ArrowLeftIcon}
                      alt="arrow icon"
                    />
                    <span className="text-base text-white font-dana-medium block mt-1">
                      ۱ عدد کنسول بازی PS5
                    </span>
                  </li>
                  <li className="flex items-center">
                    <img
                      className="w-[15px] h-[15px] object-contain ml-[10px]"
                      src={ArrowLeftIcon}
                      alt="arrow icon"
                    />
                    <span className="text-base text-white font-dana-medium block mt-1">
                      ۱ سکه کامل بهار آزادی
                    </span>
                  </li>
                  <li className="flex items-center">
                    <img
                      className="w-[15px] h-[15px] object-contain ml-[10px]"
                      src={ArrowLeftIcon}
                      alt="arrow icon"
                    />
                    <span className="text-base text-white font-dana-medium block mt-1">
                      ۲ عدد گوشی موبایل Mi 11 Lite
                    </span>
                  </li>
                  <li className="flex items-center">
                    <img
                      className="w-[15px] h-[15px] object-contain ml-[10px]"
                      src={ArrowLeftIcon}
                      alt="arrow icon"
                    />
                    <span className="text-base text-white font-dana-medium block mt-1">
                      ۱۵ عدد فیلیمو باکس
                    </span>
                  </li>
                </ul>
                <Button
                  style="max-w-[290px] mt-7 mb-8 md:mb-[72px]"
                  type="primary"
                  onClick={() => navigation("/")}
                >
                  <span className="text-xl text-[#5e4003] font-dana-demibold p-3 block">
                    ورود به فیلیمو و بازی
                  </span>
                </Button>
              </div>

              <div>
                <figure className="max-w-[236px] md:max-w-[540px] h-full">
                  <img
                    className="w-full h-full object-contain"
                    src={require("images/landing/hero-banner.webp")}
                    alt="banner"
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fdfdfd] relative">
          <picture className="relative w-screen z-[1]">
            <source
              media="(min-width:768px)"
              srcset={require("images/landing/bg-desktop.png")}
            />
            <img
              className="w-[550px] h-[550px] object-cover md:w-[1180px] md:h-[1180px]"
              src={require("images/landing/bg-mobile.png")}
              alt="background"
            />
          </picture>

          <div className="custom-container">
            <div className="flex flex-col">
              <figure className="w-[218px] h-[198px]">
                <img className="w-full h-full object-contain" src={FilimoMap} alt="map" />
              </figure>
            </div>
          </div>
        </section>

        <section>
          <div className="custom-container pt-12 px-6">
            <h2 className="text-xl text-[#202020] font-dana-demibold text-center md:">
              جوایز
            </h2>

            <div className="grid grid-cols-1 mt-12 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <h4 className="text-lg text-[#292929] font-dana-medium text-center">
                  لیدر برد تیمی
                </h4>
                <p className="text-base text-[#545454] font-dana-regular mt-2 text-center max-w-[127px] h-12">
                  جایزه تیم صدرنشین بدون قرعه‌کشی
                </p>
                <img
                  className="w-28 h-28 object-contain mt-[22px] block"
                  // src={require("")}
                  alt="team-gift"
                />
                <h3 className="text-xl text-[#202020] font-dana-demibold mt-8">
                  یک سکه بهار آزادی
                </h3>

                <div className="w-full h-[1px] bg-[#d6d6d6] mt-6 md:hidden"></div>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
    </Fragment>
  );
}
