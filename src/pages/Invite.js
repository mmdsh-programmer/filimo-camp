import { React, useState } from "react";
import styles from "styles/Invite.module.scss";
import SimpleBottomSheet from "components/SimpleBottomSheet";
import TextField from "components/TextField";

export default function Invite() {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const handleBottomSheetOpen = () => {
    setOpenBottomSheet(true);
  };

  const handleBottomSheetClose = () => {
    setOpenBottomSheet(false);
  };

  return (
    <main className="bg-white">
      <section className="mb-2">
        <div className="container px-6 py-4">
          <h1 className="text-base default-title-color">معرفی دوستان</h1>
        </div>
      </section>
      <section className={`${styles["invitees-holder"]} overflow-y-auto`}>
        <div className="container px-6">
          <ul className="flex flex-col list-none gap-y-2">
            <li className={`${styles["invitees-item"]} flex p-2`}>
              <span
                className={`${styles["invitee-phone"]} default-title-color text-base ml-2`}
              >
                ۰۹۱۲۳۴۵۷۶۸۹
              </span>
              <span className="default-title-color text-sm ml-auto">
                به مسابقه وارد شد
              </span>
              <span className={`${styles["score"]} default-title-color`}>
                <span>امتیاز</span>۵+
              </span>
            </li>

            <li className={`${styles["invitees-item"]} flex p-2`}>
              <span
                className={`${styles["invitee-phone"]} default-title-color text-base ml-2`}
              >
                ۰۹۱۲۳۴۵۷۶۸۹
              </span>
              <span className="default-title-color text-sm ml-auto">
                به مسابقه وارد شد
              </span>
              <span className={`${styles["score"]} default-title-color`}>
                <span>امتیاز</span>۵+
              </span>
            </li>

            <li className={`${styles["invitees-item"]} flex p-2`}>
              <span
                className={`${styles["invitee-phone"]} default-title-color text-base ml-2`}
              >
                ۰۹۱۲۳۴۵۷۶۸۹
              </span>
              <span className="default-title-color text-sm ml-auto">
                به مسابقه وارد شد
              </span>
              <span className={`${styles["score"]} default-title-color`}>
                <span>امتیاز</span>۵+
              </span>
            </li>

            <li className={`${styles["invitees-item"]} flex p-2`}>
              <span
                className={`${styles["invitee-phone"]} default-title-color text-base ml-2`}
              >
                ۰۹۱۲۳۴۵۷۶۸۹
              </span>
              <span className="default-title-color text-sm ml-auto">
                ثبت انجام شد
              </span>
              <span className={`${styles["score"]} default-title-color`}>
                -
              </span>
            </li>

            <li className={`${styles["invitees-item"]} flex p-2`}>
              <span
                className={`${styles["invitee-phone"]} default-title-color text-base ml-2`}
              >
                ۰۹۱۲۳۴۵۷۶۸۹
              </span>
              <span className="default-title-color text-sm ml-auto">
                پیامک ارسال شد
              </span>
              <span className={`${styles["score"]} default-title-color`}>
                -
              </span>
            </li>
          </ul>
        </div>
      </section>
      <section
        className={`${styles["invite-action"]} fixed bottom-6 left-0 right-0 bg-white`}
      >
        <div className="container px-6">
          <div className={`${styles["info"]} p-2 mt-4`}>
            <p className="text-sm default-title-color">
              شما می‌توانید دوستان خود را به کمپین معرفی کنید و برای معرفی هر
              دوست وارد شده به کمپین ۵ امتیاز دریافت کنید.
            </p>
          </div>

          <button
            className={`text-base ${styles["disable"]} w-full mt-4`}
            onClick={handleBottomSheetOpen}
          >
            معرفی به دوستان
          </button>
        </div>
      </section>

      <SimpleBottomSheet
        isOpen={openBottomSheet}
        callBack={handleBottomSheetClose}
      >
        <div className="container px-6 py-4">
          <h2 className="text-right text-base mb-6 default-title-color">
            دعوت از دوستان
          </h2>

          <TextField type="text" name="phone" placeholder=" " label="موبایل" />

          <p className={`${styles["invite-info-text"]} mt-2 text-xs`}>
            شماره دوست خود را وارد کنید تا از این کمپین مطلع شود. لینک از طریق
            sms برای او ارسال شود. به ازای هر یک از دوستان که اولین بازی را
            انجام دهند ۵ امتیاز برای شما ثبت می‌شود.
          </p>

          <div className={`${styles["custom-flex"]} flex mt-6`}>
            <button
              className={`${styles["bottom-sheet-buttons"]} ${styles["outlined"]} text-base p-2 text-center w-full`}
            >
              کپی لینک دعوت
            </button>
            <button
              className={`${styles["bottom-sheet-buttons"]} ${styles["fill"]} ${styles["main"]} text-base p-2 text-center w-full`}
            >
              ارسال پیامک
            </button>
          </div>
        </div>
      </SimpleBottomSheet>
    </main>
  );
}
