import React, { useEffect, useState, Fragment } from "react";
import { motion } from "framer-motion";
import FilimoIcon from "icons/common/filimo-logo.svg";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import Button from "Components/Button";
import { useNavigate } from "react-router-dom";

export default function InfoSlider() {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const navigator = useNavigate();

  const content = [
    {
      title: "معرفی امتیازات",
      content: `کاربر گرامی؛ ضمن سپاس از انتخاب سرویس فیلیمو لازم است پیش از خرید مورد نظر و تماشای فیلم، سریال و تئاتر، توافقنامه و قوانین ذیل را مطالعه فرمایید، فیلیمو سرویس خود را تحت شرایط و مقررات این توافقنامه در اختیار شما می گذارد و شما به عنوان کاربران این سرویس ملزم به رعایت مفاد مذکور در این توافقنامه که ممکن است در آینده تغییر یابد، هستید.
      و...) و پیش آمدهای خارج از کنترل فیلیموکه منجر به قطع سرویس و ارائه خدمات شود، تا زمان برطرف شدن مشکل، این قرارداد معلق خواهد شد.
      این توافقنامه مشروعیت و اعتبار خود را از قوانین حاکم بر جمهوری اسلامی ایران کسب می کند.
      ترافیک مصرفی کاربران فیلیمو ، بر اساس سیاست‌ها و تنظیمات اپراتورهای مختلف اینترنتی به صورت تمام بها یا نیم بها محاسبه خواهد شد و فیلیمو تضمینی برای محاسبه ترافیک نیم بها برای کاربران خود نخواهد داشت.
      `,
    },
    {
      title: "معرفی دوستان",
      content: `کاربر گرامی؛ ضمن سپاس از انتخاب سرویس فیلیمو لازم است پیش از خرید مورد نظر و تماشای فیلم، سریال و تئاتر، توافقنامه و قوانین ذیل را مطالعه فرمایید، فیلیمو سرویس خود را تحت شرایط و مقررات این توافقنامه در اختیار شما می گذارد و شما به عنوان کاربران این سرویس ملزم به رعایت مفاد مذکور در این توافقنامه که ممکن است در آینده تغییر یابد، هستید.
      و...) و پیش آمدهای خارج از کنترل فیلیموکه منجر به قطع سرویس و ارائه خدمات شود، تا زمان برطرف شدن مشکل، این قرارداد معلق خواهد شد.
      این توافقنامه مشروعیت و اعتبار خود را از قوانین حاکم بر جمهوری اسلامی ایران کسب می کند.
      ترافیک مصرفی کاربران فیلیمو ، بر اساس سیاست‌ها و تنظیمات اپراتورهای مختلف اینترنتی به صورت تمام بها یا نیم بها محاسبه خواهد شد و فیلیمو تضمینی برای محاسبه ترافیک نیم بها برای کاربران خود نخواهد داشت.
      `,
    },
    {
      title: "تیم‌سازی",
      content: `کاربر گرامی؛ ضمن سپاس از انتخاب سرویس فیلیمو لازم است پیش از خرید مورد نظر و تماشای فیلم، سریال و تئاتر، توافقنامه و قوانین ذیل را مطالعه فرمایید، فیلیمو سرویس خود را تحت شرایط و مقررات این توافقنامه در اختیار شما می گذارد و شما به عنوان کاربران این سرویس ملزم به رعایت مفاد مذکور در این توافقنامه که ممکن است در آینده تغییر یابد، هستید.
        و...) و پیش آمدهای خارج از کنترل فیلیموکه منجر به قطع سرویس و ارائه خدمات شود، تا زمان برطرف شدن مشکل، این قرارداد معلق خواهد شد.
        این توافقنامه مشروعیت و اعتبار خود را از قوانین حاکم بر جمهوری اسلامی ایران کسب می کند.
        ترافیک مصرفی کاربران فیلیمو ، بر اساس سیاست‌ها و تنظیمات اپراتورهای مختلف اینترنتی به صورت تمام بها یا نیم بها محاسبه خواهد شد و فیلیمو تضمینی برای محاسبه ترافیک نیم بها برای کاربران خود نخواهد داشت.
        `,
    },
  ];

  useEffect(() => {
    const swiper = document.querySelector(".info-slider-swiper").swiper;

    swiper.on("slideChange", function () {
      setSelectedSlide(this.activeIndex);
    });
  }, []);

  const handleNext = () => {
    const swiper = document.querySelector(".info-slider-swiper").swiper;
    swiper.slideNext(500, true);
  };

  const handlePrev = () => {
    const swiper = document.querySelector(".info-slider-swiper").swiper;
    swiper.slidePrev(500, true);
  };

  const goToHome = () => {
    navigator("/");
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[linear-gradient(to_bottom,#1c1161,#110942)]"
    >
      <Link
        to="/"
        className="absolute top-[15px] left-2/4 -translate-x-2/4 z-10"
      >
        <img
          src={FilimoIcon}
          className="w-[26px] h-[26px] object-contain"
          alt="filimo icon"
        />
      </Link>

      <section>
        <div className="container">
          <Swiper
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="info-slider-swiper"
          >
            <SwiperSlide>
              <span className="block h-[312px] bg-[#451069]"></span>
            </SwiperSlide>
            <SwiperSlide>
              <span className="block h-[312px] bg-[#451069]"></span>
            </SwiperSlide>
            <SwiperSlide>
              <span className="block h-[312px] bg-[#451069]"></span>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section>
        <div className="container px-6">
          {selectedSlide === 1}
          <article className="mt-4 pb-24">
            <h2 className="text-center text-base text-white font-dana-regular">
              {content[selectedSlide].title}
            </h2>
            <p className="text-xs text-white font-dana-regular leading-[2] mt-[17px]">
              {content[selectedSlide].content}
            </p>
          </article>
        </div>
      </section>

      <section className="info-slider-button-holder fixed bottom-0 left-0 w-full z-20">
        <div className="container px-6 pt-16 pb-6">
          <div className="flex gap-x-2">
            {selectedSlide + 1 === 1 ? (
              <Button
                type="primary"
                style="max-w-[152px] mr-auto"
                onClick={handleNext}
              >
                بعدی
              </Button>
            ) : (selectedSlide + 1 > 1) &
              (selectedSlide + 1 < content.length) ? (
              <Fragment>
                <Button
                  type="secondary"
                  style="max-w-[152px]"
                  onClick={handlePrev}
                >
                  قبلی
                </Button>
                <Button
                  type="primary"
                  style="max-w-[152px]"
                  onClick={handleNext}
                >
                  بعدی
                </Button>
              </Fragment>
            ) : (
              selectedSlide + 1 === content.length && (
                <Button type="primary" onClick={goToHome}>
                  ورود به بازی
                </Button>
              )
            )}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
