import { React, useState } from "react";
import styles from "styles/Home.module.scss";
import Menu from "Components/Menu";
import BottomSheet from "Components/BottomSheet";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <section className="button-holder">
        <div className="container">
          <div className="flex px-6 py-4">
            <button
              className={`${styles["button-register"]} text-base`}
              onClick={() => setIsOpen(true)}
            >
              ثبت نام
            </button>
          </div>
        </div>
      </section>

      <section className="map-holder mt-6">
        <div className="container">
          <figure className={`${styles["map-holder"]} mx-auto`}>
            <img
              src={`${process.env.PUBLIC_URL}/images/home/game-map.jpg`}
              alt="game map"
              title="نقشه بازی"
              className="w-full h-full object-cover"
            />
          </figure>
        </div>
      </section>

      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
      <BottomSheet
        isOpen={isBottomSheetOpen}
        setIsOpen={setIsBottomSheetOpen}
      />
    </main>
  );
}
