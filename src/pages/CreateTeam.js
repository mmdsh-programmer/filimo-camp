import React from "react";
import Background from "components/Background";
import Back from "components/Back";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Button from "components/Button";
import { useNavigate } from "react-router-dom";

export default function CreateTeam() {
  const navigator = useNavigate();
  return (
    <main className="min-h-screen-">
      <Background />
      <Back style="mb-6">تیم‌سازی</Back>

      <section className="mt-2">
        <div className="container px-6">
          <h2 className="text-sm text-white font-dana-regular">
            تصویر و عنوان تیم خود را انتخاب کنید
          </h2>
        </div>

        <div className="container md:px-6">
          <div className="w-full h-[334px] mt-[85px]">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
              loop={true}
              centeredSlides={true}
              className="create-team-avatar-selection"
            >
              <SwiperSlide>
                <div className="inner-slide w-[184px] h-fit rounded-full overflow-hidden transition-all duration-500 ease-in-out avatar-background flex flex-col">
                  <div className="w-44 h-44 overflow-hidden rounded-full self-center">
                    <img
                      className="w-full h-full object-cover"
                      src={require("images/common/avatars/woman.webp")}
                      alt="avatar image"
                    />
                  </div>

                  <h3 className="w-full text-center mt-[22px] mb-6 slider-text">
                    <span className="block font-dana-regular text-base text-[#1d1d1d]">
                      تیم
                    </span>
                    <span className="block font-dana-regular text-[22px] text-[#1d1d1d]">
                      شاهین-126
                    </span>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inner-slide w-[184px] h-fit rounded-full overflow-hidden transition-all duration-500 ease-in-out avatar-background flex flex-col">
                  <div className="w-44 h-44 overflow-hidden rounded-full self-center">
                    <img
                      className="w-full h-full object-cover"
                      src={require("images/common/avatars/man.webp")}
                      alt="avatar image"
                    />
                  </div>

                  <h3 className="w-full text-center mt-[22px] mb-6 slider-text">
                    <span className="block font-dana-regular text-base text-[#1d1d1d]">
                      تیم
                    </span>
                    <span className="block font-dana-regular text-[22px] text-[#1d1d1d]">
                      اصغر-352
                    </span>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inner-slide w-[184px] h-fit rounded-full overflow-hidden transition-all duration-500 ease-in-out avatar-background flex flex-col">
                  <div className="w-44 h-44 overflow-hidden rounded-full self-center">
                    <img
                      className="w-full h-full object-cover"
                      src={require("images/common/avatars/flash.webp")}
                      alt="avatar image"
                    />
                  </div>

                  <h3 className="w-full text-center mt-[22px] mb-6 slider-text">
                    <span className="block font-dana-regular text-base text-[#1d1d1d]">
                      تیم
                    </span>
                    <span className="block font-dana-regular text-[22px] text-[#1d1d1d]">
                      فلش-252
                    </span>
                  </h3>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      <section className="fixed bottom-0 left-0 w-full">
        <div className="container px-6 pb-[27px]">
          <div className="flex gap-x-2">
            <Button type="disabled" style="w-[120px]">انصراف</Button>
            <Button type="primary" style="flex-[1]" onClick={() => navigator("/leader-board/teams/add-teammate")}>ثبت تیم</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
