import React from "react";
import styles from "styles/Test.module.scss";

export default function Test() {
  return (
    <main className="bg-white h-screen">
      <div className="container p-6">
        <div className="flex flex-col">
          <h1 className="text-base default-title-color">سوال</h1>
          <span className="sub-title">مرحله ۱۴</span>
        </div>

        <div className={`${styles["question-container"]}`}>
          <h2 className="text-base default-title-color">
            کلاه شخصیت کلاه‌قرمزی چه رنگی است؟
          </h2>

          <div
            className={`${styles["question-image"]} w-full mt-4 max-h-56 overflow-hidden`}
          >
            {/* <img
              className="w-full h-full object-cover"
              src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
              alt="question image"
            /> */}
          </div>

          <div className={`${styles["question-answers"]}`}>
            <form>
              <ul className="flex flex-col gap-y-2 mt-12 mb-16">
                <li className={`${styles["answer-item"]} relative`}>
                  <input
                    className="sr-only peer"
                    type="radio"
                    value="نارنجی"
                    name="answer"
                    id="answer_1"
                  />
                  <label
                    className={`${styles["answer-label"]} text-sm text-black flex p-2 cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent`}
                    htmlFor="answer_1"
                  >
                    نارنجی
                  </label>
                </li>

                <li className={`${styles["answer-item"]} relative`}>
                  <input
                    className="sr-only peer"
                    type="radio"
                    value="قرمز"
                    name="answer"
                    id="answer_2"
                  />
                  <label
                    className={`${styles["answer-label"]} text-sm text-black flex p-2 cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent`}
                    htmlFor="answer_2"
                  >
                    قرمز
                  </label>
                </li>

                <li className={`${styles["answer-item"]} relative`}>
                  <input
                    className="sr-only peer"
                    type="radio"
                    value="سبز"
                    name="answer"
                    id="answer_3"
                  />
                  <label
                    className={`${styles["answer-label"]} text-sm text-black flex p-2 cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent`}
                    htmlFor="answer_3"
                  >
                    سبز
                  </label>
                </li>

                <li className={`${styles["answer-item"]} relative`}>
                  <input
                    className="sr-only peer"
                    type="radio"
                    value="آبی"
                    name="answer"
                    id="answer_4"
                  />
                  <label
                    className={`${styles["answer-label"]} text-sm text-black flex p-2 cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent`}
                    htmlFor="answer_4"
                  >
                    آبی
                  </label>
                </li>
              </ul>

              <div className="flex fixed left-0 bottom-0 w-full bg-white">
                <div className="container px-6 pb-6">
                  <button className="outlined-button p-2 w-full">
                    سوال بعدی
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
