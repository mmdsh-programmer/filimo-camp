import React, { useEffect, useState } from "react";
import Back from "Components/Back";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Button from "Components/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Keyboard } from "swiper";
import { flags } from "Helper/flags";
import Fetch from "Helper/Fetch";
import { toast } from "react-toastify";

export default function CreateTeam() {
  const navigator = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  const colorLuminance = (hex, lum) => {
    hex = String(hex).replace(/[^0-9a-f]/gi, "");
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    var rgb = "#",
      c,
      i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
      rgb += ("00" + c).substr(c.length);
    }
    return rgb;
  };
  const CreateTeamReq = async() => {
    let teamName;
    let teamavatarId;
    flags.map((item, index) => {
      if ((index+1) === selectedImage) {
        teamName = item.title;
        teamavatarId= item.id;
      }
    })
    var raw = JSON.stringify({
      "name": teamName,
      "avator_code": teamavatarId,
    });

    const teamReq = await Fetch({
      url: 'http://37.152.185.94:8001/user/create-team/',
      method: 'POST',
      data: raw,
    });
    if (!('ERROR' in teamReq)) {
      toast.success('تیم شما با موفقیت افزوده شد');
      navigator("/leader-board/teams/add-teammate");
    }
    else{
      toast.error('خطا در افزودن تیم');
    }

  }
  useEffect(() => {
    const swiper = document.querySelector(
      ".create-team-avatar-selection"
    ).swiper;

    swiper.on("click", function () {
      this.slideTo(this.clickedIndex, 500, true);
    });

    swiper.on("slideChange", function () {
      setSelectedImage(this.activeIndex);
      console.log(this.activeIndex);
    });
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Back style="mb-6">تیم‌سازی</Back>

      <section className="mt-2 2xl:mt-11">
        <div className="container px-6">
          <h2 className="text-sm text-white font-dana-regular 2xl:text-center">
            تصویر و عنوان تیم خود را انتخاب کنید
          </h2>
        </div>

        <div className="container md:px-6 2xl:max-w-[968px]">
          <div className="w-full h-[334px] mt-[85px]">
            <Swiper
              slidesPerView={2}
              spaceBetween={10}
              keyboard={{
                enabled: true,
              }}
              breakpoints={{
                1440: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
              centeredSlides={true}
              modules={[Keyboard]}
              className="create-team-avatar-selection"
            >
              {flags.map(({ id, url, bg, title }, flagIndex) => (
                <SwiperSlide key={id}>
                  <div
                    className="inner-slide w-[184px] h-fit rounded-br-full bg-opacity-0 rounded-bl-full overflow-hidden transition-all duration-500 ease-in-out avatar-background flex flex-col border-opacity-0"
                    style={
                      flagIndex === selectedImage
                        ? { backgroundColor: colorLuminance(bg, -0.3) }
                        : {}
                    }
                  >
                    <h3 className="w-full text-center my-5 slider-text">
                      <span className="block font-dana-regular text-base text-white">
                        تیم
                      </span>
                      <span className="block font-dana-regular text-[22px] text-white">
                        {title}
                      </span>
                    </h3>
                    <div className="image-holder w-44 h-44 overflow-hidden rounded-full self-center">
                      <img
                        className="w-full h-full object-cover"
                        src={require(`images/common/flags/${url}`)}
                        alt={`flag ${flagIndex}`}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="fixed bottom-0 left-0 w-full 2xl:relative 2xl:mt-16">
        <div className="container px-6 pb-[27px] 2xl:px-0">
          <div className="flex gap-x-2 2xl:flex-wrap 2xl:gap-y-2">
            <Button type="secondary" style="w-[120px] 2xl:w-full">
              انصراف
            </Button>
            <Button
              type="primary"
              style="flex-[1] 2xl:w-full"
              onClick={() => {
                CreateTeamReq(); 
              }}
            >
              ثبت تیم
            </Button>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
