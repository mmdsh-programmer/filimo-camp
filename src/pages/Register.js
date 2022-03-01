import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TextField from "components/TextField";
import Button from "components/Button";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const [urlRef, setUrlRef] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUrlRef(searchParams.get("ref"));
  }, []);

  const handleRegistration = () => {
    console.log(urlRef);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("login", true);
      navigator("/");
    }, 3000);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <section>
        <div className="container py-4 px-6 2xl:pt-16 2xl:pb-14 2xl:max-w-[1440px]">
          <h1 className="text-base text-black font-dana-regular">ثبت نام</h1>
        </div>
      </section>

      <section>
        <div className="container 2xl:max-w-[968px]">
          <h2 className="text-sm text-[#333] font-dana-regular text-center mt-2 leading-7 2xl:mt-0">
            یه عکس برای خودت انتخاب کن
          </h2>

          <div className="w-full h-[146px] mt-10">
            <Swiper
              slidesPerView={2}
              breakpoints={{
                1440: {
                  slidesPerView: 5,
                },
              }}
              centeredSlides={true}
              className="register-avatar-selection"
            >
              <SwiperSlide>
                <div className="inner-slide w-[131px] h-[131px] rounded-full overflow-hidden transition-all duration-500 ease-in-out flex">
                  <div className="w-[131px] h-[131px] overflow-hidden rounded-full self-center">
                    <img
                      className="w-full h-full object-cover"
                      src={require("images/common/avatars/woman.webp")}
                      alt="avatar image"
                    />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inner-slide w-[131px] h-[131px] rounded-full overflow-hidden transition-all duration-500 ease-in-out flex">
                  <div className="w-[131px] h-[131px] overflow-hidden rounded-full self-center">
                    <img
                      className="w-full h-full object-cover"
                      src={require("images/common/avatars/man.webp")}
                      alt="avatar image"
                    />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inner-slide w-[131px] h-[131px] rounded-full overflow-hidden transition-all duration-500 ease-in-out flex">
                  <div className="w-[131px] h-[131px] overflow-hidden rounded-full self-center">
                    <img
                      className="w-full h-full object-cover"
                      src={require("images/common/avatars/flash.webp")}
                      alt="avatar image"
                    />
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      <section className="mt-[62px] mb-24 2xl:mb-4">
        <div className="container px-6">
          <TextField
            type="text"
            name="referal-code"
            placeholder=" "
            label="کد معرف"
            defaultValue={urlRef}
            style={{ input: "pt-2", label: "mt-[5px]" }}
          />
        </div>
      </section>

      <section className="fixed bottom-0 left-0 bg-white w-full 2xl:relative">
        <div className="container px-6 pb-[27px]">
          <div className="flex justify-center">
            <Button
              autoWidth={loading}
              loading={loading}
              type="primary"
              disabled={loading}
              onClick={handleRegistration}
            >
              ورود و ثبت‌نام از فیلیمو
            </Button>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
