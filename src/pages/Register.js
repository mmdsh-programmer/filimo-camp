import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TextField from "Components/TextField";
import Button from "Components/Button";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { Login } from 'Helper/login'
import { motion } from "framer-motion";
import { avatars } from "Helper/avatars";
import Fetch from "../Helper/loginFetch";

export default function Register() {
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const [urlRef, setUrlRef] = useState(null);
  const [refValue, setrefValue] = useState(null);
  const [avatar, setAvatar] = useState(0);
  const [loading, setLoading] = useState(false);
  const [FilimoId,setFilimoId]=useState(858585);
  const [avatarCode,setavatarCode]=useState(125);
  useEffect(() => {
    setrefValue(searchParams.get("ref"));
    const swiper = document.querySelector(".register-avatar-selection").swiper;

    swiper.on("click", function () {
      this.slideTo(this.clickedIndex, 500, true);
    });

    swiper.on("slideChange", function () {
      setAvatar(this.activeIndex);
      setavatarCode(avatars[this.activeIndex].id);
  
    });


  }, []);

  const handleRegistration = async() => {
    var raw = JSON.stringify({
      "filimo_id": FilimoId,
      "referral_code": refValue,
      "avator_code": String(avatarCode),
    });

    const loginUrl = await Fetch({
      url: 'http://37.152.185.94:8001/user/login/',
      method: 'POST',
      data: raw,
      headers: {
        'X-CSRFToken': 'EtWI8gO2TPYM5O2iMrzmmjRwL11vnrZUqlUkGYNxXOptltPJk9AABsUKaO8sBeH0',

      },
      redirect: 'follow'
    });

    if (!('ERROR' in loginUrl)) {
      localStorage.setItem('filimo:ACCESS_TOKEN', loginUrl.data.access);

      navigator('/');
    } else {

    }

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
              {avatars.map(({ mainUrl }, avatarIndex) => (
                <SwiperSlide key={avatarIndex}>
                  <div className="inner-slide w-[131px] h-[131px] rounded-full overflow-hidden transition-all duration-500 ease-in-out flex">
                    <div className="w-[131px] h-[131px] overflow-hidden rounded-full self-center">
                      <img
                        className="w-full h-full object-cover"
                        src={require(`images/common/avatars/${mainUrl}`)}
                        alt={`avatar ${avatarIndex}`}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
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
            style={{ input: "pt-2", label: "mt-[5px]" }}
            value={refValue}
            onInput={e => setrefValue(e.target.value)}
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
