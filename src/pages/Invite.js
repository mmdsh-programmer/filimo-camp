import { React, useState } from "react";
import styles from "styles/Invite.module.scss";
import SimpleBottomSheet from "components/SimpleBottomSheet";
import TextField from "components/TextField";
import Background from "components/Background";
import Back from "components/Back";
import Button from "components/Button";

export default function Invite() {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const handleBottomSheetOpen = () => {
    setOpenBottomSheet(true);
  };

  const handleBottomSheetClose = () => {
    setOpenBottomSheet(false);
  };

  return (
    <main>
      <Background />
      <Back style="mb-6">معرفی دوستان</Back>
      <section className={`${styles["invitees-holder"]} overflow-y-auto`}>
        <div className="container px-4">
          <dl className="list-none flex flex-col gap-y-2 mt-4">
            <dt className="font-dana-regular text-sm text-[#aa59c0]">
              معرفی شده‌های فعال
            </dt>
            <dd className="p-2 flex items-center rounded-[10px] relative overflow-hidden">
              <div className="opacity-10 bg-[#f9f9f9] absolute left-0 top-0 -z-1 w-full h-full"></div>
              <span className="text-base text-white text-right font-dana-medium ml-6 leading-[1.81] block mt-1">
                09123457689
              </span>

              <span className="text-xs text-white font-dana-regular ml-auto mt-1">
                به مسابقه وارد شد
              </span>

              <span className="flex font-dana-regular text-white items-center mt-1">
                <span className="text-[10px] ml-[6px]">امتیاز</span>
                <span className="text-sm">5+</span>
              </span>
            </dd>
            <dd className="p-2 flex items-center rounded-[10px] relative overflow-hidden">
              <div className="opacity-10 bg-[#f9f9f9] absolute left-0 top-0 -z-1 w-full h-full"></div>
              <span className="text-base text-white text-right font-dana-medium ml-6 leading-[1.81] block mt-1">
                09123457689
              </span>

              <span className="text-xs text-white font-dana-regular ml-auto mt-1">
                به مسابقه وارد شد
              </span>

              <span className="flex font-dana-regular text-white items-center mt-1">
                <span className="text-[10px] ml-[6px]">امتیاز</span>
                <span className="text-sm">5+</span>
              </span>
            </dd>
            <dd className="p-2 flex items-center rounded-[10px] relative overflow-hidden">
              <div className="opacity-10 bg-[#f9f9f9] absolute left-0 top-0 -z-1 w-full h-full"></div>
              <span className="text-base text-white text-right font-dana-medium ml-6 leading-[1.81] block mt-1">
                09123457689
              </span>

              <span className="text-xs text-white font-dana-regular ml-auto mt-1">
                به مسابقه وارد شد
              </span>

              <span className="flex font-dana-regular text-white items-center mt-1">
                <span className="text-[10px] ml-[6px]">امتیاز</span>
                <span className="text-sm">5+</span>
              </span>
            </dd>
          </dl>

          <dl className="list-none flex flex-col gap-y-2 mt-4">
            <dt className="font-dana-regular text-sm text-[#aa59c0]">
              دوستان دعوت شده
            </dt>
            <dd className="p-2 flex items-center rounded-[10px] relative overflow-hidden">
              <div className="opacity-10 bg-[#f9f9f9] absolute left-0 top-0 -z-1 w-full h-full"></div>
              <span className="text-base text-white text-right font-dana-medium ml-6 leading-[1.81] block mt-1">
                09123457689
              </span>

              <span className="text-xs text-white font-dana-regular ml-auto mt-1">
                ثبت نام انجام شد
              </span>

              <span className="text-white mt-1">-</span>
            </dd>
            <dd className="p-2 flex items-center rounded-[10px] relative overflow-hidden">
              <div className="opacity-10 bg-[#f9f9f9] absolute left-0 top-0 -z-1 w-full h-full"></div>
              <span className="text-base text-white text-right font-dana-medium ml-6 leading-[1.81] block mt-1">
                09123457689
              </span>

              <span className="text-xs text-white font-dana-regular ml-auto mt-1">
                ثبت نام انجام شد
              </span>

              <span className="text-white mt-1">-</span>
            </dd>
          </dl>
        </div>
      </section>

      <section
        className={`${styles["invite-action"]} fixed bottom-0 left-0 right-0`}
      >
        <div className="container px-4 pb-6">
          <div className="p-4 my-4 border-[1px] border-opacity-10 border-white rounded-[10px] bg-white bg-opacity-5">
            <p className="text-sm text-white font-dana-regular text-opacity-50">
              شما می‌توانید دوستان خود را به کمپین معرفی کنید و برای معرفی هر
              دوست وارد شده به کمپین ۵ امتیاز دریافت کنید.
            </p>
          </div>

          <Button type="primary" onClick={handleBottomSheetOpen}>
            معرفی به دوستان
          </Button>
        </div>
      </section>

      <SimpleBottomSheet
        isOpen={openBottomSheet}
        setIsOpen={setOpenBottomSheet}
        style="bg-white"
      >
        <div className="container px-6 py-4">
          <h2 className="text-right text-base mb-6 font-dana-regular text-[#1d1d1d]">
            دعوت از دوستان
          </h2>

          <TextField type="text" name="phone" placeholder=" " label="موبایل" />

          <p
            className={`${styles["invite-info-text"]} mt-2 text-xs font-dana-regular`}
          >
            شماره دوست خود را وارد کنید تا از این کمپین مطلع شود. لینک از طریق
            sms برای او ارسال شود. به ازای هر یک از دوستان که اولین بازی را
            انجام دهند ۵ امتیاز برای شما ثبت می‌شود.
          </p>

          <div className="flex items-center bg-[#ddd] rounded-[10px] bg-opacity-30 mt-4 p-[3px]">
            <span className="block font-dana-regular text-[#4c4c4c] text-xs leading-[1.8] ml-auto mr-2 mt-1">
              camp.filimo.com/eyd1400/team
            </span>

            <button className="font-dana-medium text-sm text-[#f78e32] py-3 px-2 bg-white rounded-[10px]">
              کپی لینک
            </button>
          </div>

          <Button type="primary" style="mt-4">
            ارسال پیامک
          </Button>
        </div>
      </SimpleBottomSheet>
    </main>
  );
}
