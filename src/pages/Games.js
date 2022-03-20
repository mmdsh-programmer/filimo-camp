import React, { useEffect, useRef, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "Components/Modal";
import Button from "Components/Button";
import Fetch from "Helper/Fetch";
import { toast } from "react-toastify";

export default function Games() {
  const { id } = useParams();
  const navigator = useNavigate();
  const [gameSource, setGameSource] = useState(null);
  const [openEndModal, setOpenEndModal] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [modalText, setModalText] = useState("");
  const storageAddress = useRef(null);

  const syncScore = () => {
    if (localStorage.getItem(storageAddress.current) !== null) {
      if (localStorage.getItem(storageAddress.current) >= 500) {
        setModalText("امتیاز شما به حد اکثر امتیاز بازی (500) رسیده است!");
      } else {
        setModalText("");
      }
      setOpenEndModal(true);
    }

    const totalScore = localStorage.getItem(storageAddress.current);
    setFinalScore(totalScore);
    // console.log("storage value changed! ", +totalScore);
  };

  const handleSubmit = async () => {
    if (+finalScore >= 500) {
      navigator("/");
    } else {
      setOpenEndModal(false);
    }

    const raw = JSON.stringify({
      value: +finalScore >= 500 ? 500 : +finalScore,
    });
    const idGame = localStorage.getItem(`GameIdFilimoCam::${id}`);

    const sendScore = await Fetch({
      url: process.env.REACT_APP_API_URL + `/play-game/${idGame}/`,
      method: "POST",
      data: raw,
      redirect: "follow",
    });

    if (!("ERROR" in sendScore)) {
      toast.success("امتیاز بازی با موفقیت ذخیره شد");
      localStorage.removeItem(storageAddress.current);
      navigator("/");

    } else {
      navigator("/");
    }
  };

  const handleCloseModal = () => {
    setOpenEndModal(false);
  };

  useEffect(() => {
    indexedDB.deleteDatabase("localforage");
    if (localStorage.getItem(`GameIdFilimoCam::${id}`) === null) {
      navigator("/");
    }
    switch (+id) {
      case 1:
      case 9:
        localStorage.removeItem("tap_the_tile_score");
        setGameSource(`/games/tap-the-tile/index.html`);
        storageAddress.current = "tap_the_tile_score";
        break;
      case 2:
      case 10:
        localStorage.removeItem("bubble_shooter_score");

        setGameSource(`/games/bubble-shooter/index.html`);
        storageAddress.current = "bubble_shooter_score";
        break;
      case 3:
      case 11:
        localStorage.removeItem("jelly_island_score");

        setGameSource(`/games/jelly-island/index.html`);
        storageAddress.current = "jelly_island_score";
        break;

      case 7:
      case 12:
        localStorage.removeItem("lights_score");

        setGameSource(`/games/lights/index.html`);
        storageAddress.current = "lights_score";
        break;
      case 5:
      case 13:
        localStorage.removeItem("sourcerer_score");

        setGameSource(`/games/sourcerer/index.html`);
        storageAddress.current = "sourcerer_score";
        break;
      case 6:
      case 14:
        localStorage.removeItem("2048_score");

        setGameSource(`/games/2048/index.html`);
        storageAddress.current = "2048_score";
        break;

      case 15:
        localStorage.removeItem("box_tower_score");

        setGameSource(`/games/box-tower/index.html`);
        storageAddress.current = "box_tower_score";
        break;
      case 8:
      case 4:
        localStorage.removeItem("maze_score");

        setGameSource(`/games/maze/index.html`);
        storageAddress.current = "maze_score";
        break;
      default:
        navigator("/");
        break;
    }

    window.addEventListener("storage", syncScore);

    return () => window.removeEventListener("storage", syncScore);
  }, []);

  return (
    <Fragment>
      <main className="min-h-screen">
        <iframe
          title="games"
          className="w-full h-screen"
          src={gameSource}
          frameBorder="0"
        />
      </main>

      <Modal
        alignCenter
        width={360}
        isOpen={openEndModal}
        setIsOpen={setOpenEndModal}
        backdropClose={false}
      >
        <div className="container px-6 py-4">
          <h2 className="text-right text-base mb-6 font-dana-regular text-[#1d1d1d]">
            نتیجه بازی
          </h2>

          <p className="mt-2 text-base font-dana-regular leading-6">
            امتیاز شما از این بازی : {finalScore}
            <br />
            {modalText}
          </p>

          <Button type="primary" style="mt-4" onClick={handleSubmit}>
            پایان بازی
          </Button>

          {+finalScore < 500 && (
            <Button type="secondary" style="mt-2" onClick={handleCloseModal}>
              ادامه
            </Button>
          )}
        </div>
      </Modal>
    </Fragment>
  );
}
