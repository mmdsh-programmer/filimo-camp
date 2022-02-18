import React from "react";
import styles from "styles/Team.module.scss";
import { Link } from "react-router-dom";

export default function Team() {
  const randomColor = () => {
    const badgeColors = ["#e9c61a", "#d3d3d3", "#e98e1a", "#1a95e9", "#891ae9"];
    return badgeColors[Math.floor(Math.random() * badgeColors.length)];
  };

  return (
    <main className="bg-white min-h-screen">
      <section className="container px-4 pt-4">
        <h1 className="text-base default-title-color">جدول امتیازات (تیمی)</h1>
      </section>

      <section className={`${styles["team-holder"]} my-6`}>
        <div className="container px-4">
          <ul className="list-none flex flex-col gap-y-2">
            <li className="custom-list-item p-2 flex items-center">
              <div className={`${styles["team-logo-holder"]} relative ml-2`}>
                <div
                  className={`${styles["team-logo"]} w-8 h-8 overflow-hidden rounded-full`}
                >
                  {/* <img
                    className="w-full h-full object-cover"
                    src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
                    alt="team-logo"
                  /> */}
                </div>

                <div
                  className={`${styles["logo-badge"]} absolute rounded-full`}
                  style={{ backgroundColor: randomColor() }}
                ></div>
              </div>

              <span
                className={`${styles["team-name"]} text-base default-title-color ml-2 overflow-hidden text-ellipsis text-right`}
              >
                تیم تهران
              </span>

              <span className={`${styles["team-count"]} text-sm ml-auto`}>
                ۷نفر
              </span>

              <span className="text-sm default-title-color">۲۳۴.۷۸۹</span>
            </li>

            <li className="custom-list-item p-2 flex items-center">
              <div className={`${styles["team-logo-holder"]} relative ml-2`}>
                <div
                  className={`${styles["team-logo"]} w-8 h-8 overflow-hidden rounded-full`}
                >
                  {/* <img
                    className="w-full h-full object-cover"
                    src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
                    alt="team-logo"
                  /> */}
                </div>

                <div
                  className={`${styles["logo-badge"]} absolute rounded-full`}
                  style={{ backgroundColor: randomColor() }}
                ></div>
              </div>

              <span
                className={`${styles["team-name"]} text-base default-title-color ml-2 overflow-hidden text-ellipsis text-right`}
              >
                تیم مسعود
              </span>

              <span className={`${styles["team-count"]} text-sm ml-auto`}>
                ۷نفر
              </span>

              <span className="text-sm default-title-color">۲۳۴.۷۸۹</span>
            </li>

            <li className="custom-list-item p-2 flex items-center">
              <div className={`${styles["team-logo-holder"]} relative ml-2`}>
                <div
                  className={`${styles["team-logo"]} w-8 h-8 overflow-hidden rounded-full`}
                >
                  {/* <img
                    className="w-full h-full object-cover"
                    src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
                    alt="team-logo"
                  /> */}
                </div>

                <div
                  className={`${styles["logo-badge"]} absolute rounded-full`}
                  style={{ backgroundColor: randomColor() }}
                ></div>
              </div>

              <span
                className={`${styles["team-name"]} text-base default-title-color ml-2 overflow-hidden text-ellipsis text-right`}
              >
                تیم ساری
              </span>

              <span className={`${styles["team-count"]} text-sm ml-auto`}>
                ۷نفر
              </span>

              <span className="text-sm default-title-color">۲۳۴.۷۸۹</span>
            </li>

            <li className="custom-list-item p-2 flex items-center">
              <div className={`${styles["team-logo-holder"]} relative ml-2`}>
                <div
                  className={`${styles["team-logo"]} w-8 h-8 overflow-hidden rounded-full`}
                >
                  {/* <img
                    className="w-full h-full object-cover"
                    src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
                    alt="team-logo"
                  /> */}
                </div>

                <div
                  className={`${styles["logo-badge"]} absolute rounded-full`}
                  style={{ backgroundColor: randomColor() }}
                ></div>
              </div>

              <span
                className={`${styles["team-name"]} text-base default-title-color ml-2 overflow-hidden text-ellipsis text-right`}
              >
                تیم ایمان
              </span>

              <span className={`${styles["team-count"]} text-sm ml-auto`}>
                ۳ نفر
              </span>

              <span className="text-sm default-title-color">۲۳۴.۷۸۹</span>
            </li>

            <li className="custom-list-item p-2 flex items-center">
              <div className={`${styles["team-logo-holder"]} relative ml-2`}>
                <div
                  className={`${styles["team-logo"]} w-8 h-8 overflow-hidden rounded-full`}
                >
                  {/* <img
                    className="w-full h-full object-cover"
                    src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
                    alt="team-logo"
                  /> */}
                </div>

                <div
                  className={`${styles["logo-badge"]} absolute rounded-full`}
                  style={{ backgroundColor: randomColor() }}
                ></div>
              </div>

              <span
                className={`${styles["team-name"]} text-base default-title-color ml-2 overflow-hidden text-ellipsis text-right`}
              >
                تیم یلدا
              </span>

              <span className={`${styles["team-count"]} text-sm ml-auto`}>
                ۵ نفر
              </span>

              <span className="text-sm default-title-color">۲۳۴.۷۸۹</span>
            </li>

            <li className="custom-list-item active">
              <Link to="/team/1" className="p-2 flex items-center">
                <div className={`${styles["team-logo-holder"]} relative ml-2`}>
                  <div
                    className={`${styles["team-logo"]} w-8 h-8 overflow-hidden rounded-full`}
                  >
                    {/* <img
                    className="w-full h-full object-cover"
                    src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
                    alt="team-logo"
                  /> */}
                  </div>

                  <div
                    className={`${styles["logo-badge"]} absolute rounded-full`}
                    style={{ backgroundColor: randomColor() }}
                  ></div>
                </div>

                <span
                  className={`${styles["team-name"]} text-base default-title-color ml-2 overflow-hidden text-ellipsis text-right`}
                >
                  تیم شما
                </span>

                <span className={`${styles["team-count"]} text-sm ml-auto`}>
                  ۵ نفر
                </span>

                <span className="text-sm default-title-color">۲۳۴.۷۸۹</span>
              </Link>
            </li>

            <li className="custom-list-item p-2 flex items-center">
              <div className={`${styles["team-logo-holder"]} relative ml-2`}>
                <div
                  className={`${styles["team-logo"]} w-8 h-8 overflow-hidden rounded-full`}
                >
                  {/* <img
                    className="w-full h-full object-cover"
                    src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
                    alt="team-logo"
                  /> */}
                </div>

                <div
                  className={`${styles["logo-badge"]} absolute rounded-full`}
                  style={{ backgroundColor: randomColor() }}
                ></div>
              </div>

              <span
                className={`${styles["team-name"]} text-base default-title-color ml-2 overflow-hidden text-ellipsis text-right`}
              >
                تیم یلدا
              </span>

              <span className={`${styles["team-count"]} text-sm ml-auto`}>
                ۵ نفر
              </span>

              <span className="text-sm default-title-color">۲۳۴.۷۸۹</span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
