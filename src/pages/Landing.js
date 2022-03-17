import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FilimoLogo from "icons/common/filimo-logo.svg";
import FilimoLogoType from "icons/common/filimo-logo-type.svg";
import FilimoMap from "images/home/filimo-map.svg";
import Button from "Components/Button";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigation = useNavigate();

  return (
    <Fragment>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white bg-opacity-0 shadow-none absolute top-0 left-0 z-10 md:bg-opacity-[0.12] md:shadow-[0_2px_4px_0_rgba(0,0,0,0.14)]"
      >
        <div className="custom-container py-4 px-6 md:py-5">
          <div className="flex items-center justify-center md:justify-start">
            <Link to="/" className="ml-0 md:ml-[17px]">
              <figure className="flex w-auto md:w-32 h-10 overflow-hidden">
                <img
                  className="w-[26px] md:w-10 h-full object-contain md:ml-[10px]"
                  src={FilimoLogo}
                  alt="filimo logo"
                />
                <img
                  className="hidden w-[78px] h-full object-contain md:block"
                  src={FilimoLogoType}
                  alt="filimo logo type"
                />
              </figure>
            </Link>

            <h2 className="text-base text-white font-dana-medium mt-1 ml-auto hidden md:block">
              کمپین نوروزی فیلیمو
            </h2>
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
        <section className="relative h-[640px] overflow-hidden md:h-max">
          <div className="absolute overflow-hidden w-screen h-full bg-bg-gradient-to-custom z-[2]">
            <div className="bg-[#cc304b] opacity-25 blur-[50px] w-64 h-80 rounded-full absolute -left-[80px] -top-[100px] md:w-[600px] md:h-[600px] md:-left-[260px] md:-top-[180px]"></div>
            <div className="bg-[#ffc23a] opacity-25 blur-[50px] w-64 h-80 rounded-full absolute -right-[80px] -bottom-[100px] md:w-[600px] md:h-[600px] md:-right-[260px] md:-bottom-[180px]"></div>
          </div>

          <div className="custom-container relative z-[5] pt-28 px-6 md:pt-40">
            <div className="flex flex-col items-center md:flex-row md:justify-between md:items-start">
              <div>
                <h1 className="text-[18px] text-white text-center font-dana-demibold md:text-right md:text-4xl lg:text-[40px]">
                  کمپین نوروزی فیلیمو
                </h1>
                <p className="text-sm text-white text-right font-dana-regular leading-[2] mt-2 max-w-[432px] mx-auto md:mt-6 md:mx-0 lg:text-base lg:leading-[2.13]">
                  عید ۱۴۰۱ با کمپین نوروزی فیلیمو همراه باشید. با ۱۳ مرحله
                  روزانه، شامل یک بازی و یک ماموریت ویژه همراه شوید و امتیاز خود
                  را با مشاهده فیلم‌ها و سریال‌های فیلیمو افزایش دهید. این همه
                  ماجرا نیست شما می‌توانید با ایجاد یک تیم شانس خود را برای
                  برنده شدن افزایش دهید. همچنین به ازای معرفی دوستان خود به بازی
                  امتیاز دریافت کنید و در لیدربرد معرفی دوستان صدرنشین شوید. این
                  مسابقه پرچالش و پر جایزه را از دست ندهید…
                </p>
                <Button
                  style="max-w-[312px] mt-4 mx-auto md:mx-0 md:max-w-[208px] md:mb-[88px]"
                  type="primary"
                  onClick={() => navigation("/")}
                >
                  ورود به بازی
                </Button>
              </div>

              <div>
                <figure className="opacity-70 md:opacity-100 mt-4 w-full h-full md:mt-0 md:max-w-xl md:mb-6">
                  <img
                    className="w-full h-full object-contain"
                    src={FilimoMap}
                    alt="map"
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>
        
        <section>
            <div className="custom-container px-6 bg-[#fdfdfd]">

            </div>
        </section>
      </motion.main>
    </Fragment>
  );
}
