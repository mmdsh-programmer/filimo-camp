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
          <div className="absolute overflow-hidden w-full h-full bg-bg-gradient-to-custom z-[2]">
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
          <picture className="relative w-screen z-[1] -top-12 md:-top-32">
            <source
              media="(min-width:768px)"
              srcset={require("images/landing/bg-desktop.png")}
            />
            <img
              className="w-[550px] h-[550px] object-cover md:w-[1180px] md:h-[1180px] mx-auto"
              src={require("images/landing/bg-mobile.png")}
              alt="background"
            />
          </picture>

          <div className="custom-container z-[2] px-4 absolute top-28 left-2/4 -translate-x-2/4 h-full md:top-36">
            <div className="flex flex-col h-auto items-center justify-center">
              <figure className="w-[218px] h-[198px] md:w-[429px] md:h-[390px]">
                <img
                  className="w-full h-full object-cover"
                  src={FilimoMap}
                  alt="map"
                />
              </figure>

              <h2 className="text-lg text-[#514e4e] font-dana-medium text-center max-w-[400px] mt-[114px] md:text-[26px] md:leading-[1.8] md:mt-9 md:max-w-[420px]">
                نقش خودت رو انتخاب کن، دوستات رو دعوت کن و تیم خودت رو بساز تا
                ۱۵ روز عید رو با فیلیمو به شادی بگذرونی
              </h2>

              <Button
                style="max-w-[290px] mt-7"
                type="primary"
                onClick={() => navigation("/")}
              >
                <span className="text-xl text-[#5e4003] font-dana-demibold p-3 block">
                  ورود به فیلیمو و بازی
                </span>
              </Button>
            </div>

            <figure className="max-w-[650px] h-auto mt-8 mx-auto">
              <img
                className="w-full h-full object-contain"
                src={require("images/landing/filimo-ui.png")}
                alt="filimo ui"
              />
            </figure>
          </div>
        </section>

        <section className="mt-[440px] bg-[#eee] sm:mt-[700px] md:mt-[320px]">
          <div className="custom-container py-[60px] px-6">
            <h2 className="text-[30px] text-[#202020] font-dana-demibold text-center md:text-4xl">
              جوایز عیدی گیم فیلیمو
            </h2>
            <h3 className="mt-4 text-xl font-dana-demibold text-center md:text-[22px]">
              به صدر نشین‌های جداول امتیازی
            </h3>

            <div className="grid grid-cols-1 mt-12 md:grid-cols-2 lg:grid-cols-3 gap-y-[60px]">
              <div className="flex flex-col items-center">
                <img
                  className="w-[187px] h-[187px] object-contain block"
                  src={require("images/landing/team-gift.webp")}
                  alt="team-gift"
                />
                <h3 className="text-[26px] text-[#202020] font-dana-demibold mt-9">
                  یک سکه بهار آزادی
                </h3>
                <h4 className="text-lg text-[#292929] font-dana-medium text-center mt-6">
                  برای صدر نشین جدول تیم‌ها
                </h4>
                <p className="text-base text-[#545454] font-dana-regular mt-[15px] text-center">
                  بدون قرعه کشی
                </p>
              </div>

              <div className="flex flex-col items-center">
                <img
                  className="w-[187px] h-[187px] object-contain block"
                  src={require("images/landing/personal-gift.webp")}
                  alt="team-gift"
                />
                <h3 className="text-[26px] text-[#202020] font-dana-demibold mt-9">
                  گوشی موبایل Mi 11 Lite
                </h3>
                <h4 className="text-lg text-[#292929] font-dana-medium text-center mt-6">
                  برای نفر اول جدول فردی
                </h4>
                <p className="text-base text-[#545454] font-dana-regular mt-[15px] text-center">
                  بدون قرعه کشی
                </p>
              </div>

              <div className="flex flex-col items-center">
                <img
                  className="w-[187px] h-[187px] object-contain block"
                  src={require("images/landing/personal-gift.webp")}
                  alt="team-gift"
                />
                <h3 className="text-[26px] text-[#202020] font-dana-demibold mt-9">
                  گوشی موبایل Mi 11 Lite
                </h3>
                <h4 className="text-lg text-[#292929] font-dana-medium text-center mt-6">
                  برای نفر اول جدول فردی
                </h4>
                <p className="text-base text-[#545454] font-dana-regular mt-[15px] text-center">
                  بدون قرعه کشی
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="filimo-box relative h-fit overflow-hidden">
          <div className="relative z-[5]">
            <div className="custom-container py-[60px] px-6">
              <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-around">
                <div>
                  <div className="w-14 h-2 rounded-[4px] bg-[#ea9800] mt-[70px] mx-auto lg:mx-0 lg:mt-0"></div>
                  <h5 className="text-lg text-white font-dana-medium mt-4 text-center lg:text-right lg:text-xl">
                    جوایز روزانه
                  </h5>
                  <h2 className="text-3xl text-white font-dana-demibold mt-4 text-center lg:text-right lg:text-4xl">
                    یک دستگاه فیلیمو‌باکس
                  </h2>
                  <p className="text-lg text-white font-dana-regular mt-4 leading-[1.68] text-center mx-auto max-w-[305px] lg:text-right lg:mx-0">
                    {" "}
                    اولین نفری که با بیشترین امتیاز بازی آن روز را به اتمام
                    برساند.
                  </p>
                </div>

                <figure className="max-w-[414px] h-full mx-auto lg:mx-0">
                  <img
                    className="w-full h-full"
                    src={require("images/landing/filimo-box.webp")}
                    alt="filimo box"
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className="ps5 relative h-fit overflow-hidden">
          <div className="relative z-[5]">
            <div className="custom-container py-[60px] px-6">
              <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-around">
                <div>
                  <div className="w-14 h-2 rounded-[4px] bg-[#e23452] mt-[70px] mx-auto lg:mx-0 lg:mt-0"></div>
                  <h5 className="text-lg text-white font-dana-medium mt-4 text-center lg:text-right lg:text-xl">
                    قرعه کشی جایزه بزرگ
                  </h5>
                  <h2 className="text-3xl text-white font-dana-demibold mt-4 text-center lg:text-right lg:text-4xl">
                    یک دستگاه PS5
                  </h2>
                  <p className="text-lg text-white font-dana-regular mt-4 leading-[1.68] text-center mx-auto max-w-[305px] lg:text-right lg:mx-0">
                    بین تمامی افرادی که در طول بازه کمپین حداقل یک مرحله از بازی
                    را به اتمام رسانده باشند قرعه‌کشی خواهد شد
                  </p>
                </div>

                <figure className="max-w-[339px] h-full mx-auto lg:mx-0">
                  <img
                    className="w-full h-full"
                    src={require("images/landing/ps5.webp")}
                    alt="filimo box"
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>
      </motion.main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="absolute overflow-hidden w-full h-full bg-bg-gradient-to-custom z-[2]">
          <div className="bg-[#cc304b] opacity-25 blur-[50px] w-64 h-80 rounded-full absolute -left-[160px] -top-[160px] md:w-[600px] md:h-[600px] md:-left-[260px] md:-top-[240px]"></div>
          <div className="bg-[#ffc23a] opacity-25 blur-[50px] w-64 h-80 rounded-full absolute -right-[80px] -bottom-[100px] md:w-[600px] md:h-[600px] md:-right-[160px] md:-bottom-[240px]"></div>
        </div>

        <div className="relative custom-container px-6 pt-[50px] pb-[60px] z-[3]">
          <h2 className="text-3xl text-white font-dana-demibold text-center">
            عیدی گیم فیلیمو
          </h2>
          <p className="text-[26px] text-white font-dana-medium text-center mt-7 mt-">
            فرصتت رو از دست نده و همین الان شروع کن
          </p>
          <Button
            style="max-w-[290px] mt-14 mx-auto"
            type="primary"
            onClick={() => navigation("/")}
          >
            <span className="text-xl text-[#5e4003] font-dana-demibold p-3 block">
              ورود به فیلیمو و بازی
            </span>
          </Button>
          <Link to="/" className="flex justify-center mt-24">
            <figure className="w-[98px] h-8">
              <img
                className="w-full h-full object-contain"
                src={require("images/landing/filimo-logo.webp")}
                alt="filimo logo"
              />
            </figure>
          </Link>
          <span className="text-sm text-white font-dana-medium mt-4 block text-center">
            همه حقوق این کمپین متعلق به فیلیمو می‌باشد و هرگونه کپی برداری پیگرد
            قانونی دارد
          </span>
        </div>
      </motion.footer>
    </Fragment>
  );
}
