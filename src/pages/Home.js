import { Fragment, React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Menu from "Components/Menu";
import SimpleBottomSheet from "Components/SimpleBottomSheet";
import ArrowLeftIcon from "icons/home/arrow-left-circle.svg";
import TickIcon from "icons/home/tick.svg";
import FilimoMap from "images/home/filimo-map.svg";
import StarIcon from "icons/home/star.svg";
import Button from "Components/Button";
import TransparentStarIcon from "icons/home/transparent-star.svg";
import BlueStarIcon from "icons/home/blue-star.svg";
import { useNavigate } from "react-router-dom";
import Modal from "Components/Modal";
import { motion } from "framer-motion";
import Header from "Components/Header";
import CustomTab from "Components/CustomTab";
import InfoIcon from "icons/home/info-icon.svg";
import TextField from "Components/TextField";
import EditIcon from "icons/home/edit-icon.svg";
import OtpInput from "react-otp-input";
import useWindowSize from "hooks/useWindowSize";
import { userData, Poster } from "Helper/helperFunc";
import { avatars, FindAvatarAdd } from "Helper/avatars";
import Fetch from "Helper/Fetch";
import { toast } from "react-toastify";
import { getTimeServer } from "Helper/helperFunc";
export default function Home() {
  const poster = useRef([]);
  const casual_levels = useRef([]);
  const mission_levels = useRef([]);
  const user_played_levels = useRef([]);
  const challengeLevel = useRef();
  const challengeLevelID = useRef();
  let levelState = useRef([]);
  const windowSize = useWindowSize();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); //menu state
  const [isLeaderBoardMenuOpen, setIsLeaderBoardMenuOpen] = useState(false); //menu state
  const [isSimpleBottomSheetOpen, setIsSimpleBottomSheetOpen] = useState(false); //common modal state
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); //for opening register modal
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false); //for opening challenge modal
  const [openPhoneNumberModal, setOpenPhoneNumberModal] = useState(false);
  const [openPhoneNumberBottomSheet, setOpenPhoneNumberBottomSheet] =
    useState(false); //for opening get phone number bottom sheet
  const [phoneNumberStep, setPhoneNumberStep] = useState(1);
  const [acceptOpenModal, setacceptOpenModal] = useState(false);
  const [otpState, setOtpState] = useState("");
  let playGameAgianId = useRef();
  let d1 = new Date("Tue Mar 13 2022 21:38:41 GMT+0330 (Iran Standard Time)");
  let d2;
  let diff;
  let daydiff = useRef();

  // console.log(levelState, Math.floor(daydiff));
  let [user, setUser] = useState();
  let [teamData, setteamData] = useState();
  let [userScorsTable, setuserScorsTable] = useState();
  let posterresult;
  const navigator = useNavigate();
  const test = async () => {
    let mostafa = await userData();

    setUser(mostafa[0]);
    setteamData(mostafa[1]);
  };
  // useEffect( () => {

  //   // windowSize >= 1440 ? setOpenPhoneNumberModal(true) : setOpenPhoneNumberBottomSheet(true);
  // }, []);
  useEffect(async () => {
    let d3 = await getTimeServer();
    d2 = new Date(d3);
    diff = d2.getTime() - d1.getTime();
    daydiff.current = diff / (1000 * 60 * 60 * 24);
    test();
    posterresult = await Poster();
    poster.current = [...posterresult];
    getDataGame();
    user_scores_table();

    // windowSize >= 1440 ? setOpenPhoneNumberModal(true) : setOpenPhoneNumberBottomSheet(true);
  }, []);

  const handleOpenProfileMenu = () => {
    setIsProfileMenuOpen(true);
  };

  const handleOpenLeaderBoardMenu = () => {
    setIsLeaderBoardMenuOpen(true);
  };

  const handleOpenSimpleModal = () => {
    setIsSimpleBottomSheetOpen(true);
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleOpenChallengeModal = () => {
    setIsChallengeModalOpen(!isChallengeModalOpen);
  };

  const hidePhoneNumber = (phoneNumber) => {
    if (phoneNumber)
      return phoneNumber.replace(phoneNumber.substr(4, 3), "***");
    else return 0;
  };

  const handleNextPhoneNumberStep = () => {
    setPhoneNumberStep(2);
  };
  const gamePlayAgain = async (id) => {
    // levelState.current[index].casual_levels_gaming = false;
    let levelNum;
    casual_levels.current.map((itemcasual_levels, indexcasual_levels) => {
      if (itemcasual_levels.id === id) {
        levelNum = itemcasual_levels.level;
      }
    });
    mission_levels.current.map(
      (itemmission_levels, indexitemmission_levels) => {
        if (itemmission_levels.id === id) {
          levelNum = itemmission_levels.level;
        }
      }
    );

    const user_scores_tableURL = await Fetch({
      url: process.env.REACT_APP_API_URL + `/play-again/${id}/`,
      method: "POST",
    });
    if (!("ERROR" in user_scores_tableURL)) {
      navigator(`/games/${levelNum}`);
    } else {
    }
  };
  const handlePrevPhoneNumberStep = () => {
    setPhoneNumberStep(1);
  };

  const handleOtpChange = (code) => {
    setOtpState(code);
    if (code.length === 5) {
      console.log("submit code");
    }
  };
  const getDataGame = async () => {
    const getDataGameURL = await Fetch({
      url: process.env.REACT_APP_API_URL + "/show-game-level/",
      method: "GET",
    });
    if (!("ERROR" in getDataGameURL)) {
      casual_levels.current = [...getDataGameURL.data.data.casual_levels];
      mission_levels.current = [...getDataGameURL.data.data.mission_levels];
      user_played_levels.current = [
        ...getDataGameURL.data.data.user_played_levels,
      ];

      casual_levels.current.map((item, index) => {
        if (
          item.unlock === true &&
          mission_levels.current[index].unlock === true
        ) {
          localStorage.setItem(`GameIdFilimoCam::${index + 1}`, item.id);

          index++;
          let obj = {
            lock: false,
            today: false,
          };
          levelState.current[index] = obj;
          console.log(levelState);
        } else {
          index++;

          let obj = {
            lock: true,
            today: false,
          };
          levelState.current[index] = obj;
        }

        levelState.current[index].casual_levels_gaming_agian = false;
        levelState.current[index].casual_levels_gaming = false;
        levelState.current[index].mission_levels_gaming = false;
      });
      user_played_levels.current.map((item, index) => {
        casual_levels.current.map((itemcasual_levels, indexcasual_levels) => {
          if (itemcasual_levels.id === item.score_type) {
            if (item.can_play_again === true) {
              levelState.current[
                itemcasual_levels.level
              ].casual_levels_gaming_agian = true;
            } else if (item.can_play_again === false) {
              levelState.current[
                itemcasual_levels.level
              ].casual_levels_gaming_agian = true;
              levelState.current[
                itemcasual_levels.level
              ].casual_levels_gaming = true;
            }
          }
        });
        mission_levels.current.map(
          (itemmission_levels, indexitemmission_levels) => {
            if (itemmission_levels.id === item.score_type) {
              levelState.current[
                itemmission_levels.level
              ].mission_levels_gaming = true;
            }
          }
        );
      });

      let obj = {
        lock: true,
        today: true,
      };
      levelState.current[Math.floor(daydiff.current)].today = true;
    } else {
      toast.error("خطا در دریافت جزییات بازی");
    }
  };

  const user_scores_table = async () => {
    const user_scores_tableURL = await Fetch({
      url: process.env.REACT_APP_API_URL + "/user_scores/",
      method: "GET",
    });
    if (!("ERROR" in user_scores_tableURL)) {
      setuserScorsTable(user_scores_tableURL.data.data);
    } else {
    }
  };
  const handleLevelClick = (level) => {
    if (
      casual_levels.current[level - 1] !== undefined &&
      mission_levels.current[level - 1] !== undefined
    ) {
      if (
        casual_levels.current[level - 1].unlock &&
        mission_levels.current[level - 1].unlock
      ) {
        toast.success(`به مرحله ${level} خوش امدید.`);
        challengeLevel.current = level;
        challengeLevelID.current = mission_levels.current[level - 1].id;
        console.log(windowSize);
        if (windowSize >= 1440) {
          handleOpenChallengeModal();
        } else {
          handleOpenSimpleModal();
        }
      } else {
        toast.error(`امکان بازی مرحله ${level} را ندارید.`);
      }
    } else {
      toast.error("هنوز این مرحله باز نشده است.");
    }
  };

  return (
    <Fragment>
      <Header />
      <Modal
        alignCenter
        isOpen={acceptOpenModal}
        setIsOpen={setacceptOpenModal}
      >
        <div className="container p-8">
          <p className="text-base text-black font-dana-regular ">
            آیا میخواهید دوباره بازی را انجام دهید؟{" "}
          </p>
          <p className="text-xs mt-3 text-black font-dana-regular ">
            در صورت تایید امتیاز شما صفر شده و دوباره بازی خواهی کرد.
          </p>
          <div className="flex gap-x-2 mt-8">
            <Button
              type="primary"
              onClick={() => gamePlayAgain(playGameAgianId.current)}
            >
              بله
            </Button>
            <Button
              type="secondary"
              onClick={() => {
                setacceptOpenModal(false);
              }}
            >
              خیر{" "}
            </Button>
          </div>
        </div>
      </Modal>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen 2xl:min-h-full 2xl:grid 2xl:grid-cols-[auto_320px_688px_320px_auto]"
      >
        <section className="sticky top-0 2xl:hidden">
          <div className="container p-6">
            <div className="p-[3px] rounded-[28.5px] shadow-[0_2px_7px_0_rgba(0,0,0,0.26)] flex bg-white items-center">
              <button className="w-6 h-6 mx-2" onClick={handleOpenProfileMenu}>
                <img
                  className="w-full h-full object-contain"
                  src={require("images/home/burger-menu-icon.png")}
                  alt="burger menu"
                />
              </button>
              <figure
                className="w-[42px] h-[42px] ml-[6px] overflow-hidden cursor-pointer"
                onClick={handleOpenProfileMenu}
              >
                <img
                  className="w-full h-full object-cover"
                  src={require(`images/common/avatars/${FindAvatarAdd(
                    parseInt(user?.avatar_code)
                  )}`)}
                  alt="avatar logo"
                />
              </figure>

              <span
                className="light-text font-dana-regular text-xs ml-auto block mt-1 text-right"
                dir="ltr"
              >
                {hidePhoneNumber(user?.mobile)}
              </span>

              <div
                className="rounded-[29px] bg-[rgba(255,194,58,0.22)] flex items-center cursor-pointer p-2"
                onClick={handleOpenLeaderBoardMenu}
              >
                <span className="leading-[2] text-[#d1752e] text-xs font-dana-regular ml-3 block mt-1">
                  جدول امتیازات
                </span>
                <img src={StarIcon} alt="star logo" />
              </div>
            </div>
          </div>
        </section>

        {/* home screen map ⬇️ */}
        <section className="map-holder mt-6 2xl:col-start-3 2xl:col-end-4 2xl:mt-0 2xl:h-full">
          <div className="container 2xl:max-w-full">
            {/* <figure className="max-w-[360px] h-auto mx-auto 2xl:max-w-full 2xl:max-h-[768px] overflow-hidden">
              <img
                src={FilimoMap}
                alt="game map"
                title="نقشه بازی"
                className="w-full h-full object-contain"
              />
            </figure> */}
            <div className="max-w-[360px] h-auto mx-auto 2xl:max-w-full 2xl:max-h-[768px] overflow-hidden">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 1080 907"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="map-01 (1) 1" clipPath="url(#clip0_526_1436)">
                  <path
                    id="Vector"
                    d="M1076.54 -3.14783H3.14795V906.558H1076.54V-3.14783Z"
                    fill="none"
                  />
                  <path
                    id="Vector_2"
                    d="M1039.71 703.527L1039.39 704.786L1028.06 751.688C1026.17 758.927 1020.82 764.593 1013.9 766.797L993.751 772.778C988.085 774.666 983.364 778.758 980.845 784.424L960.7 831.326C957.552 838.566 950.627 843.288 942.757 843.917L773.407 852.101C767.427 852.416 761.446 850.213 757.354 845.806L713.914 800.793C706.36 792.923 693.769 792.294 685.585 799.534L634.276 842.343C628.925 847.065 621.37 848.324 614.76 846.121L573.209 832.9L478.146 802.681C474.054 801.422 470.277 798.589 467.759 794.812L402.915 703.841C397.878 696.602 388.75 693.454 380.251 695.657L322.332 712.026C314.148 714.229 305.334 711.396 300.298 704.471L239.231 625.147C236.398 621.685 235.139 617.278 234.824 612.871L232.62 550.86C232.306 544.249 229.158 538.269 224.121 534.491L163.999 491.367C159.592 488.219 156.759 483.497 155.815 478.461L143.539 419.913C143.224 418.024 142.909 416.45 142.909 414.561C142.909 413.617 142.909 412.987 143.224 412.043C144.168 406.692 147.001 401.655 151.408 398.508L159.592 392.527L166.832 387.176C172.498 383.084 175.646 376.159 175.331 369.233L174.387 350.347C174.072 341.533 168.091 333.978 159.592 331.46L134.095 323.591C129.374 322.017 125.281 318.869 122.448 314.777L78.0649 244.897C76.1763 242.378 75.2319 239.231 74.9172 236.083L73.658 225.695L64.2147 141.65C63.5852 137.558 64.5295 133.465 66.4182 130.003L84.99 94.1183C85.6196 92.8592 86.2491 91.6001 87.5082 90.6558C94.7481 81.5272 107.969 80.2681 117.097 87.508C117.727 87.8228 118.042 88.4523 118.671 88.7671L133.466 103.247C137.243 107.339 142.594 109.542 148.26 109.542H193.588C194.532 109.542 195.477 109.542 196.421 109.228C199.254 105.45 200.513 101.043 200.513 96.6365V96.007C200.513 84.9898 208.697 75.8612 219.715 74.6021C220.659 74.6021 221.288 74.2874 222.548 74.2874C230.417 74.2874 237.657 78.3795 241.434 84.9898L278.578 148.575C278.893 149.204 279.207 149.834 279.522 150.463L290.854 141.335L301.242 164.314C305.334 173.442 313.518 180.052 322.961 182.256L360.42 190.755C364.197 191.699 367.345 193.588 370.178 196.106L387.806 213.104C391.898 217.196 397.249 219.085 402.915 218.77L554.952 213.419C564.395 213.104 572.265 206.494 574.468 197.365C574.783 195.791 575.098 194.217 575.098 192.644V177.219C575.098 166.832 580.134 157.388 588.318 151.093C590.522 149.519 592.725 148.26 595.244 147.316L635.22 131.577C638.368 130.318 641.516 129.688 644.664 129.373C647.182 129.059 649.7 129.373 652.533 129.688L765.853 149.204L785.369 152.352C791.035 153.296 796.386 156.759 799.534 161.795L802.996 167.461C804.57 168.72 806.144 170.294 807.088 172.183L855.879 250.562C858.712 254.655 859.971 259.691 859.027 264.727L858.082 270.393C857.768 272.912 857.138 275.43 855.879 277.633L854.305 280.781L835.418 316.351C835.104 316.98 834.789 317.925 834.474 318.554C832.9 322.961 832.585 327.683 833.53 332.09L861.86 439.114C863.434 440.373 865.007 441.317 866.896 441.947C868.47 442.576 870.044 442.891 871.933 443.206L918.52 450.131C920.723 450.446 923.241 451.075 925.13 452.335H925.445C932.055 455.797 936.147 462.407 936.147 469.647L936.462 472.795L937.406 489.793C937.721 494.515 936.462 498.922 933.629 502.699L923.241 517.493L915.687 528.196L910.021 536.38C907.817 539.528 906.558 542.99 906.558 546.453L904.669 571.005C904.04 578.245 907.188 585.17 912.854 589.263L916.316 592.096L960.7 625.777L977.383 638.368L1031.84 679.289C1038.76 686.529 1041.6 695.028 1039.71 703.527Z"
                    fill="#8DD696"
                  />
                  <path
                    id="Vector_3"
                    opacity="0.59"
                    d="M938.035 469.647C934.888 471.851 931.11 473.739 927.648 474.999L905.928 481.924C902.151 483.183 898.059 483.812 893.966 483.812H865.007C858.082 483.812 851.472 485.701 845.806 488.849C826.604 499.551 802.366 492.311 791.979 473.425C790.09 469.962 788.516 466.185 787.887 462.093L776.869 407.321L764.278 343.107C760.816 325.479 769.315 307.852 785.368 299.983L791.664 296.835C794.182 295.576 797.015 294.631 799.848 293.687L844.546 282.67C848.324 281.725 852.416 281.411 856.508 281.725L837.621 318.24C835.103 322.961 834.474 328.627 836.048 333.664L864.377 440.688C867.21 442.891 870.673 444.465 874.136 444.78L897.744 448.242L920.723 451.39C929.536 453.279 936.461 460.519 938.035 469.647Z"
                    fill="#31A064"
                  />
                  <path
                    id="Vector_4"
                    d="M873.821 445.095L897.744 448.557C895.856 450.131 893.337 450.761 891.134 450.446L808.977 443.836C805.515 443.521 802.367 441.003 801.108 437.855C799.219 433.133 801.737 427.782 806.459 425.893C807.403 425.579 808.348 425.264 808.977 425.264L843.917 422.431C848.954 421.801 852.731 417.394 852.416 412.358C852.416 411.414 852.102 410.784 851.787 409.84L849.898 404.488C848.639 401.341 846.121 399.137 842.658 398.508L827.864 395.675C824.716 395.045 822.198 393.157 820.939 390.009L809.921 364.827C807.718 360.105 809.921 354.439 814.643 352.236C820.624 349.403 826.605 344.996 822.827 337.756C817.161 327.053 831.956 319.813 835.733 318.24C836.048 318.24 836.363 317.925 836.678 317.925C834.159 322.646 833.53 328.312 835.104 333.349L863.434 440.373C866.581 442.891 870.044 444.465 873.821 445.095Z"
                    fill="#31A064"
                  />
                  <path
                    id="Vector_5"
                    d="M587.689 152.667C579.19 158.648 574.153 168.406 574.468 178.793V183.83C574.153 185.719 573.839 187.922 573.839 189.811V198.939C571.635 208.068 563.451 214.678 554.322 214.993L401.97 220.344C396.304 220.659 390.953 218.455 386.861 214.678L369.233 197.68C366.4 195.162 363.253 193.273 359.475 192.329L322.017 183.83C312.259 181.626 304.389 175.016 300.297 165.888L289.91 142.909L296.835 137.243C297.779 136.613 298.723 135.669 299.353 134.41L307.537 128.114C310.055 126.226 311.315 123.393 311.629 120.245L315.721 50.3644C315.721 48.1609 316.351 45.9575 317.925 44.3836L325.479 34.9403L326.424 33.6812C330.201 28.9595 336.811 28.0152 341.533 31.4778L367.974 50.3644C372.066 53.1974 377.418 53.1974 381.195 50.0496L381.51 49.7348L395.36 38.0881H395.675L395.99 37.7733L401.97 32.7369C406.692 28.6448 413.617 29.2743 417.709 33.996L418.024 34.3108L425.264 43.7541C429.041 48.4757 435.966 49.4201 440.688 45.9575L441.632 45.328L452.02 35.5699C456.112 31.4778 462.407 31.4778 466.814 35.2551L480.979 47.2166C485.386 50.6792 491.682 50.6792 496.089 46.5871L500.495 41.8654C502.699 39.662 505.217 38.7176 508.365 38.4029C512.772 38.4029 516.864 40.9211 518.438 45.0132C520.012 49.1053 524.104 51.6235 528.511 51.6235H562.507C568.487 51.6235 573.524 56.6599 573.524 62.6407V115.523C571.635 115.838 569.746 116.782 568.173 118.356C566.284 120.245 565.34 122.448 565.34 124.967C565.34 130.003 561.247 134.41 556.211 134.41H545.509C540.157 134.41 536.065 138.502 536.065 143.853C536.065 148.89 540.157 153.296 545.194 153.296H587.374V152.667H587.689Z"
                    fill="#5D8BF4"
                  />
                  <path
                    id="Vector_6"
                    opacity="0.59"
                    d="M1050.1 712.34L1039.39 704.471L1028.06 751.373C1026.17 758.613 1020.82 764.279 1013.9 766.482L993.751 772.463C988.085 774.351 983.363 778.444 980.845 784.11L960.699 831.326C957.551 838.566 950.626 843.288 942.757 843.917L773.407 852.101C767.426 852.416 761.445 850.213 757.353 845.806L713.914 801.107C706.359 793.238 693.768 792.609 685.584 799.848L634.275 842.658C628.924 847.38 621.37 848.639 614.759 846.435L573.209 833.215L478.146 802.996C474.054 801.737 470.277 798.904 467.758 795.127L402.914 704.156C397.878 696.916 388.749 693.769 380.25 695.972L322.331 712.34C314.147 714.544 305.333 711.711 300.297 704.786L239.23 625.462C236.397 621.999 235.138 617.592 234.823 613.186L232.62 550.86C232.305 544.249 229.157 538.269 224.121 534.491L163.999 491.367C159.592 488.219 156.759 483.497 155.814 478.461L143.538 419.912C143.223 418.024 142.909 416.45 142.909 414.561L137.243 418.968C130.317 424.005 127.17 432.504 129.058 440.688L141.649 501.44C142.909 506.791 145.742 511.513 150.148 514.66L212.474 559.359C218.14 563.136 221.288 569.432 221.288 576.357L223.177 641.201C223.491 645.608 224.751 650.014 227.584 653.792L290.854 736.578C296.205 743.503 305.333 746.651 313.832 744.448L373.64 727.45C382.454 724.931 391.897 728.394 397.248 735.634L464.296 829.752C467.129 833.53 470.906 836.363 475.313 837.622L567.228 866.581L616.963 882.32C623.888 884.523 631.757 882.95 637.423 878.543L690.935 834.159C699.749 826.919 712.34 827.549 720.21 835.733L765.223 882.32C769.63 886.727 775.61 889.245 781.906 888.93L957.237 880.431C965.421 880.117 972.976 875.08 976.123 867.525L997.213 818.735C999.732 813.069 1004.77 808.347 1010.75 806.459L1031.52 800.163C1038.76 797.96 1044.43 791.979 1046.32 784.739L1058.59 735.004C1059.85 726.505 1057.02 717.692 1050.1 712.34Z"
                    fill="#31A064"
                  />
                  <path
                    id="Vector_7"
                    opacity="0.59"
                    d="M134.725 118.356L95.0626 120.245C90.341 120.245 86.8784 124.337 86.8784 128.744V129.059L87.8227 142.909C88.1375 147.001 91.2853 150.463 95.6922 150.778L102.617 151.408C105.45 151.723 108.283 150.463 109.857 148.26L119.615 136.613C121.504 134.095 124.652 132.836 127.485 133.466L133.78 134.41C137.243 135.039 140.705 133.466 142.594 130.318C144.797 126.226 143.538 121.189 139.446 118.986C137.872 118.671 136.298 118.356 134.725 118.356Z"
                    fill="#31A064"
                  />
                  <path
                    id="Vector_8"
                    d="M239.86 152.037L245.526 167.776C246.47 170.294 247.729 172.498 249.618 174.072L254.655 178.479C258.432 181.941 260.321 187.292 259.691 192.329C258.747 199.569 252.766 204.92 245.526 205.235H245.211C240.175 205.549 235.453 203.661 232.305 199.569L226.01 191.699C224.121 189.496 223.177 186.978 222.547 184.145V183.515C221.918 179.738 219.714 175.96 216.881 173.442L201.457 162.425C197.365 159.277 195.162 154.556 195.476 149.519L196.106 141.964C196.421 135.354 200.828 129.688 207.123 128.114L208.697 127.485C214.678 125.911 220.973 127.8 224.751 132.521L237.027 147.63C238.286 148.575 239.545 150.149 239.86 152.037Z"
                    fill="#5D8BF4"
                  />
                  <path
                    id="Vector_9"
                    opacity="0.15"
                    d="M363.882 65.7884L390.009 61.0668C392.527 60.752 395.045 62.0111 396.304 64.2146L398.507 68.6214C399.767 71.4544 402.914 72.7135 405.747 71.7692L417.394 67.9919C420.227 67.0476 423.06 68.3067 424.634 70.8249L432.503 84.9898C434.077 87.8228 433.448 91.2854 430.929 92.8593L408.895 108.283C407.951 108.913 407.321 109.857 407.006 110.802L398.822 128.429C397.563 131.577 399.137 135.354 402.285 136.613C403.229 136.928 403.859 136.928 404.803 136.928C407.951 136.613 411.099 138.817 411.413 141.964C411.413 142.594 411.413 143.224 411.413 143.853V144.483C409.839 153.611 401.026 159.907 391.897 158.333C390.323 158.018 388.435 157.389 386.861 156.759L365.456 145.742C355.068 140.391 349.402 128.744 351.606 117.412L354.124 105.136C354.439 104.191 354.124 102.932 353.809 101.988L350.347 92.5445C346.569 82.4716 351.606 71.4544 361.364 67.6771C361.993 67.3623 362.938 67.0475 363.882 67.0475H364.197C363.567 65.7884 363.882 65.7884 363.882 65.7884Z"
                    fill="#CDDEFF"
                  />
                  <path
                    id="Vector_10"
                    d="M532.288 -14.7946V20.7753"
                    stroke="#CDDEFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_11"
                    opacity="0.32"
                    d="M475.313 837.622C470.906 836.363 467.129 833.53 464.296 829.752L397.249 735.634C391.897 728.079 382.454 724.932 373.64 727.45L313.518 744.448C305.019 746.966 295.89 743.818 290.539 736.578L227.899 654.421C225.066 650.959 223.492 646.552 223.492 641.83L221.603 576.986C221.288 570.376 218.14 564.08 212.789 559.988L150.778 515.29C146.371 512.142 143.223 507.421 142.279 502.069L129.688 441.317C128.114 433.133 131.262 424.634 137.872 419.598L143.538 415.191C143.538 417.08 143.538 418.654 144.168 420.542L156.444 479.091C157.388 484.127 160.536 488.849 164.628 491.997L224.751 535.121C230.102 538.898 233.25 545.194 233.25 551.489L235.138 614.13C235.453 618.537 237.027 622.629 239.545 626.406L261.265 655.051L300.297 706.045C305.648 712.655 314.147 715.488 322.332 713.6L380.251 697.231C388.75 694.713 397.878 698.176 402.915 705.415L467.444 796.071C469.962 799.534 473.739 802.367 477.831 803.941L572.579 834.159C569.117 842.658 567.228 851.787 567.228 860.915V868.155L475.313 837.622Z"
                    fill="#CDDEFF"
                  />
                  <path
                    id="Vector_12"
                    opacity="0.17"
                    d="M751.058 612.556L753.576 568.487C754.521 551.175 741.93 536.065 724.617 534.177L678.974 528.511C677.715 528.196 676.141 528.196 674.882 528.196C665.439 528.196 629.239 529.77 627.036 531.344C614.445 539.528 620.426 556.211 614.13 578.245C609.094 595.558 619.167 613.815 636.479 618.852C638.998 619.481 641.831 620.111 644.664 620.111L654.422 620.426C658.514 620.74 662.606 621.685 666.698 623.259L705.73 640.256C722.413 647.496 741.615 640.256 749.169 623.573C750.114 621.37 751.058 618.852 751.373 616.648C751.058 615.704 751.058 614.13 751.058 612.556Z"
                    fill="#31A064"
                  />
                  <g id="Group" opacity="0.59">
                    <path
                      id="Vector_13"
                      opacity="0.59"
                      d="M648.126 326.739C647.811 321.387 651.903 316.98 657.254 316.666C662.606 316.351 667.013 320.443 667.327 325.794V326.739H648.126Z"
                      fill="white"
                    />
                    <path
                      id="Vector_14"
                      opacity="0.59"
                      d="M645.607 300.612C645.607 295.261 650.014 291.169 655.051 291.169C660.087 291.169 664.494 295.576 664.494 300.612H645.607Z"
                      fill="white"
                    />
                    <path
                      id="Vector_15"
                      opacity="0.59"
                      d="M620.74 309.426C620.425 304.075 624.517 299.668 629.869 299.353C635.22 299.038 639.627 303.13 639.942 308.481V309.426H620.74Z"
                      fill="white"
                    />
                  </g>
                  <g id="Group_2" opacity="0.59">
                    <path
                      id="Vector_16"
                      opacity="0.59"
                      d="M433.448 273.541C433.448 270.079 436.281 267.56 439.429 267.56C442.577 267.56 445.095 270.079 445.41 272.912V273.541H433.448Z"
                      fill="white"
                    />
                    <path
                      id="Vector_17"
                      opacity="0.59"
                      d="M431.56 257.173C431.874 253.71 434.707 251.507 437.855 251.507C440.688 251.822 443.206 254.025 443.521 257.173H431.56Z"
                      fill="white"
                    />
                    <path
                      id="Vector_18"
                      opacity="0.59"
                      d="M415.821 262.524C415.506 259.376 418.024 256.228 421.172 255.914C424.32 255.599 427.467 258.117 427.782 261.265C427.782 261.58 427.782 261.58 427.782 261.894V262.524H415.821V262.524Z"
                      fill="white"
                    />
                  </g>
                  <path
                    id="Vector_19"
                    d="M302.5 242.693C302.5 239.86 304.389 237.657 307.222 237.657C310.055 237.657 312.259 239.545 312.259 242.378V242.693H302.5Z"
                    fill="white"
                  />
                  <path
                    id="Vector_20"
                    d="M301.242 229.473C301.242 226.954 303.445 224.751 306.278 224.751C308.796 224.751 311 226.954 311 229.473H301.242Z"
                    fill="white"
                  />
                  <path
                    id="Vector_21"
                    d="M288.336 233.879C288.336 231.046 290.225 228.843 293.058 228.843C295.891 228.843 298.094 230.732 298.094 233.565V233.879H288.336Z"
                    fill="white"
                  />
                  <path
                    id="Vector_22"
                    d="M143.224 183.2C142.909 177.849 147.001 173.442 152.352 173.127C157.703 172.813 162.11 176.905 162.425 182.256V183.2H143.224V183.2Z"
                    fill="#8DD696"
                  />
                  <path
                    id="Vector_23"
                    d="M140.391 157.074C140.391 151.722 144.798 147.63 149.834 147.63C154.87 147.63 159.277 152.037 159.277 157.074H140.391Z"
                    fill="#8DD696"
                  />
                  <path
                    id="Vector_24"
                    d="M115.523 165.887C115.209 160.536 119.301 156.129 124.652 155.815C130.003 155.5 134.41 159.592 134.725 164.943V165.887H115.523V165.887Z"
                    fill="#8DD696"
                  />
                  <path
                    id="Vector_25"
                    d="M210.586 461.148C210.271 457.371 213.104 453.908 216.881 453.594C220.659 453.279 224.121 456.112 224.436 459.889C224.436 460.204 224.436 460.519 224.436 460.519V461.148H210.586V461.148Z"
                    fill="white"
                  />
                  <path
                    id="Vector_26"
                    d="M208.697 442.262C208.382 438.484 211.215 435.022 215.308 434.707C219.085 434.392 222.547 437.225 222.862 441.317C222.862 441.632 222.862 441.947 222.862 442.262H208.697Z"
                    fill="white"
                  />
                  <path
                    id="Vector_27"
                    d="M190.44 448.557C190.125 444.78 193.273 441.632 197.051 441.317C200.828 441.003 203.976 444.15 204.29 447.928V448.557H190.44V448.557Z"
                    fill="white"
                  />
                  <path
                    id="Vector_28"
                    d="M484.442 135.669C484.442 135.669 482.868 115.208 499.236 109.857C515.605 104.506 524.418 113.635 524.418 113.635C524.418 113.635 526.307 135.984 509.309 138.817C492.311 141.65 484.442 135.669 484.442 135.669Z"
                    fill="#FF7272"
                    stroke="#FF5A62"
                    strokeWidth="0.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_29"
                    d="M511.198 118.671C512.241 118.671 513.086 117.825 513.086 116.782C513.086 115.739 512.241 114.894 511.198 114.894C510.155 114.894 509.309 115.739 509.309 116.782C509.309 117.825 510.155 118.671 511.198 118.671Z"
                    fill="black"
                    stroke="black"
                    strokeWidth="0.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_30"
                    d="M502.384 106.709C502.384 106.709 496.718 94.1184 491.052 96.9514C485.386 99.7844 502.384 106.709 502.384 106.709Z"
                    fill="#FF7272"
                    stroke="#FF5A62"
                    strokeWidth="0.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_31"
                    d="M515.29 133.78C515.29 133.78 508.365 143.853 513.401 146.686C518.438 149.519 515.29 133.78 515.29 133.78Z"
                    fill="#FF7272"
                    stroke="#FF5A62"
                    strokeWidth="0.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_32"
                    d="M483.498 131.892C483.498 131.892 463.981 121.819 459.574 131.262C455.168 140.705 483.498 131.892 483.498 131.892Z"
                    fill="#FF7272"
                    stroke="#FF5A62"
                    strokeWidth="0.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_33"
                    d="M482.868 133.465C482.868 133.465 461.463 139.131 464.611 149.204C467.759 159.277 482.868 133.465 482.868 133.465Z"
                    fill="#FF7272"
                    stroke="#FF5A62"
                    strokeWidth="0.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_34"
                    d="M486.016 133.465C486.016 133.465 470.592 148.89 477.831 156.129C485.071 163.369 486.016 133.465 486.016 133.465Z"
                    fill="#FF7272"
                    stroke="#FF5A62"
                    strokeWidth="0.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_35"
                    d="M777.814 768.685C777.814 768.685 779.073 737.522 796.701 737.522C814.328 737.522 818.42 767.741 818.42 767.741L777.814 768.685Z"
                    fill="#31A064"
                  />
                  <path
                    id="Vector_36"
                    opacity="0.59"
                    d="M805.2 768.056C805.2 768.056 801.108 707.619 824.086 706.36C851.157 705.1 845.806 766.797 845.806 766.797L805.2 768.056Z"
                    fill="#31A064"
                  />
                  <path
                    id="Vector_37"
                    d="M742.874 731.542C742.874 731.542 737.208 670.79 768.685 669.216C805.829 667.642 798.589 729.968 798.589 729.968L742.874 731.542Z"
                    fill="#31A064"
                  />
                  <path
                    id="Vector_38"
                    opacity="0.59"
                    d="M625.777 718.636C625.777 718.636 620.111 657.884 651.589 656.31C688.732 654.736 681.492 717.062 681.492 717.062L625.777 718.636Z"
                    fill="#74C084"
                  />
                  <path
                    id="Vector_39"
                    d="M823.457 662.92C823.142 657.569 827.234 653.162 832.585 652.848C837.937 652.533 842.344 656.625 842.658 661.976V662.92H823.457V662.92Z"
                    fill="#66BF8C"
                  />
                  <path
                    id="Vector_40"
                    d="M820.624 636.794C820.624 631.443 825.03 627.351 830.067 627.351C835.103 627.351 839.51 631.757 839.51 636.794H820.624Z"
                    fill="#66BF8C"
                  />
                  <path
                    id="Vector_41"
                    d="M625.462 732.801H781.591C781.591 732.801 761.76 702.897 703.527 704.471C636.794 706.674 625.462 732.801 625.462 732.801Z"
                    fill="#FF8243"
                    stroke="#FF8243"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_42"
                    d="M488.534 781.277H544.565C544.565 781.277 538.269 752.947 518.438 751.058C498.607 749.169 488.534 781.277 488.534 781.277Z"
                    fill="#31A064"
                  />
                  <path
                    id="Vector_43"
                    opacity="0.59"
                    d="M531.344 781.591H562.192C562.192 781.591 558.729 766.167 547.712 764.908C536.695 763.649 531.344 781.591 531.344 781.591Z"
                    fill="#31A064"
                  />
                  <path
                    id="Vector_44"
                    d="M586.115 774.981H632.702C632.702 774.981 627.351 751.688 610.982 750.114C594.614 748.54 586.115 774.981 586.115 774.981Z"
                    fill="#31A064"
                  />
                  <path
                    id="Vector_45"
                    opacity="0.55"
                    d="M429.041 152.037C429.356 143.853 436.281 137.558 444.78 137.872C452.649 138.187 458.63 144.483 458.945 152.037"
                    fill="#CDDEFF"
                  />
                  <path
                    id="Vector_46"
                    opacity="0.55"
                    d="M449.501 174.701C449.816 166.517 456.741 160.222 464.926 160.536C472.48 160.851 478.776 167.147 479.09 174.701"
                    fill="#CDDEFF"
                  />
                  <path
                    id="Vector_47"
                    opacity="0.55"
                    d="M405.433 172.813C406.062 164.628 412.987 158.333 421.171 158.962C428.726 159.592 434.392 165.258 435.022 172.813"
                    fill="#CDDEFF"
                  />
                  <path
                    id="Vector_48"
                    d="M936.147 734.69C935.517 727.765 936.462 720.84 938.35 714.229C943.702 695.343 954.404 693.139 954.404 693.139"
                    stroke="#31A064"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_49"
                    d="M931.111 734.69C930.166 723.987 930.796 713.285 932.684 702.897C935.517 688.732 943.387 685.27 943.387 685.27"
                    stroke="#31A064"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_50"
                    d="M926.703 734.69L926.389 682.751"
                    stroke="#31A064"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_51"
                    d="M911.279 686.214C911.279 686.214 918.204 691.565 921.352 714.859C922.611 724.302 922.926 730.597 923.241 734.375"
                    stroke="#31A064"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_52"
                    d="M898.688 693.139C898.688 693.139 910.335 696.602 915.372 714.229C917.575 720.84 918.205 727.765 917.575 734.69"
                    stroke="#31A064"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_53"
                    d="M936.147 734.69C935.517 727.765 936.462 720.84 938.35 714.229C943.702 695.343 954.404 693.139 954.404 693.139"
                    stroke="#0E7038"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_54"
                    d="M931.111 734.69C930.166 723.987 930.796 713.285 932.684 702.897C935.517 688.732 943.387 685.27 943.387 685.27"
                    stroke="#0E7038"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_55"
                    d="M926.703 734.69L926.389 682.751"
                    stroke="#0E7038"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_56"
                    d="M911.279 686.214C911.279 686.214 918.204 691.565 921.352 714.859C922.611 724.302 922.926 730.597 923.241 734.375"
                    stroke="#0E7038"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_57"
                    d="M898.688 693.139C898.688 693.139 910.335 696.602 915.372 714.229C917.575 720.84 918.205 727.765 917.575 734.69"
                    stroke="#0E7038"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_58"
                    d="M947.164 734.689H908.132"
                    stroke="#FF7272"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_59"
                    d="M945.905 734.689H935.203"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_60"
                    d="M815.587 560.303H816.532C819.679 560.303 822.198 562.821 822.198 565.654V565.969"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_61"
                    d="M336.497 70.1953L335.552 106.709"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_62"
                    d="M334.608 122.134V127.17"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_63"
                    d="M113.005 353.18H102.932C92.859 353.18 84.6748 344.996 84.6748 334.923V333.034C84.6748 320.128 95.0624 309.741 107.968 309.741H118.986C132.836 309.741 146.371 304.075 156.444 294.317L161.166 289.595C163.684 287.077 167.146 285.818 170.609 285.818H198.309C205.549 285.818 211.53 291.798 211.53 299.038V316.351C211.53 325.165 204.605 332.09 195.791 332.09C192.329 332.09 189.81 334.923 189.81 338.071C189.81 344.996 184.144 350.662 177.219 350.662C155.814 351.921 114.264 353.18 113.005 353.18Z"
                    fill="#DCDFF9"
                  />
                  <path
                    id="Vector_64"
                    d="M113.005 346.255H102.932C92.859 346.255 84.6748 338.071 84.6748 327.998V326.109C84.6748 313.203 95.0624 302.816 107.968 302.816H118.986C132.836 302.816 146.371 297.15 156.444 287.391L161.166 282.67C163.684 280.152 167.146 278.892 170.609 278.892H198.309C205.549 278.892 211.53 284.873 211.53 292.113V309.426C211.53 318.24 204.605 325.165 195.791 325.165C192.329 325.165 189.81 327.998 189.81 331.145C189.81 338.071 184.144 343.737 177.219 343.737C155.814 344.681 114.264 346.255 113.005 346.255Z"
                    fill="white"
                  />
                  <path
                    id="Vector_65"
                    d="M980.215 641.83H993.751C1007.29 641.83 1018.3 630.813 1018.3 617.278V614.445C1018.3 597.132 1004.45 583.282 987.141 583.282H972.031C953.145 583.282 935.202 575.727 921.667 562.507L915.686 556.526C912.224 553.063 907.817 551.175 903.095 551.175H865.637C855.879 551.175 847.694 559.044 847.694 569.117V592.725C847.694 604.372 857.138 614.13 869.099 614.13C873.506 614.13 876.969 617.592 876.969 622.314C876.969 631.443 884.208 639.312 893.652 639.312C922.611 640.256 978.642 641.83 980.215 641.83Z"
                    fill="#DCDFF9"
                  />
                  <path
                    id="Vector_66"
                    d="M980.215 632.072H993.751C1007.29 632.072 1018.3 621.055 1018.3 607.52V604.687C1018.3 587.374 1004.45 573.524 987.141 573.524H972.031C953.145 573.524 935.202 565.969 921.667 552.749L915.686 546.768C912.224 543.305 907.817 541.731 903.095 541.417H865.637C855.879 541.417 847.694 549.286 847.694 559.359V582.967C847.694 594.614 857.138 604.372 869.099 604.372C873.506 604.372 876.969 607.834 876.969 612.556C876.969 621.685 884.208 629.554 893.652 629.554C922.611 630.184 978.642 632.072 980.215 632.072Z"
                    fill="white"
                  />
                  <path
                    id="Vector_67"
                    d="M641.516 137.558V142.594C641.516 147.63 637.738 151.723 633.017 152.037C627.665 152.667 621.685 152.982 618.852 152.982L608.779 152.352H540.472C535.436 152.352 531.029 148.26 531.029 143.224C531.029 137.872 535.121 133.78 540.472 133.78H550.86C555.896 133.78 560.303 129.688 560.303 124.652C560.303 119.93 563.766 116.153 568.487 115.208H598.391C600.909 115.208 603.113 116.153 605.001 118.041L613.186 125.911C615.074 127.485 617.278 128.744 619.796 128.744H632.387C634.59 128.744 636.794 129.688 638.368 130.947C640.256 132.521 641.516 135.039 641.516 137.558Z"
                    fill="white"
                  />
                  <path
                    id="Vector_68"
                    d="M309.741 597.132V602.483C309.741 607.834 305.649 611.927 300.612 612.556C294.946 613.186 288.336 613.5 285.818 613.5L275.43 612.871H203.031C197.68 612.871 192.958 608.464 192.958 603.113C192.958 600.595 194.218 598.076 196.106 596.188C197.995 594.299 200.513 593.355 203.031 593.04H214.049C219.4 593.04 223.807 588.633 224.121 583.282C224.121 580.764 225.381 578.245 227.269 576.357C228.843 574.783 230.732 573.838 232.935 573.524H264.413C266.931 573.524 269.449 574.783 271.338 576.671L279.837 585.17C281.726 587.059 284.244 588.318 286.762 588.318H300.297C302.501 588.318 304.704 588.948 306.593 590.522C308.482 591.781 309.741 594.614 309.741 597.132Z"
                    fill="white"
                  />
                  <path
                    id="Vector_69"
                    d="M855.564 160.851C855.564 173.127 845.806 183.2 833.529 183.2L763.649 183.515C753.891 183.515 746.021 175.646 746.021 165.888C746.021 156.129 753.891 148.26 763.649 147.945L786.313 150.149C794.182 150.778 801.737 149.204 808.347 144.797L812.754 141.65C816.217 139.446 820.624 138.502 824.716 138.502H833.529C845.491 138.502 855.564 148.26 855.564 160.851Z"
                    fill="white"
                  />
                  <path
                    id="Vector_70"
                    opacity="0.59"
                    d="M471.221 486.96L454.538 487.59C452.02 487.59 449.502 486.645 447.928 484.757L436.911 472.166C435.337 470.592 433.133 469.647 430.93 469.333L417.709 468.703C415.506 468.703 412.988 469.647 411.414 471.221L392.527 490.108C390.009 492.626 389.379 496.089 390.638 499.236L392.527 504.273C394.101 508.68 399.137 510.883 403.544 509.309C404.174 509.309 404.489 508.994 404.803 508.68C408.581 506.476 413.302 507.421 415.821 510.568L420.542 516.234C422.116 518.123 424.32 519.382 426.838 519.697L448.557 520.956C452.335 521.271 455.797 519.067 457.056 515.29C458.315 511.827 461.778 509.624 465.241 509.624L471.851 509.939C476.258 510.254 480.35 506.791 480.665 502.384C480.665 501.755 480.665 501.125 480.665 500.496L480.035 494.83C480.035 490.423 475.943 486.645 471.221 486.96Z"
                    fill="#31A064"
                  />
                  <path
                    id="Vector_71"
                    d="M446.039 495.774H442.577C441.003 495.774 439.429 494.829 438.799 493.256L436.596 487.904C435.966 486.33 434.707 485.386 433.133 485.386L420.228 484.442C418.339 484.442 416.765 485.386 416.135 486.96L414.876 489.478C413.932 491.682 414.876 493.885 416.765 495.144L431.245 502.699C431.559 502.699 431.559 503.014 431.874 503.014L444.465 507.106C446.354 507.735 448.243 507.106 449.502 505.532C449.817 504.902 450.131 504.588 450.131 503.958L450.761 500.495C450.446 497.977 448.557 495.774 446.039 495.774C446.354 495.774 446.354 495.774 446.039 495.774Z"
                    fill="#31A064"
                  />
                  <path
                    id="Vector_72"
                    d="M237.342 427.467C237.657 420.857 243.323 415.506 249.933 415.82C256.228 416.135 261.265 421.172 261.58 427.467H237.342Z"
                    fill="#66BF8C"
                  />
                  <path
                    id="Vector_73"
                    d="M279.207 346.884C272.597 350.662 266.931 356.013 262.524 362.308"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_74"
                    d="M260.635 373.955C260.983 373.955 261.265 373.251 261.265 372.381C261.265 371.512 260.983 370.807 260.635 370.807C260.288 370.807 260.006 371.512 260.006 372.381C260.006 373.251 260.288 373.955 260.635 373.955Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_75"
                    d="M370.807 278.892H351.291L353.494 177.534H369.233L370.807 278.892Z"
                    fill="white"
                  />
                  <path
                    id="Vector_76"
                    d="M345.625 150.149H337.441C336.182 150.149 335.237 151.093 335.237 152.352C335.237 152.667 335.237 153.296 335.552 153.611L351.92 175.96C352.865 176.905 353.809 177.534 355.068 177.534H367.345C368.604 177.534 369.863 176.905 370.492 175.96L383.713 156.129C384.972 154.556 384.342 152.037 382.769 151.093C382.139 150.778 381.51 150.463 380.565 150.463H339.015"
                    fill="white"
                  />
                  <path
                    id="Vector_77"
                    d="M342.792 152.037H377.103C378.991 152.037 380.88 150.463 380.88 148.575C380.88 146.686 379.306 145.112 377.418 144.797H343.107C341.218 144.797 339.644 146.371 339.644 148.575C339.33 150.463 340.903 152.037 342.792 152.037Z"
                    fill="white"
                  />
                  <path
                    id="Vector_78"
                    d="M348.773 146.371H371.752C373.64 146.371 375.214 144.798 375.529 142.909C375.529 141.02 373.955 139.446 371.752 139.446H348.773C346.884 139.446 345.31 141.02 345.31 142.909C344.996 144.798 346.884 146.371 348.773 146.371Z"
                    fill="white"
                  />
                  <path
                    id="Vector_79"
                    d="M361.679 98.2104V129.688"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_80"
                    d="M341.218 279.837C341.218 267.56 350.976 257.802 363.253 257.802C375.529 257.802 385.287 267.56 385.287 279.837H341.218Z"
                    fill="#66BF8C"
                  />
                  <path
                    id="Vector_81"
                    d="M374.27 279.837C374.585 271.023 382.139 264.098 390.953 264.728C399.137 265.042 405.748 271.653 406.063 279.837H374.27Z"
                    fill="#31A064"
                  />
                  <path
                    id="Vector_82"
                    d="M350.977 180.052H370.808C372.381 180.052 373.64 178.793 373.64 177.219C373.64 175.646 372.381 174.386 370.808 174.386H350.977C349.403 174.386 348.144 175.646 348.144 177.219C348.144 178.793 349.088 179.738 350.662 180.052H350.977Z"
                    fill="#DCDFF9"
                  />
                  <path
                    id="Vector_83"
                    d="M372.067 139.131C372.696 133.151 368.289 127.485 362.309 126.855C356.328 126.226 350.662 130.633 350.032 136.613C350.032 137.243 350.032 138.187 350.032 138.817"
                    fill="#DCDFF9"
                  />
                  <path
                    id="Vector_84"
                    d="M339.33 150.149H370.178"
                    stroke="#DCDFF9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_85"
                    d="M374.27 144.797H364.197"
                    stroke="#DCDFF9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_86"
                    d="M563.451 349.088C563.451 349.088 557.155 328.627 560.933 321.387"
                    stroke="#31A064"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_87"
                    d="M553.063 324.535C553.063 324.535 554.952 325.794 557.785 336.182C559.044 340.904 560.303 345.625 560.933 350.662"
                    stroke="#31A064"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_88"
                    d="M591.151 371.752C590.522 382.139 578.56 387.176 578.56 387.176C576.672 390.009 573.524 391.583 570.061 391.268C566.284 390.953 562.821 390.324 559.359 389.379C559.359 389.379 542.991 392.842 542.361 380.88C541.731 368.919 553.378 358.846 556.841 353.18C558.1 351.921 559.044 350.347 559.359 348.458C559.359 346.57 561.248 349.717 561.562 350.347L561.248 346.255L563.451 349.088L564.081 343.422C564.081 343.737 564.395 344.051 564.71 344.366C565.654 345.625 566.914 346.884 568.173 347.514C575.098 351.606 591.781 363.253 591.151 371.752Z"
                    fill="white"
                  />
                  <path
                    id="Vector_89"
                    opacity="0.32"
                    d="M562.821 357.901C559.673 363.567 558.1 369.863 557.155 376.159C556.211 386.231 558.729 389.379 558.729 389.379"
                    stroke="#CDDEFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_90"
                    opacity="0.32"
                    d="M571.32 360.734C574.468 365.456 576.672 370.807 577.931 376.473C578.875 383.713 578.245 384.658 578.245 384.658"
                    stroke="#CDDEFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_91"
                    d="M515.919 393.786C516.549 380.88 527.566 371.122 540.157 371.752C552.119 372.066 561.877 381.825 562.192 393.786H515.919Z"
                    fill="#66BF8C"
                  />
                  <path
                    id="Vector_92"
                    d="M555.896 393.786C555.896 387.491 560.933 382.454 567.228 382.454C573.524 382.454 578.56 387.491 578.56 393.786H555.896Z"
                    fill="#31A064"
                  />
                  <path
                    id="Vector_93"
                    d="M550.23 333.349C550.23 333.349 558.415 339.015 560.303 344.051"
                    stroke="#31A064"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_94"
                    d="M667.642 739.411C663.865 739.726 660.087 740.985 656.939 742.874"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="road">
                    <path
                      id="Vector_95"
                      d="M679.289 617.907C696.5 617.907 710.452 603.955 710.452 586.744C710.452 569.534 696.5 555.581 679.289 555.581C662.078 555.581 648.126 569.534 648.126 586.744C648.126 603.955 662.078 617.907 679.289 617.907Z"
                      fill="#67C17A"
                    />
                    <path
                      id="Vector_96"
                      d="M161.166 222.547C192.644 221.603 223.177 235.138 243.638 259.061L319.814 347.829C333.349 363.567 352.55 373.325 373.326 374.899L399.452 376.788C425.894 378.677 450.131 362.623 458.945 337.756L471.536 301.556C478.776 280.151 497.977 264.727 520.641 262.524L584.856 256.228C600.91 254.655 614.445 243.323 619.167 227.898L620.426 223.492C625.462 207.123 640.257 195.791 657.569 195.162L704.471 193.903C721.784 193.273 737.208 205.549 740.67 222.547L745.707 247.729C749.169 265.672 739.097 283.299 721.784 288.965L707.304 293.687C701.953 295.261 696.916 298.723 693.454 303.13C689.677 307.537 687.473 312.573 686.844 318.239C684.64 332.719 693.454 346.569 707.304 350.976L710.767 352.235C723.043 356.013 731.227 367.974 730.283 380.88L729.968 385.917C729.653 392.212 727.135 397.878 723.043 402.6C718.951 407.321 713.6 410.469 707.619 411.728C699.12 413.617 693.769 421.801 695.028 430.3L697.861 449.816C700.694 470.592 686.214 489.793 665.754 492.626L663.55 492.941L633.332 495.144C611.612 496.718 589.892 489.793 573.209 475.943L565.969 469.962C542.991 450.761 514.031 439.743 484.127 439.114C441.632 438.17 378.047 437.225 334.608 436.281H333.664C304.075 435.966 279.837 459.574 279.207 488.849C278.578 518.123 302.501 542.676 331.775 543.305L522.215 549.286C534.806 549.601 546.768 554.322 555.896 562.821L557.47 564.395C578.56 584.856 578.875 618.852 558.415 639.942C553.693 644.978 547.712 648.755 541.417 651.588L513.716 656.31C492.941 660.087 477.832 678.03 477.832 699.12V701.638C479.406 724.617 498.292 742.559 521.271 742.559H672.993C682.437 742.559 690.306 750.114 690.306 759.557V761.131C689.362 768.371 684.011 774.351 677.086 776.24L589.578 822.512"
                      stroke="white"
                      strokeOpacity="0.9"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_97"
                      d="M570.376 596.188H399.767C381.195 596.188 366.401 610.982 366.086 629.239V629.554C366.086 648.126 380.88 662.92 399.452 662.92H496.404"
                      stroke="white"
                      strokeOpacity="0.9"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="level_9" onClick={() => handleLevelClick(9)}>
                      {levelState.current[9]?.lock ? (
                        <>
                          <path
                            id="Vector_98"
                            d="M280.466 520.326C297.677 520.326 311.629 506.374 311.629 489.163C311.629 471.953 297.677 458 280.466 458C263.255 458 249.303 471.953 249.303 489.163C249.303 506.374 263.255 520.326 280.466 520.326Z"
                            fill="#57B679"
                          />
                          <path
                            id="Vector_99"
                            d="M280.466 508.05C290.897 508.05 299.353 499.594 299.353 489.163C299.353 478.733 290.897 470.277 280.466 470.277C270.035 470.277 261.58 478.733 261.58 489.163C261.58 499.594 270.035 508.05 280.466 508.05Z"
                            fill="#4DA06B"
                          />
                          <path
                            id="&#219;&#185;"
                            d="M271.781 483.825C271.781 482.496 272.098 481.273 272.73 480.155C273.363 479.016 274.218 478.12 275.293 477.466C276.39 476.812 277.582 476.485 278.869 476.485C280.092 476.485 281.21 476.791 282.222 477.402C283.256 478.014 284.1 478.858 284.754 479.934C285.408 480.988 285.808 482.18 285.956 483.509L287.538 497.684L282.476 498.253L281.685 491.039H278.869C277.561 491.039 276.369 490.723 275.293 490.09C274.218 489.436 273.363 488.561 272.73 487.464C272.098 486.367 271.781 485.154 271.781 483.825ZM276.844 483.825C276.844 484.289 277.034 484.69 277.413 485.028C277.814 485.365 278.299 485.534 278.869 485.534H281.052L280.894 484.078C280.83 483.488 280.609 483.003 280.229 482.623C279.871 482.243 279.417 482.053 278.869 482.053C278.278 482.053 277.793 482.233 277.413 482.591C277.034 482.929 276.844 483.34 276.844 483.825Z"
                            fill="#A3DBAF"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            id="Vector_98"
                            d="M280.466 520.326C297.677 520.326 311.629 506.374 311.629 489.163C311.629 471.953 297.677 458 280.466 458C263.255 458 249.303 471.953 249.303 489.163C249.303 506.374 263.255 520.326 280.466 520.326Z"
                            fill="#95EAB3"
                          />
                          <path
                            id="Vector_99"
                            d="M280.466 508.05C290.897 508.05 299.353 499.594 299.353 489.163C299.353 478.733 290.897 470.277 280.466 470.277C270.035 470.277 261.58 478.733 261.58 489.163C261.58 499.594 270.035 508.05 280.466 508.05Z"
                            fill="#81D89A"
                          />
                          <path
                            id="&#219;&#185;"
                            d="M271.781 483.825C271.781 482.496 272.098 481.273 272.73 480.155C273.363 479.016 274.218 478.12 275.293 477.466C276.39 476.812 277.582 476.485 278.869 476.485C280.092 476.485 281.21 476.791 282.222 477.402C283.256 478.014 284.1 478.858 284.754 479.934C285.408 480.988 285.808 482.18 285.956 483.509L287.538 497.684L282.476 498.253L281.685 491.039H278.869C277.561 491.039 276.369 490.723 275.293 490.09C274.218 489.436 273.363 488.561 272.73 487.464C272.098 486.367 271.781 485.154 271.781 483.825ZM276.844 483.825C276.844 484.289 277.034 484.69 277.413 485.028C277.814 485.365 278.299 485.534 278.869 485.534H281.052L280.894 484.078C280.83 483.488 280.609 483.003 280.229 482.623C279.871 482.243 279.417 482.053 278.869 482.053C278.278 482.053 277.793 482.233 277.413 482.591C277.034 482.929 276.844 483.34 276.844 483.825Z"
                            fill="#41BE7B"
                          />
                        </>
                      )}
                      {levelState.current[9]?.today ? (
                        <>
                          <path
                            id="Vector_98"
                            d="M280.466 520.326C297.677 520.326 311.629 506.374 311.629 489.163C311.629 471.953 297.677 458 280.466 458C263.255 458 249.303 471.953 249.303 489.163C249.303 506.374 263.255 520.326 280.466 520.326Z"
                            fill="white"
                          />
                          <path
                            id="Vector_99"
                            d="M280.466 508.05C290.897 508.05 299.353 499.594 299.353 489.163C299.353 478.733 290.897 470.277 280.466 470.277C270.035 470.277 261.58 478.733 261.58 489.163C261.58 499.594 270.035 508.05 280.466 508.05Z"
                            fill="#DCDFF9"
                          />
                          <path
                            id="&#219;&#185;"
                            d="M271.781 483.825C271.781 482.496 272.098 481.273 272.73 480.155C273.363 479.016 274.218 478.12 275.293 477.466C276.39 476.812 277.582 476.485 278.869 476.485C280.092 476.485 281.21 476.791 282.222 477.402C283.256 478.014 284.1 478.858 284.754 479.934C285.408 480.988 285.808 482.18 285.956 483.509L287.538 497.684L282.476 498.253L281.685 491.039H278.869C277.561 491.039 276.369 490.723 275.293 490.09C274.218 489.436 273.363 488.561 272.73 487.464C272.098 486.367 271.781 485.154 271.781 483.825ZM276.844 483.825C276.844 484.289 277.034 484.69 277.413 485.028C277.814 485.365 278.299 485.534 278.869 485.534H281.052L280.894 484.078C280.83 483.488 280.609 483.003 280.229 482.623C279.871 482.243 279.417 482.053 278.869 482.053C278.278 482.053 277.793 482.233 277.413 482.591C277.034 482.929 276.844 483.34 276.844 483.825Z"
                            fill="#31A064"
                          />
                        </>
                      ) : null}
                    </g>
                    <g id="level_13" onClick={() => handleLevelClick(13)}>
                      {levelState.current[13]?.lock ? (
                        <>
                          <path
                            id="Vector_100"
                            d="M485.386 745.077C502.597 745.077 516.549 731.125 516.549 713.914C516.549 696.703 502.597 682.751 485.386 682.751C468.175 682.751 454.223 696.703 454.223 713.914C454.223 731.125 468.175 745.077 485.386 745.077Z"
                            fill="#57B679"
                          />
                          <path
                            id="Vector_101"
                            d="M485.386 732.801C495.817 732.801 504.273 724.345 504.273 713.914C504.273 703.483 495.817 695.028 485.386 695.028C474.955 695.028 466.5 703.483 466.5 713.914C466.5 724.345 474.955 732.801 485.386 732.801Z"
                            fill="#4DA06B"
                          />
                          <path
                            id="&#219;&#177;&#219;&#179;"
                            d="M469.401 702.561L474.463 701.991L476.488 722.715L471.426 723.285L469.401 702.561ZM495.218 714.204C493.847 714.204 492.603 713.751 491.485 712.844C490.346 713.751 489.059 714.204 487.625 714.204H487.055C486.844 714.204 486.57 714.183 486.233 714.141L487.055 722.715L481.993 723.285L479.968 702.561L485.03 701.991L485.537 707.212C485.642 708.076 486.074 708.509 486.834 708.509H487.625C487.983 708.509 488.289 708.435 488.542 708.287C488.796 708.14 488.912 707.939 488.89 707.686V707.655L488.447 703.288L493.51 702.719L493.953 707.37C494.016 708.129 494.438 708.509 495.218 708.509H495.566C495.925 708.509 496.231 708.425 496.484 708.256C496.737 708.087 496.853 707.887 496.832 707.655L496.326 702.561L501.388 701.991L501.894 707.401C501.916 707.528 501.926 707.718 501.926 707.971C501.926 709.089 501.631 710.133 501.04 711.103C500.45 712.053 499.669 712.812 498.699 713.381C497.729 713.93 496.684 714.204 495.566 714.204H495.218Z"
                            fill="#A3DBAF"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            id="Vector_100"
                            d="M485.386 745.077C502.597 745.077 516.549 731.125 516.549 713.914C516.549 696.703 502.597 682.751 485.386 682.751C468.175 682.751 454.223 696.703 454.223 713.914C454.223 731.125 468.175 745.077 485.386 745.077Z"
                            fill="#95EAB3"
                          />
                          <path
                            id="Vector_101"
                            d="M485.386 732.801C495.817 732.801 504.273 724.345 504.273 713.914C504.273 703.483 495.817 695.028 485.386 695.028C474.955 695.028 466.5 703.483 466.5 713.914C466.5 724.345 474.955 732.801 485.386 732.801Z"
                            fill="#81D89A"
                          />
                          <path
                            id="&#219;&#177;&#219;&#179;"
                            d="M469.401 702.561L474.463 701.991L476.488 722.715L471.426 723.285L469.401 702.561ZM495.218 714.204C493.847 714.204 492.603 713.751 491.485 712.844C490.346 713.751 489.059 714.204 487.625 714.204H487.055C486.844 714.204 486.57 714.183 486.233 714.141L487.055 722.715L481.993 723.285L479.968 702.561L485.03 701.991L485.537 707.212C485.642 708.076 486.074 708.509 486.834 708.509H487.625C487.983 708.509 488.289 708.435 488.542 708.287C488.796 708.14 488.912 707.939 488.89 707.686V707.655L488.447 703.288L493.51 702.719L493.953 707.37C494.016 708.129 494.438 708.509 495.218 708.509H495.566C495.925 708.509 496.231 708.425 496.484 708.256C496.737 708.087 496.853 707.887 496.832 707.655L496.326 702.561L501.388 701.991L501.894 707.401C501.916 707.528 501.926 707.718 501.926 707.971C501.926 709.089 501.631 710.133 501.04 711.103C500.45 712.053 499.669 712.812 498.699 713.381C497.729 713.93 496.684 714.204 495.566 714.204H495.218Z"
                            fill="#41BE7B"
                          />
                        </>
                      )}
                      {levelState.current[13]?.today ? (
                        <>
                          <path
                            id="Vector_100"
                            d="M485.386 745.077C502.597 745.077 516.549 731.125 516.549 713.914C516.549 696.703 502.597 682.751 485.386 682.751C468.175 682.751 454.223 696.703 454.223 713.914C454.223 731.125 468.175 745.077 485.386 745.077Z"
                            fill="white"
                          />
                          <path
                            id="Vector_101"
                            d="M485.386 732.801C495.817 732.801 504.273 724.345 504.273 713.914C504.273 703.483 495.817 695.028 485.386 695.028C474.955 695.028 466.5 703.483 466.5 713.914C466.5 724.345 474.955 732.801 485.386 732.801Z"
                            fill="#DCDFF9"
                          />
                          <path
                            id="&#219;&#177;&#219;&#179;"
                            d="M469.401 702.561L474.463 701.991L476.488 722.715L471.426 723.285L469.401 702.561ZM495.218 714.204C493.847 714.204 492.603 713.751 491.485 712.844C490.346 713.751 489.059 714.204 487.625 714.204H487.055C486.844 714.204 486.57 714.183 486.233 714.141L487.055 722.715L481.993 723.285L479.968 702.561L485.03 701.991L485.537 707.212C485.642 708.076 486.074 708.509 486.834 708.509H487.625C487.983 708.509 488.289 708.435 488.542 708.287C488.796 708.14 488.912 707.939 488.89 707.686V707.655L488.447 703.288L493.51 702.719L493.953 707.37C494.016 708.129 494.438 708.509 495.218 708.509H495.566C495.925 708.509 496.231 708.425 496.484 708.256C496.737 708.087 496.853 707.887 496.832 707.655L496.326 702.561L501.388 701.991L501.894 707.401C501.916 707.528 501.926 707.718 501.926 707.971C501.926 709.089 501.631 710.133 501.04 711.103C500.45 712.053 499.669 712.812 498.699 713.381C497.729 713.93 496.684 714.204 495.566 714.204H495.218Z"
                            fill="#31A064"
                          />
                        </>
                      ) : null}
                    </g>
                    <g id="level_15" onClick={() => handleLevelClick(15)}>
                      {levelState.current[15]?.lock ? (
                        <>
                          <path
                            id="Vector_102"
                            d="M578.245 869.099C595.456 869.099 609.408 855.147 609.408 837.936C609.408 820.726 595.456 806.773 578.245 806.773C561.035 806.773 547.083 820.726 547.083 837.936C547.083 855.147 561.035 869.099 578.245 869.099Z"
                            fill="#57B679"
                          />
                          <path
                            id="Vector_103"
                            d="M578.246 856.823C588.676 856.823 597.132 848.367 597.132 837.936C597.132 827.506 588.676 819.05 578.246 819.05C567.815 819.05 559.359 827.506 559.359 837.936C559.359 848.367 567.815 856.823 578.246 856.823Z"
                            fill="#4DA06B"
                          />
                          <path
                            id="&#219;&#177;&#219;&#181;"
                            d="M562.596 826.561L567.658 825.991L569.683 846.715L564.621 847.285L562.596 826.561ZM586.99 847C585.598 847 584.364 846.578 583.288 845.734C582.212 846.578 580.978 847 579.586 847H579.238C578.099 847 577.055 846.715 576.106 846.146C575.156 845.555 574.408 844.764 573.859 843.773C573.311 842.76 573.037 841.663 573.037 840.482C573.037 838.584 573.174 837.076 573.448 835.958C573.743 834.84 574.334 833.658 575.22 832.414C576.106 831.148 577.603 829.345 579.713 827.004L579.175 826.402L582.908 822.606C586.536 826.613 589.004 829.44 590.312 831.085C591.62 832.73 592.485 834.186 592.907 835.451C593.328 836.696 593.539 838.373 593.539 840.482C593.539 841.663 593.265 842.76 592.717 843.773C592.168 844.764 591.419 845.555 590.47 846.146C589.521 846.715 588.477 847 587.338 847H586.99ZM578.099 840.482C578.099 840.714 578.194 840.915 578.384 841.083C578.595 841.231 578.879 841.305 579.238 841.305H579.586C579.924 841.305 580.198 841.22 580.409 841.052C580.641 840.883 580.757 840.693 580.757 840.482V838.552H585.819V840.229C585.882 840.946 586.273 841.305 586.99 841.305H587.338C587.696 841.305 587.971 841.231 588.161 841.083C588.371 840.915 588.477 840.714 588.477 840.482C588.477 839.28 588.371 838.331 588.161 837.635C587.971 836.938 587.528 836.126 586.832 835.198C586.157 834.27 584.975 832.857 583.288 830.959C581.516 832.92 580.303 834.333 579.649 835.198C578.995 836.063 578.574 836.844 578.384 837.54C578.194 838.215 578.099 839.195 578.099 840.482Z"
                            fill="#A3DBAF"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            id="Vector_102"
                            d="M578.245 869.099C595.456 869.099 609.408 855.147 609.408 837.936C609.408 820.726 595.456 806.773 578.245 806.773C561.035 806.773 547.083 820.726 547.083 837.936C547.083 855.147 561.035 869.099 578.245 869.099Z"
                            fill="#95EAB3"
                          />
                          <path
                            id="Vector_103"
                            d="M578.246 856.823C588.676 856.823 597.132 848.367 597.132 837.936C597.132 827.506 588.676 819.05 578.246 819.05C567.815 819.05 559.359 827.506 559.359 837.936C559.359 848.367 567.815 856.823 578.246 856.823Z"
                            fill="#81D89A"
                          />
                          <path
                            id="&#219;&#177;&#219;&#181;"
                            d="M562.596 826.561L567.658 825.991L569.683 846.715L564.621 847.285L562.596 826.561ZM586.99 847C585.598 847 584.364 846.578 583.288 845.734C582.212 846.578 580.978 847 579.586 847H579.238C578.099 847 577.055 846.715 576.106 846.146C575.156 845.555 574.408 844.764 573.859 843.773C573.311 842.76 573.037 841.663 573.037 840.482C573.037 838.584 573.174 837.076 573.448 835.958C573.743 834.84 574.334 833.658 575.22 832.414C576.106 831.148 577.603 829.345 579.713 827.004L579.175 826.402L582.908 822.606C586.536 826.613 589.004 829.44 590.312 831.085C591.62 832.73 592.485 834.186 592.907 835.451C593.328 836.696 593.539 838.373 593.539 840.482C593.539 841.663 593.265 842.76 592.717 843.773C592.168 844.764 591.419 845.555 590.47 846.146C589.521 846.715 588.477 847 587.338 847H586.99ZM578.099 840.482C578.099 840.714 578.194 840.915 578.384 841.083C578.595 841.231 578.879 841.305 579.238 841.305H579.586C579.924 841.305 580.198 841.22 580.409 841.052C580.641 840.883 580.757 840.693 580.757 840.482V838.552H585.819V840.229C585.882 840.946 586.273 841.305 586.99 841.305H587.338C587.696 841.305 587.971 841.231 588.161 841.083C588.371 840.915 588.477 840.714 588.477 840.482C588.477 839.28 588.371 838.331 588.161 837.635C587.971 836.938 587.528 836.126 586.832 835.198C586.157 834.27 584.975 832.857 583.288 830.959C581.516 832.92 580.303 834.333 579.649 835.198C578.995 836.063 578.574 836.844 578.384 837.54C578.194 838.215 578.099 839.195 578.099 840.482Z"
                            fill="#41BE7B"
                          />
                        </>
                      )}
                      {levelState.current[15]?.today ? (
                        <>
                          <path
                            id="Vector_102"
                            d="M578.245 869.099C595.456 869.099 609.408 855.147 609.408 837.936C609.408 820.726 595.456 806.773 578.245 806.773C561.035 806.773 547.083 820.726 547.083 837.936C547.083 855.147 561.035 869.099 578.245 869.099Z"
                            fill="white"
                          />
                          <path
                            id="Vector_103"
                            d="M578.246 856.823C588.676 856.823 597.132 848.367 597.132 837.936C597.132 827.506 588.676 819.05 578.246 819.05C567.815 819.05 559.359 827.506 559.359 837.936C559.359 848.367 567.815 856.823 578.246 856.823Z"
                            fill="#DCDFF9"
                          />
                          <path
                            id="&#219;&#177;&#219;&#181;"
                            d="M562.596 826.561L567.658 825.991L569.683 846.715L564.621 847.285L562.596 826.561ZM586.99 847C585.598 847 584.364 846.578 583.288 845.734C582.212 846.578 580.978 847 579.586 847H579.238C578.099 847 577.055 846.715 576.106 846.146C575.156 845.555 574.408 844.764 573.859 843.773C573.311 842.76 573.037 841.663 573.037 840.482C573.037 838.584 573.174 837.076 573.448 835.958C573.743 834.84 574.334 833.658 575.22 832.414C576.106 831.148 577.603 829.345 579.713 827.004L579.175 826.402L582.908 822.606C586.536 826.613 589.004 829.44 590.312 831.085C591.62 832.73 592.485 834.186 592.907 835.451C593.328 836.696 593.539 838.373 593.539 840.482C593.539 841.663 593.265 842.76 592.717 843.773C592.168 844.764 591.419 845.555 590.47 846.146C589.521 846.715 588.477 847 587.338 847H586.99ZM578.099 840.482C578.099 840.714 578.194 840.915 578.384 841.083C578.595 841.231 578.879 841.305 579.238 841.305H579.586C579.924 841.305 580.198 841.22 580.409 841.052C580.641 840.883 580.757 840.693 580.757 840.482V838.552H585.819V840.229C585.882 840.946 586.273 841.305 586.99 841.305H587.338C587.696 841.305 587.971 841.231 588.161 841.083C588.371 840.915 588.477 840.714 588.477 840.482C588.477 839.28 588.371 838.331 588.161 837.635C587.971 836.938 587.528 836.126 586.832 835.198C586.157 834.27 584.975 832.857 583.288 830.959C581.516 832.92 580.303 834.333 579.649 835.198C578.995 836.063 578.574 836.844 578.384 837.54C578.194 838.215 578.099 839.195 578.099 840.482Z"
                            fill="#31A064"
                          />
                        </>
                      ) : null}
                    </g>
                    <g id="level_5" onClick={() => handleLevelClick(5)}>
                      {levelState.current[5]?.lock ? (
                        <>
                          <path
                            id="Vector_104"
                            d="M655.366 226.325C672.577 226.325 686.529 212.373 686.529 195.162C686.529 177.951 672.577 163.999 655.366 163.999C638.155 163.999 624.203 177.951 624.203 195.162C624.203 212.373 638.155 226.325 655.366 226.325Z"
                            fill="#57B679"
                          />
                          <path
                            id="Vector_105"
                            d="M655.366 214.048C665.796 214.048 674.252 205.593 674.252 195.162C674.252 184.731 665.796 176.275 655.366 176.275C644.935 176.275 636.479 184.731 636.479 195.162C636.479 205.593 644.935 214.048 655.366 214.048Z"
                            fill="#4DA06B"
                          />
                          <path
                            id="&#219;&#181;"
                            d="M659.206 204C657.814 204 656.58 203.578 655.504 202.734C654.429 203.578 653.195 204 651.802 204H651.454C650.315 204 649.271 203.715 648.322 203.146C647.373 202.555 646.624 201.764 646.076 200.773C645.527 199.76 645.253 198.663 645.253 197.482C645.253 195.584 645.39 194.076 645.664 192.958C645.96 191.84 646.55 190.658 647.436 189.414C648.322 188.148 649.82 186.345 651.929 184.004L651.391 183.402L655.125 179.606C658.753 183.613 661.221 186.44 662.528 188.085C663.836 189.73 664.701 191.186 665.123 192.451C665.545 193.696 665.756 195.373 665.756 197.482C665.756 198.663 665.481 199.76 664.933 200.773C664.385 201.764 663.636 202.555 662.687 203.146C661.737 203.715 660.693 204 659.554 204H659.206ZM650.315 197.482C650.315 197.714 650.41 197.915 650.6 198.083C650.811 198.231 651.096 198.305 651.454 198.305H651.802C652.14 198.305 652.414 198.22 652.625 198.052C652.857 197.883 652.973 197.693 652.973 197.482V195.552H658.036V197.229C658.099 197.946 658.489 198.305 659.206 198.305H659.554C659.913 198.305 660.187 198.231 660.377 198.083C660.588 197.915 660.693 197.714 660.693 197.482C660.693 196.28 660.588 195.331 660.377 194.635C660.187 193.938 659.744 193.126 659.048 192.198C658.373 191.27 657.192 189.857 655.504 187.959C653.732 189.92 652.52 191.333 651.866 192.198C651.212 193.063 650.79 193.844 650.6 194.54C650.41 195.215 650.315 196.195 650.315 197.482Z"
                            fill="#A3DBAF"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            id="Vector_104"
                            d="M655.366 226.325C672.577 226.325 686.529 212.373 686.529 195.162C686.529 177.951 672.577 163.999 655.366 163.999C638.155 163.999 624.203 177.951 624.203 195.162C624.203 212.373 638.155 226.325 655.366 226.325Z"
                            fill="#95EAB3"
                          />
                          <path
                            id="Vector_105"
                            d="M655.366 214.048C665.796 214.048 674.252 205.593 674.252 195.162C674.252 184.731 665.796 176.275 655.366 176.275C644.935 176.275 636.479 184.731 636.479 195.162C636.479 205.593 644.935 214.048 655.366 214.048Z"
                            fill="#81D89A"
                          />
                          <path
                            id="&#219;&#181;"
                            d="M659.206 204C657.814 204 656.58 203.578 655.504 202.734C654.429 203.578 653.195 204 651.802 204H651.454C650.315 204 649.271 203.715 648.322 203.146C647.373 202.555 646.624 201.764 646.076 200.773C645.527 199.76 645.253 198.663 645.253 197.482C645.253 195.584 645.39 194.076 645.664 192.958C645.96 191.84 646.55 190.658 647.436 189.414C648.322 188.148 649.82 186.345 651.929 184.004L651.391 183.402L655.125 179.606C658.753 183.613 661.221 186.44 662.528 188.085C663.836 189.73 664.701 191.186 665.123 192.451C665.545 193.696 665.756 195.373 665.756 197.482C665.756 198.663 665.481 199.76 664.933 200.773C664.385 201.764 663.636 202.555 662.687 203.146C661.737 203.715 660.693 204 659.554 204H659.206ZM650.315 197.482C650.315 197.714 650.41 197.915 650.6 198.083C650.811 198.231 651.096 198.305 651.454 198.305H651.802C652.14 198.305 652.414 198.22 652.625 198.052C652.857 197.883 652.973 197.693 652.973 197.482V195.552H658.036V197.229C658.099 197.946 658.489 198.305 659.206 198.305H659.554C659.913 198.305 660.187 198.231 660.377 198.083C660.588 197.915 660.693 197.714 660.693 197.482C660.693 196.28 660.588 195.331 660.377 194.635C660.187 193.938 659.744 193.126 659.048 192.198C658.373 191.27 657.192 189.857 655.504 187.959C653.732 189.92 652.52 191.333 651.866 192.198C651.212 193.063 650.79 193.844 650.6 194.54C650.41 195.215 650.315 196.195 650.315 197.482Z"
                            fill="#41BE7B"
                          />
                        </>
                      )}
                      {levelState.current[5]?.today ? (
                        <>
                          <path
                            id="Vector_104"
                            d="M655.366 226.325C672.577 226.325 686.529 212.373 686.529 195.162C686.529 177.951 672.577 163.999 655.366 163.999C638.155 163.999 624.203 177.951 624.203 195.162C624.203 212.373 638.155 226.325 655.366 226.325Z"
                            fill="white"
                          />
                          <path
                            id="Vector_105"
                            d="M655.366 214.048C665.796 214.048 674.252 205.593 674.252 195.162C674.252 184.731 665.796 176.275 655.366 176.275C644.935 176.275 636.479 184.731 636.479 195.162C636.479 205.593 644.935 214.048 655.366 214.048Z"
                            fill="#DCDFF9"
                          />
                          <path
                            id="&#219;&#181;"
                            d="M659.206 204C657.814 204 656.58 203.578 655.504 202.734C654.429 203.578 653.195 204 651.802 204H651.454C650.315 204 649.271 203.715 648.322 203.146C647.373 202.555 646.624 201.764 646.076 200.773C645.527 199.76 645.253 198.663 645.253 197.482C645.253 195.584 645.39 194.076 645.664 192.958C645.96 191.84 646.55 190.658 647.436 189.414C648.322 188.148 649.82 186.345 651.929 184.004L651.391 183.402L655.125 179.606C658.753 183.613 661.221 186.44 662.528 188.085C663.836 189.73 664.701 191.186 665.123 192.451C665.545 193.696 665.756 195.373 665.756 197.482C665.756 198.663 665.481 199.76 664.933 200.773C664.385 201.764 663.636 202.555 662.687 203.146C661.737 203.715 660.693 204 659.554 204H659.206ZM650.315 197.482C650.315 197.714 650.41 197.915 650.6 198.083C650.811 198.231 651.096 198.305 651.454 198.305H651.802C652.14 198.305 652.414 198.22 652.625 198.052C652.857 197.883 652.973 197.693 652.973 197.482V195.552H658.036V197.229C658.099 197.946 658.489 198.305 659.206 198.305H659.554C659.913 198.305 660.187 198.231 660.377 198.083C660.588 197.915 660.693 197.714 660.693 197.482C660.693 196.28 660.588 195.331 660.377 194.635C660.187 193.938 659.744 193.126 659.048 192.198C658.373 191.27 657.192 189.857 655.504 187.959C653.732 189.92 652.52 191.333 651.866 192.198C651.212 193.063 650.79 193.844 650.6 194.54C650.41 195.215 650.315 196.195 650.315 197.482Z"
                            fill="#31A064"
                          />
                        </>
                      ) : null}
                    </g>
                    <g id="level_2" onClick={() => handleLevelClick(2)}>
                      {levelState.current[2]?.lock ? (
                        <>
                          <path
                            id="Vector_106"
                            d="M256.228 299.353C273.439 299.353 287.391 285.401 287.391 268.19C287.391 250.979 273.439 237.027 256.228 237.027C239.018 237.027 225.065 250.979 225.065 268.19C225.065 285.401 239.018 299.353 256.228 299.353Z"
                            fill="#57B679"
                          />
                          <path
                            id="Vector_107"
                            d="M256.228 287.076C266.659 287.076 275.115 278.621 275.115 268.19C275.115 257.759 266.659 249.303 256.228 249.303C245.798 249.303 237.342 257.759 237.342 268.19C237.342 278.621 245.798 287.076 256.228 287.076Z"
                            fill="#4DA06B"
                          />
                          <path
                            id="&#219;&#178;"
                            d="M263.41 255.833L263.948 261.148C263.969 261.296 263.98 261.507 263.98 261.781C263.98 262.899 263.684 263.943 263.094 264.914C262.524 265.863 261.754 266.633 260.784 267.223C259.814 267.793 258.759 268.078 257.62 268.078H257.019C256.534 268.078 256.049 268.014 255.563 267.888L256.418 276.589L251.355 277.158L249.33 256.402L254.393 255.833L254.931 261.433C255.015 261.834 255.142 262.098 255.31 262.224C255.479 262.33 255.774 262.382 256.196 262.382H257.62C258.084 262.382 258.411 262.33 258.601 262.224C258.812 262.119 258.907 261.918 258.886 261.623L258.348 256.402L263.41 255.833Z"
                            fill="#A3DBAF"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            id="Vector_106"
                            d="M256.228 299.353C273.439 299.353 287.391 285.401 287.391 268.19C287.391 250.979 273.439 237.027 256.228 237.027C239.018 237.027 225.065 250.979 225.065 268.19C225.065 285.401 239.018 299.353 256.228 299.353Z"
                            fill="#95EAB3"
                          />
                          <path
                            id="Vector_107"
                            d="M256.228 287.076C266.659 287.076 275.115 278.621 275.115 268.19C275.115 257.759 266.659 249.303 256.228 249.303C245.798 249.303 237.342 257.759 237.342 268.19C237.342 278.621 245.798 287.076 256.228 287.076Z"
                            fill="#81D89A"
                          />
                          <path
                            id="&#219;&#178;"
                            d="M263.41 255.833L263.948 261.148C263.969 261.296 263.98 261.507 263.98 261.781C263.98 262.899 263.684 263.943 263.094 264.914C262.524 265.863 261.754 266.633 260.784 267.223C259.814 267.793 258.759 268.078 257.62 268.078H257.019C256.534 268.078 256.049 268.014 255.563 267.888L256.418 276.589L251.355 277.158L249.33 256.402L254.393 255.833L254.931 261.433C255.015 261.834 255.142 262.098 255.31 262.224C255.479 262.33 255.774 262.382 256.196 262.382H257.62C258.084 262.382 258.411 262.33 258.601 262.224C258.812 262.119 258.907 261.918 258.886 261.623L258.348 256.402L263.41 255.833Z"
                            fill="#41BE7B"
                          />
                        </>
                      )}
                      {levelState.current[2]?.today ? (
                        <>
                          <path
                            id="Vector_106"
                            d="M256.228 299.353C273.439 299.353 287.391 285.401 287.391 268.19C287.391 250.979 273.439 237.027 256.228 237.027C239.018 237.027 225.065 250.979 225.065 268.19C225.065 285.401 239.018 299.353 256.228 299.353Z"
                            fill="white"
                          />
                          <path
                            id="Vector_107"
                            d="M256.228 287.076C266.659 287.076 275.115 278.621 275.115 268.19C275.115 257.759 266.659 249.303 256.228 249.303C245.798 249.303 237.342 257.759 237.342 268.19C237.342 278.621 245.798 287.076 256.228 287.076Z"
                            fill="#DCDFF9"
                          />
                          <path
                            id="&#219;&#178;"
                            d="M263.41 255.833L263.948 261.148C263.969 261.296 263.98 261.507 263.98 261.781C263.98 262.899 263.684 263.943 263.094 264.914C262.524 265.863 261.754 266.633 260.784 267.223C259.814 267.793 258.759 268.078 257.62 268.078H257.019C256.534 268.078 256.049 268.014 255.563 267.888L256.418 276.589L251.355 277.158L249.33 256.402L254.393 255.833L254.931 261.433C255.015 261.834 255.142 262.098 255.31 262.224C255.479 262.33 255.774 262.382 256.196 262.382H257.62C258.084 262.382 258.411 262.33 258.601 262.224C258.812 262.119 258.907 261.918 258.886 261.623L258.348 256.402L263.41 255.833Z"
                            fill="#31A064"
                          />
                        </>
                      ) : null}
                    </g>
                    <g
                      id="level_1"
                      onClick={() => handleLevelClick(1)}
                      viewBox="0 0 63 63"
                    >
                      {levelState.current[1]?.lock ? (
                        <>
                          <path
                            id="Vector_108"
                            d="M162.425 254.025C179.636 254.025 193.588 240.073 193.588 222.862C193.588 205.651 179.636 191.699 162.425 191.699C145.214 191.699 131.262 205.651 131.262 222.862C131.262 240.073 145.214 254.025 162.425 254.025Z"
                            fill="#57B679"
                          />
                          <path
                            id="Vector_109"
                            d="M162.425 241.749C172.855 241.749 181.311 233.293 181.311 222.862C181.311 212.431 172.855 203.976 162.425 203.976C151.994 203.976 143.538 212.431 143.538 222.862C143.538 233.293 151.994 241.749 162.425 241.749Z"
                            fill="#4DA06B"
                          />
                          <path
                            id="&#219;&#177;"
                            d="M158.482 211.561L163.544 210.991L165.569 231.715L160.507 232.285L158.482 211.561Z"
                            fill="#A3DBAF"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            id="Vector_108"
                            d="M162.425 254.025C179.636 254.025 193.588 240.073 193.588 222.862C193.588 205.651 179.636 191.699 162.425 191.699C145.214 191.699 131.262 205.651 131.262 222.862C131.262 240.073 145.214 254.025 162.425 254.025Z"
                            fill="#95EAB3"
                          />
                          <path
                            id="Vector_109"
                            d="M162.425 241.749C172.855 241.749 181.311 233.293 181.311 222.862C181.311 212.431 172.855 203.976 162.425 203.976C151.994 203.976 143.538 212.431 143.538 222.862C143.538 233.293 151.994 241.749 162.425 241.749Z"
                            fill="#81D89A"
                          />
                          <path
                            id="&#219;&#177;"
                            d="M158.482 211.561L163.544 210.991L165.569 231.715L160.507 232.285L158.482 211.561Z"
                            fill="#41BE7B"
                          />
                        </>
                      )}
                      {levelState.current[1]?.today ? (
                        <>
                          <path
                            id="Vector_108"
                            d="M162.425 254.025C179.636 254.025 193.588 240.073 193.588 222.862C193.588 205.651 179.636 191.699 162.425 191.699C145.214 191.699 131.262 205.651 131.262 222.862C131.262 240.073 145.214 254.025 162.425 254.025Z"
                            fill="white"
                          />
                          <path
                            id="Vector_109"
                            d="M162.425 241.749C172.855 241.749 181.311 233.293 181.311 222.862C181.311 212.431 172.855 203.976 162.425 203.976C151.994 203.976 143.538 212.431 143.538 222.862C143.538 233.293 151.994 241.749 162.425 241.749Z"
                            fill="#DCDFF9"
                          />
                          <path
                            id="&#219;&#177;"
                            d="M158.482 211.561L163.544 210.991L165.569 231.715L160.507 232.285L158.482 211.561Z"
                            fill="#31A064"
                          />
                        </>
                      ) : null}
                    </g>
                    <g id="level_3" onClick={() => handleLevelClick(3)}>
                      {levelState.current[3]?.lock ? (
                        <>
                          <g id="Vector_110" filter="url(#filter0_d_526_1436)">
                            <path
                              d="M464.611 355.698C481.822 355.698 495.774 341.746 495.774 324.535C495.774 307.324 481.822 293.372 464.611 293.372C447.4 293.372 433.448 307.324 433.448 324.535C433.448 341.746 447.4 355.698 464.611 355.698Z"
                              fill="#57B679"
                            />
                          </g>
                          <path
                            id="Vector_111"
                            d="M464.611 343.422C475.042 343.422 483.497 334.966 483.497 324.535C483.497 314.104 475.042 305.648 464.611 305.648C454.18 305.648 445.724 314.104 445.724 324.535C445.724 334.966 454.18 343.422 464.611 343.422Z"
                            fill="#4DA06B"
                          />
                          <path
                            id="&#219;&#179;"
                            d="M468.935 325.204C467.564 325.204 466.319 324.751 465.201 323.844C464.062 324.751 462.776 325.204 461.341 325.204H460.772C460.561 325.204 460.287 325.183 459.949 325.141L460.772 333.715L455.709 334.285L453.684 313.561L458.747 312.991L459.253 318.212C459.358 319.076 459.791 319.509 460.55 319.509H461.341C461.7 319.509 462.006 319.435 462.259 319.287C462.512 319.14 462.628 318.939 462.607 318.686V318.655L462.164 314.288L467.226 313.719L467.669 318.37C467.732 319.129 468.154 319.509 468.935 319.509H469.283C469.641 319.509 469.947 319.425 470.2 319.256C470.454 319.087 470.57 318.887 470.548 318.655L470.042 313.561L475.105 312.991L475.611 318.401C475.632 318.528 475.642 318.718 475.642 318.971C475.642 320.089 475.347 321.133 474.757 322.103C474.166 323.053 473.385 323.812 472.415 324.381C471.445 324.93 470.401 325.204 469.283 325.204H468.935Z"
                            fill="#A3DBAF"
                          />
                        </>
                      ) : (
                        <>
                          <g id="Vector_110" filter="url(#filter0_d_526_1436)">
                            <path
                              d="M464.611 355.698C481.822 355.698 495.774 341.746 495.774 324.535C495.774 307.324 481.822 293.372 464.611 293.372C447.4 293.372 433.448 307.324 433.448 324.535C433.448 341.746 447.4 355.698 464.611 355.698Z"
                              fill="#95EAB3"
                            />
                          </g>
                          <path
                            id="Vector_111"
                            d="M464.611 343.422C475.042 343.422 483.497 334.966 483.497 324.535C483.497 314.104 475.042 305.648 464.611 305.648C454.18 305.648 445.724 314.104 445.724 324.535C445.724 334.966 454.18 343.422 464.611 343.422Z"
                            fill="#81D89A"
                          />
                          <path
                            id="&#219;&#179;"
                            d="M468.935 325.204C467.564 325.204 466.319 324.751 465.201 323.844C464.062 324.751 462.776 325.204 461.341 325.204H460.772C460.561 325.204 460.287 325.183 459.949 325.141L460.772 333.715L455.709 334.285L453.684 313.561L458.747 312.991L459.253 318.212C459.358 319.076 459.791 319.509 460.55 319.509H461.341C461.7 319.509 462.006 319.435 462.259 319.287C462.512 319.14 462.628 318.939 462.607 318.686V318.655L462.164 314.288L467.226 313.719L467.669 318.37C467.732 319.129 468.154 319.509 468.935 319.509H469.283C469.641 319.509 469.947 319.425 470.2 319.256C470.454 319.087 470.57 318.887 470.548 318.655L470.042 313.561L475.105 312.991L475.611 318.401C475.632 318.528 475.642 318.718 475.642 318.971C475.642 320.089 475.347 321.133 474.757 322.103C474.166 323.053 473.385 323.812 472.415 324.381C471.445 324.93 470.401 325.204 469.283 325.204H468.935Z"
                            fill="#41BE7B"
                          />
                        </>
                      )}
                      {levelState.current[3]?.today ? (
                        <>
                          <g id="Vector_110" filter="url(#filter0_d_526_1436)">
                            <path
                              d="M464.611 355.698C481.822 355.698 495.774 341.746 495.774 324.535C495.774 307.324 481.822 293.372 464.611 293.372C447.4 293.372 433.448 307.324 433.448 324.535C433.448 341.746 447.4 355.698 464.611 355.698Z"
                              fill="white"
                            />
                          </g>
                          <path
                            id="Vector_111"
                            d="M464.611 343.422C475.042 343.422 483.497 334.966 483.497 324.535C483.497 314.104 475.042 305.648 464.611 305.648C454.18 305.648 445.724 314.104 445.724 324.535C445.724 334.966 454.18 343.422 464.611 343.422Z"
                            fill="#DCDFF9"
                          />
                          <path
                            id="&#219;&#179;"
                            d="M468.935 325.204C467.564 325.204 466.319 324.751 465.201 323.844C464.062 324.751 462.776 325.204 461.341 325.204H460.772C460.561 325.204 460.287 325.183 459.949 325.141L460.772 333.715L455.709 334.285L453.684 313.561L458.747 312.991L459.253 318.212C459.358 319.076 459.791 319.509 460.55 319.509H461.341C461.7 319.509 462.006 319.435 462.259 319.287C462.512 319.14 462.628 318.939 462.607 318.686V318.655L462.164 314.288L467.226 313.719L467.669 318.37C467.732 319.129 468.154 319.509 468.935 319.509H469.283C469.641 319.509 469.947 319.425 470.2 319.256C470.454 319.087 470.57 318.887 470.548 318.655L470.042 313.561L475.105 312.991L475.611 318.401C475.632 318.528 475.642 318.718 475.642 318.971C475.642 320.089 475.347 321.133 474.757 322.103C474.166 323.053 473.385 323.812 472.415 324.381C471.445 324.93 470.401 325.204 469.283 325.204H468.935Z"
                            fill="#31A064"
                          />
                        </>
                      ) : null}
                    </g>
                    <g id="level_6" onClick={() => handleLevelClick(6)}>
                      {levelState.current[6]?.lock ? (
                        <>
                          <path
                            id="Vector_112"
                            d="M714.544 386.861C731.755 386.861 745.707 372.909 745.707 355.698C745.707 338.487 731.755 324.535 714.544 324.535C697.333 324.535 683.381 338.487 683.381 355.698C683.381 372.909 697.333 386.861 714.544 386.861Z"
                            fill="#57B679"
                          />
                          <path
                            id="Vector_113"
                            d="M714.544 374.585C724.975 374.585 733.43 366.129 733.43 355.698C733.43 345.267 724.975 336.811 714.544 336.811C704.113 336.811 695.657 345.267 695.657 355.698C695.657 366.129 704.113 374.585 714.544 374.585Z"
                            fill="#4DA06B"
                          />
                          <path
                            id="&#219;&#182;"
                            d="M722.443 349.528L719.342 354.116H719.374L719.026 354.59L710.926 366.582L706.749 363.418L711.179 356.837C710.63 356.605 710.177 356.373 709.818 356.141C708.785 355.487 707.983 354.612 707.414 353.515C706.844 352.397 706.559 351.216 706.559 349.971C706.559 348.452 706.971 347.081 707.793 345.858C708.068 345.457 708.626 344.919 709.47 344.244C710.335 343.548 711.295 342.841 712.349 342.124L714.881 347.06C713.172 348.052 712.202 348.716 711.97 349.053C711.717 349.433 711.59 349.771 711.59 350.066C711.59 350.467 711.854 350.857 712.381 351.237C712.698 351.49 713.098 351.616 713.583 351.616C713.921 351.616 714.237 351.553 714.533 351.426C714.828 351.3 715.049 351.121 715.197 350.889L718.266 346.364L722.443 349.528Z"
                            fill="#A3DBAF"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            id="Vector_112"
                            d="M714.544 386.861C731.755 386.861 745.707 372.909 745.707 355.698C745.707 338.487 731.755 324.535 714.544 324.535C697.333 324.535 683.381 338.487 683.381 355.698C683.381 372.909 697.333 386.861 714.544 386.861Z"
                            fill="#95EAB3"
                          />
                          <path
                            id="Vector_113"
                            d="M714.544 374.585C724.975 374.585 733.43 366.129 733.43 355.698C733.43 345.267 724.975 336.811 714.544 336.811C704.113 336.811 695.657 345.267 695.657 355.698C695.657 366.129 704.113 374.585 714.544 374.585Z"
                            fill="#81D89A"
                          />
                          <path
                            id="&#219;&#182;"
                            d="M722.443 349.528L719.342 354.116H719.374L719.026 354.59L710.926 366.582L706.749 363.418L711.179 356.837C710.63 356.605 710.177 356.373 709.818 356.141C708.785 355.487 707.983 354.612 707.414 353.515C706.844 352.397 706.559 351.216 706.559 349.971C706.559 348.452 706.971 347.081 707.793 345.858C708.068 345.457 708.626 344.919 709.47 344.244C710.335 343.548 711.295 342.841 712.349 342.124L714.881 347.06C713.172 348.052 712.202 348.716 711.97 349.053C711.717 349.433 711.59 349.771 711.59 350.066C711.59 350.467 711.854 350.857 712.381 351.237C712.698 351.49 713.098 351.616 713.583 351.616C713.921 351.616 714.237 351.553 714.533 351.426C714.828 351.3 715.049 351.121 715.197 350.889L718.266 346.364L722.443 349.528Z"
                            fill="#41BE7B"
                          />
                        </>
                      )}
                      {levelState.current[6]?.today ? (
                        <>
                          <path
                            id="Vector_112"
                            d="M714.544 386.861C731.755 386.861 745.707 372.909 745.707 355.698C745.707 338.487 731.755 324.535 714.544 324.535C697.333 324.535 683.381 338.487 683.381 355.698C683.381 372.909 697.333 386.861 714.544 386.861Z"
                            fill="white"
                          />
                          <path
                            id="Vector_113"
                            d="M714.544 374.585C724.975 374.585 733.43 366.129 733.43 355.698C733.43 345.267 724.975 336.811 714.544 336.811C704.113 336.811 695.657 345.267 695.657 355.698C695.657 366.129 704.113 374.585 714.544 374.585Z"
                            fill="#DCDFF9"
                          />
                          <path
                            id="&#219;&#182;"
                            d="M722.443 349.528L719.342 354.116H719.374L719.026 354.59L710.926 366.582L706.749 363.418L711.179 356.837C710.63 356.605 710.177 356.373 709.818 356.141C708.785 355.487 707.983 354.612 707.414 353.515C706.844 352.397 706.559 351.216 706.559 349.971C706.559 348.452 706.971 347.081 707.793 345.858C708.068 345.457 708.626 344.919 709.47 344.244C710.335 343.548 711.295 342.841 712.349 342.124L714.881 347.06C713.172 348.052 712.202 348.716 711.97 349.053C711.717 349.433 711.59 349.771 711.59 350.066C711.59 350.467 711.854 350.857 712.381 351.237C712.698 351.49 713.098 351.616 713.583 351.616C713.921 351.616 714.237 351.553 714.533 351.426C714.828 351.3 715.049 351.121 715.197 350.889L718.266 346.364L722.443 349.528Z"
                            fill="#31A064"
                          />
                        </>
                      ) : null}
                    </g>
                    <g id="level_8" onClick={() => handleLevelClick(8)}>
                      {levelState.current[8]?.lock ? (
                        <>
                          <path
                            id="Vector_114"
                            d="M529.455 479.72C546.666 479.72 560.618 465.768 560.618 448.557C560.618 431.346 546.666 417.394 529.455 417.394C512.244 417.394 498.292 431.346 498.292 448.557C498.292 465.768 512.244 479.72 529.455 479.72Z"
                            fill="#57B679"
                          />
                          <path
                            id="Vector_115"
                            d="M529.455 467.444C539.886 467.444 548.342 458.988 548.342 448.557C548.342 438.126 539.886 429.671 529.455 429.671C519.024 429.671 510.568 438.126 510.568 448.557C510.568 458.988 519.024 467.444 529.455 467.444Z"
                            fill="#4DA06B"
                          />
                          <path
                            id="&#219;&#184;"
                            d="M519.587 456.576L526.643 437.086H531.389L538.413 456.576L533.667 458.475L529.016 445.565L524.333 458.475L519.587 456.576Z"
                            fill="#A3DBAF"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            id="Vector_114"
                            d="M529.455 479.72C546.666 479.72 560.618 465.768 560.618 448.557C560.618 431.346 546.666 417.394 529.455 417.394C512.244 417.394 498.292 431.346 498.292 448.557C498.292 465.768 512.244 479.72 529.455 479.72Z"
                            fill="#95EAB3"
                          />
                          <path
                            id="Vector_115"
                            d="M529.455 467.444C539.886 467.444 548.342 458.988 548.342 448.557C548.342 438.126 539.886 429.671 529.455 429.671C519.024 429.671 510.568 438.126 510.568 448.557C510.568 458.988 519.024 467.444 529.455 467.444Z"
                            fill="#81D89A"
                          />
                          <path
                            id="&#219;&#184;"
                            d="M519.587 456.576L526.643 437.086H531.389L538.413 456.576L533.667 458.475L529.016 445.565L524.333 458.475L519.587 456.576Z"
                            fill="#41BE7B"
                          />
                        </>
                      )}
                      {levelState.current[8]?.today ? (
                        <>
                          <path
                            id="Vector_114"
                            d="M529.455 479.72C546.666 479.72 560.618 465.768 560.618 448.557C560.618 431.346 546.666 417.394 529.455 417.394C512.244 417.394 498.292 431.346 498.292 448.557C498.292 465.768 512.244 479.72 529.455 479.72Z"
                            fill="white"
                          />
                          <path
                            id="Vector_115"
                            d="M529.455 467.444C539.886 467.444 548.342 458.988 548.342 448.557C548.342 438.126 539.886 429.671 529.455 429.671C519.024 429.671 510.568 438.126 510.568 448.557C510.568 458.988 519.024 467.444 529.455 467.444Z"
                            fill="#DCDFF9"
                          />
                          <path
                            id="&#219;&#184;"
                            d="M519.587 456.576L526.643 437.086H531.389L538.413 456.576L533.667 458.475L529.016 445.565L524.333 458.475L519.587 456.576Z"
                            fill="#31A064"
                          />
                        </>
                      ) : null}
                    </g>
                    <g id="level_4" onClick={() => handleLevelClick(4)}>
                      {levelState.current[4]?.lock ? (
                        <>
                          <path
                            id="Vector_116"
                            d="M559.359 290.224C576.57 290.224 590.522 276.272 590.522 259.061C590.522 241.851 576.57 227.898 559.359 227.898C542.148 227.898 528.196 241.851 528.196 259.061C528.196 276.272 542.148 290.224 559.359 290.224Z"
                            fill="#57B679"
                          />
                          <path
                            id="Vector_117"
                            d="M559.359 277.948C569.79 277.948 578.245 269.492 578.245 259.061C578.245 248.631 569.79 240.175 559.359 240.175C548.928 240.175 540.472 248.631 540.472 259.061C540.472 269.492 548.928 277.948 559.359 277.948Z"
                            fill="#4DA06B"
                          />
                          <path
                            id="&#219;&#180;"
                            d="M556.533 259.204C556.258 259.204 556.058 259.194 555.931 259.172L556.754 267.715L551.692 268.285L550.236 253.034C550.215 252.992 550.205 252.918 550.205 252.813L549.698 247.529L554.761 246.959L555.299 252.528C555.341 252.844 555.415 253.076 555.52 253.224C555.626 253.351 555.773 253.435 555.963 253.477C555.858 252.908 555.805 252.38 555.805 251.895C555.805 250.566 556.121 249.343 556.754 248.225C557.408 247.107 558.283 246.221 559.38 245.567C560.477 244.913 561.669 244.586 562.955 244.586C563.778 244.586 564.748 244.808 565.866 245.251C566.984 245.673 567.849 246.042 568.461 246.358L566.214 251.421C565.645 251.21 565.054 250.999 564.443 250.788C563.831 250.556 563.335 250.387 562.955 250.282C562.85 250.239 562.692 250.218 562.481 250.218C562.017 250.218 561.627 250.398 561.31 250.756C561.015 251.094 560.867 251.473 560.867 251.895C560.867 252.338 560.994 252.718 561.247 253.034C561.521 253.351 561.848 253.509 562.228 253.509H568.303V259.204H556.533Z"
                            fill="#A3DBAF"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            id="Vector_116"
                            d="M559.359 290.224C576.57 290.224 590.522 276.272 590.522 259.061C590.522 241.851 576.57 227.898 559.359 227.898C542.148 227.898 528.196 241.851 528.196 259.061C528.196 276.272 542.148 290.224 559.359 290.224Z"
                            fill="#95EAB3"
                          />
                          <path
                            id="Vector_117"
                            d="M559.359 277.948C569.79 277.948 578.245 269.492 578.245 259.061C578.245 248.631 569.79 240.175 559.359 240.175C548.928 240.175 540.472 248.631 540.472 259.061C540.472 269.492 548.928 277.948 559.359 277.948Z"
                            fill="#81D89A"
                          />
                          <path
                            id="&#219;&#180;"
                            d="M556.533 259.204C556.258 259.204 556.058 259.194 555.931 259.172L556.754 267.715L551.692 268.285L550.236 253.034C550.215 252.992 550.205 252.918 550.205 252.813L549.698 247.529L554.761 246.959L555.299 252.528C555.341 252.844 555.415 253.076 555.52 253.224C555.626 253.351 555.773 253.435 555.963 253.477C555.858 252.908 555.805 252.38 555.805 251.895C555.805 250.566 556.121 249.343 556.754 248.225C557.408 247.107 558.283 246.221 559.38 245.567C560.477 244.913 561.669 244.586 562.955 244.586C563.778 244.586 564.748 244.808 565.866 245.251C566.984 245.673 567.849 246.042 568.461 246.358L566.214 251.421C565.645 251.21 565.054 250.999 564.443 250.788C563.831 250.556 563.335 250.387 562.955 250.282C562.85 250.239 562.692 250.218 562.481 250.218C562.017 250.218 561.627 250.398 561.31 250.756C561.015 251.094 560.867 251.473 560.867 251.895C560.867 252.338 560.994 252.718 561.247 253.034C561.521 253.351 561.848 253.509 562.228 253.509H568.303V259.204H556.533Z"
                            fill="#41BE7B"
                          />
                        </>
                      )}
                      {levelState.current[4]?.today ? (
                        <>
                          <path
                            id="Vector_116"
                            d="M559.359 290.224C576.57 290.224 590.522 276.272 590.522 259.061C590.522 241.851 576.57 227.898 559.359 227.898C542.148 227.898 528.196 241.851 528.196 259.061C528.196 276.272 542.148 290.224 559.359 290.224Z"
                            fill="white"
                          />
                          <path
                            id="Vector_117"
                            d="M559.359 277.948C569.79 277.948 578.245 269.492 578.245 259.061C578.245 248.631 569.79 240.175 559.359 240.175C548.928 240.175 540.472 248.631 540.472 259.061C540.472 269.492 548.928 277.948 559.359 277.948Z"
                            fill="#DCDFF9"
                          />
                          <path
                            id="&#219;&#180;"
                            d="M556.533 259.204C556.258 259.204 556.058 259.194 555.931 259.172L556.754 267.715L551.692 268.285L550.236 253.034C550.215 252.992 550.205 252.918 550.205 252.813L549.698 247.529L554.761 246.959L555.299 252.528C555.341 252.844 555.415 253.076 555.52 253.224C555.626 253.351 555.773 253.435 555.963 253.477C555.858 252.908 555.805 252.38 555.805 251.895C555.805 250.566 556.121 249.343 556.754 248.225C557.408 247.107 558.283 246.221 559.38 245.567C560.477 244.913 561.669 244.586 562.955 244.586C563.778 244.586 564.748 244.808 565.866 245.251C566.984 245.673 567.849 246.042 568.461 246.358L566.214 251.421C565.645 251.21 565.054 250.999 564.443 250.788C563.831 250.556 563.335 250.387 562.955 250.282C562.85 250.239 562.692 250.218 562.481 250.218C562.017 250.218 561.627 250.398 561.31 250.756C561.015 251.094 560.867 251.473 560.867 251.895C560.867 252.338 560.994 252.718 561.247 253.034C561.521 253.351 561.848 253.509 562.228 253.509H568.303V259.204H556.533Z"
                            fill="#31A064"
                          />
                        </>
                      ) : null}
                    </g>
                    <g id="level_7" onClick={() => handleLevelClick(7)}>
                      {levelState.current[7]?.lock ? (
                        <>
                          <path
                            id="Vector_118"
                            d="M604.057 519.697C621.268 519.697 635.22 505.745 635.22 488.534C635.22 471.323 621.268 457.371 604.057 457.371C586.846 457.371 572.894 471.323 572.894 488.534C572.894 505.745 586.846 519.697 604.057 519.697Z"
                            fill="#57B679"
                          />
                          <path
                            id="Vector_119"
                            d="M604.057 507.42C614.488 507.42 622.944 498.965 622.944 488.534C622.944 478.103 614.488 469.647 604.057 469.647C593.626 469.647 585.17 478.103 585.17 488.534C585.17 498.965 593.626 507.42 604.057 507.42Z"
                            fill="#4DA06B"
                          />
                          <path
                            id="&#219;&#183;"
                            d="M613.413 478.889L606.357 498.253H601.611L594.587 478.889L599.333 476.991L603.984 489.9L608.667 476.991L613.413 478.889Z"
                            fill="#A3DBAF"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            id="Vector_118"
                            d="M604.057 519.697C621.268 519.697 635.22 505.745 635.22 488.534C635.22 471.323 621.268 457.371 604.057 457.371C586.846 457.371 572.894 471.323 572.894 488.534C572.894 505.745 586.846 519.697 604.057 519.697Z"
                            fill="#95EAB3"
                          />
                          <path
                            id="Vector_119"
                            d="M604.057 507.42C614.488 507.42 622.944 498.965 622.944 488.534C622.944 478.103 614.488 469.647 604.057 469.647C593.626 469.647 585.17 478.103 585.17 488.534C585.17 498.965 593.626 507.42 604.057 507.42Z"
                            fill="#81D89A"
                          />
                          <path
                            id="&#219;&#183;"
                            d="M613.413 478.889L606.357 498.253H601.611L594.587 478.889L599.333 476.991L603.984 489.9L608.667 476.991L613.413 478.889Z"
                            fill="#41BE7B"
                          />
                        </>
                      )}
                      {levelState.current[7]?.today ? (
                        <>
                          <path
                            id="Vector_118"
                            d="M604.057 519.697C621.268 519.697 635.22 505.745 635.22 488.534C635.22 471.323 621.268 457.371 604.057 457.371C586.846 457.371 572.894 471.323 572.894 488.534C572.894 505.745 586.846 519.697 604.057 519.697Z"
                            fill="white"
                          />
                          <path
                            id="Vector_119"
                            d="M604.057 507.42C614.488 507.42 622.944 498.965 622.944 488.534C622.944 478.103 614.488 469.647 604.057 469.647C593.626 469.647 585.17 478.103 585.17 488.534C585.17 498.965 593.626 507.42 604.057 507.42Z"
                            fill="#DCDFF9"
                          />
                          <path
                            id="&#219;&#183;"
                            d="M613.413 478.889L606.357 498.253H601.611L594.587 478.889L599.333 476.991L603.984 489.9L608.667 476.991L613.413 478.889Z"
                            fill="#31A064"
                          />
                        </>
                      ) : null}
                    </g>
                    <g id="level_12" onClick={() => handleLevelClick(12)}>
                      {levelState.current[12]?.lock ? (
                        <>
                          <path
                            id="Vector_120"
                            d="M376.788 680.233C393.999 680.233 407.951 666.281 407.951 649.07C407.951 631.859 393.999 617.907 376.788 617.907C359.577 617.907 345.625 631.859 345.625 649.07C345.625 666.281 359.577 680.233 376.788 680.233Z"
                            fill="#57B679"
                          />
                          <path
                            id="Vector_121"
                            d="M376.788 667.957C387.219 667.957 395.675 659.501 395.675 649.07C395.675 638.639 387.219 630.184 376.788 630.184C366.357 630.184 357.901 638.639 357.901 649.07C357.901 659.501 366.357 667.957 376.788 667.957Z"
                            fill="#4DA06B"
                          />
                          <path
                            id="&#219;&#177;&#219;&#178;"
                            d="M363.547 637.561L368.609 636.991L370.634 657.715L365.572 658.285L363.547 637.561ZM388.194 636.833L388.732 642.148C388.753 642.296 388.763 642.507 388.763 642.781C388.763 643.899 388.468 644.943 387.877 645.914C387.308 646.863 386.538 647.633 385.568 648.223C384.597 648.793 383.543 649.078 382.404 649.078H381.802C381.317 649.078 380.832 649.014 380.347 648.888L381.201 657.589L376.139 658.158L374.114 637.402L379.176 636.833L379.714 642.433C379.799 642.834 379.925 643.098 380.094 643.224C380.263 643.33 380.558 643.382 380.98 643.382H382.404C382.868 643.382 383.195 643.33 383.384 643.224C383.595 643.119 383.69 642.918 383.669 642.623L383.131 637.402L388.194 636.833Z"
                            fill="#A3DBAF"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            id="Vector_120"
                            d="M376.788 680.233C393.999 680.233 407.951 666.281 407.951 649.07C407.951 631.859 393.999 617.907 376.788 617.907C359.577 617.907 345.625 631.859 345.625 649.07C345.625 666.281 359.577 680.233 376.788 680.233Z"
                            fill="#95EAB3"
                          />
                          <path
                            id="Vector_121"
                            d="M376.788 667.957C387.219 667.957 395.675 659.501 395.675 649.07C395.675 638.639 387.219 630.184 376.788 630.184C366.357 630.184 357.901 638.639 357.901 649.07C357.901 659.501 366.357 667.957 376.788 667.957Z"
                            fill="#81D89A"
                          />
                          <path
                            id="&#219;&#177;&#219;&#178;"
                            d="M363.547 637.561L368.609 636.991L370.634 657.715L365.572 658.285L363.547 637.561ZM388.194 636.833L388.732 642.148C388.753 642.296 388.763 642.507 388.763 642.781C388.763 643.899 388.468 644.943 387.877 645.914C387.308 646.863 386.538 647.633 385.568 648.223C384.597 648.793 383.543 649.078 382.404 649.078H381.802C381.317 649.078 380.832 649.014 380.347 648.888L381.201 657.589L376.139 658.158L374.114 637.402L379.176 636.833L379.714 642.433C379.799 642.834 379.925 643.098 380.094 643.224C380.263 643.33 380.558 643.382 380.98 643.382H382.404C382.868 643.382 383.195 643.33 383.384 643.224C383.595 643.119 383.69 642.918 383.669 642.623L383.131 637.402L388.194 636.833Z"
                            fill="#41BE7B"
                          />
                        </>
                      )}
                      {levelState.current[12]?.today ? (
                        <>
                          <path
                            id="Vector_120"
                            d="M376.788 680.233C393.999 680.233 407.951 666.281 407.951 649.07C407.951 631.859 393.999 617.907 376.788 617.907C359.577 617.907 345.625 631.859 345.625 649.07C345.625 666.281 359.577 680.233 376.788 680.233Z"
                            fill="white"
                          />
                          <path
                            id="Vector_121"
                            d="M376.788 667.957C387.219 667.957 395.675 659.501 395.675 649.07C395.675 638.639 387.219 630.184 376.788 630.184C366.357 630.184 357.901 638.639 357.901 649.07C357.901 659.501 366.357 667.957 376.788 667.957Z"
                            fill="#DCDFF9"
                          />
                          <path
                            id="&#219;&#177;&#219;&#178;"
                            d="M363.547 637.561L368.609 636.991L370.634 657.715L365.572 658.285L363.547 637.561ZM388.194 636.833L388.732 642.148C388.753 642.296 388.763 642.507 388.763 642.781C388.763 643.899 388.468 644.943 387.877 645.914C387.308 646.863 386.538 647.633 385.568 648.223C384.597 648.793 383.543 649.078 382.404 649.078H381.802C381.317 649.078 380.832 649.014 380.347 648.888L381.201 657.589L376.139 658.158L374.114 637.402L379.176 636.833L379.714 642.433C379.799 642.834 379.925 643.098 380.094 643.224C380.263 643.33 380.558 643.382 380.98 643.382H382.404C382.868 643.382 383.195 643.33 383.384 643.224C383.595 643.119 383.69 642.918 383.669 642.623L383.131 637.402L388.194 636.833Z"
                            fill="#31A064"
                          />
                        </>
                      ) : null}
                    </g>
                    <g id="level_10" onClick={() => handleLevelClick(10)}>
                      {levelState.current[10]?.lock ? (
                        <>
                          <path
                            id="Vector_122"
                            d="M404.803 577.616C422.014 577.616 435.966 563.664 435.966 546.453C435.966 529.242 422.014 515.29 404.803 515.29C387.592 515.29 373.64 529.242 373.64 546.453C373.64 563.664 387.592 577.616 404.803 577.616Z"
                            fill="#57B679"
                          />
                          <path
                            id="Vector_123"
                            d="M404.803 565.34C415.234 565.34 423.69 556.884 423.69 546.453C423.69 536.022 415.234 527.566 404.803 527.566C394.372 527.566 385.917 536.022 385.917 546.453C385.917 556.884 394.372 565.34 404.803 565.34Z"
                            fill="#4DA06B"
                          />
                          <path
                            id="&#219;&#177;&#219;&#176;"
                            d="M391.454 535.561L396.516 534.991L398.541 555.715L393.479 556.285L391.454 535.561ZM415.5 548.691C415.5 549.915 415.205 551.054 414.614 552.108C414.023 553.163 413.222 554.007 412.209 554.639C411.218 555.251 410.132 555.557 408.95 555.557C407.769 555.557 406.672 555.251 405.66 554.639C404.668 554.007 403.877 553.163 403.287 552.108C402.696 551.054 402.401 549.915 402.401 548.691C402.401 547.468 402.696 546.329 403.287 545.274C403.877 544.219 404.668 543.386 405.66 542.774C406.672 542.142 407.769 541.825 408.95 541.825C410.132 541.825 411.218 542.142 412.209 542.774C413.222 543.386 414.023 544.219 414.614 545.274C415.205 546.329 415.5 547.468 415.5 548.691ZM407.147 548.691C407.147 549.134 407.326 549.503 407.685 549.799C408.043 550.073 408.465 550.21 408.95 550.21C409.436 550.21 409.857 550.073 410.216 549.799C410.575 549.503 410.754 549.134 410.754 548.691C410.754 548.269 410.575 547.911 410.216 547.615C409.857 547.32 409.436 547.172 408.95 547.172C408.465 547.172 408.043 547.32 407.685 547.615C407.326 547.911 407.147 548.269 407.147 548.691Z"
                            fill="#A3DBAF"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            id="Vector_122"
                            d="M404.803 577.616C422.014 577.616 435.966 563.664 435.966 546.453C435.966 529.242 422.014 515.29 404.803 515.29C387.592 515.29 373.64 529.242 373.64 546.453C373.64 563.664 387.592 577.616 404.803 577.616Z"
                            fill="#95EAB3"
                          />
                          <path
                            id="Vector_123"
                            d="M404.803 565.34C415.234 565.34 423.69 556.884 423.69 546.453C423.69 536.022 415.234 527.566 404.803 527.566C394.372 527.566 385.917 536.022 385.917 546.453C385.917 556.884 394.372 565.34 404.803 565.34Z"
                            fill="#81D89A"
                          />
                          <path
                            id="&#219;&#177;&#219;&#176;"
                            d="M391.454 535.561L396.516 534.991L398.541 555.715L393.479 556.285L391.454 535.561ZM415.5 548.691C415.5 549.915 415.205 551.054 414.614 552.108C414.023 553.163 413.222 554.007 412.209 554.639C411.218 555.251 410.132 555.557 408.95 555.557C407.769 555.557 406.672 555.251 405.66 554.639C404.668 554.007 403.877 553.163 403.287 552.108C402.696 551.054 402.401 549.915 402.401 548.691C402.401 547.468 402.696 546.329 403.287 545.274C403.877 544.219 404.668 543.386 405.66 542.774C406.672 542.142 407.769 541.825 408.95 541.825C410.132 541.825 411.218 542.142 412.209 542.774C413.222 543.386 414.023 544.219 414.614 545.274C415.205 546.329 415.5 547.468 415.5 548.691ZM407.147 548.691C407.147 549.134 407.326 549.503 407.685 549.799C408.043 550.073 408.465 550.21 408.95 550.21C409.436 550.21 409.857 550.073 410.216 549.799C410.575 549.503 410.754 549.134 410.754 548.691C410.754 548.269 410.575 547.911 410.216 547.615C409.857 547.32 409.436 547.172 408.95 547.172C408.465 547.172 408.043 547.32 407.685 547.615C407.326 547.911 407.147 548.269 407.147 548.691Z"
                            fill="#41BE7B"
                          />
                        </>
                      )}
                      {levelState.current[10]?.today ? (
                        <>
                          <path
                            id="Vector_122"
                            d="M404.803 577.616C422.014 577.616 435.966 563.664 435.966 546.453C435.966 529.242 422.014 515.29 404.803 515.29C387.592 515.29 373.64 529.242 373.64 546.453C373.64 563.664 387.592 577.616 404.803 577.616Z"
                            fill="white"
                          />
                          <path
                            id="Vector_123"
                            d="M404.803 565.34C415.234 565.34 423.69 556.884 423.69 546.453C423.69 536.022 415.234 527.566 404.803 527.566C394.372 527.566 385.917 536.022 385.917 546.453C385.917 556.884 394.372 565.34 404.803 565.34Z"
                            fill="#DCDFF9"
                          />
                          <path
                            id="&#219;&#177;&#219;&#176;"
                            d="M391.454 535.561L396.516 534.991L398.541 555.715L393.479 556.285L391.454 535.561ZM415.5 548.691C415.5 549.915 415.205 551.054 414.614 552.108C414.023 553.163 413.222 554.007 412.209 554.639C411.218 555.251 410.132 555.557 408.95 555.557C407.769 555.557 406.672 555.251 405.66 554.639C404.668 554.007 403.877 553.163 403.287 552.108C402.696 551.054 402.401 549.915 402.401 548.691C402.401 547.468 402.696 546.329 403.287 545.274C403.877 544.219 404.668 543.386 405.66 542.774C406.672 542.142 407.769 541.825 408.95 541.825C410.132 541.825 411.218 542.142 412.209 542.774C413.222 543.386 414.023 544.219 414.614 545.274C415.205 546.329 415.5 547.468 415.5 548.691ZM407.147 548.691C407.147 549.134 407.326 549.503 407.685 549.799C408.043 550.073 408.465 550.21 408.95 550.21C409.436 550.21 409.857 550.073 410.216 549.799C410.575 549.503 410.754 549.134 410.754 548.691C410.754 548.269 410.575 547.911 410.216 547.615C409.857 547.32 409.436 547.172 408.95 547.172C408.465 547.172 408.043 547.32 407.685 547.615C407.326 547.911 407.147 548.269 407.147 548.691Z"
                            fill="#31A064"
                          />
                        </>
                      ) : null}
                    </g>
                    <g id="level_11" onClick={() => handleLevelClick(11)}>
                      {levelState.current[11]?.lock ? (
                        <>
                          <path
                            id="Vector_124"
                            d="M550.23 582.338C567.441 582.338 581.393 568.385 581.393 551.175C581.393 533.964 567.441 520.012 550.23 520.012C533.02 520.012 519.067 533.964 519.067 551.175C519.067 568.385 533.02 582.338 550.23 582.338Z"
                            fill="#57B679"
                          />
                          <path
                            id="Vector_125"
                            d="M550.23 570.061C560.661 570.061 569.117 561.605 569.117 551.174C569.117 540.744 560.661 532.288 550.23 532.288C539.8 532.288 531.344 540.744 531.344 551.174C531.344 561.605 539.8 570.061 550.23 570.061Z"
                            fill="#4DA06B"
                          />
                          <path
                            id="&#219;&#177;&#219;&#177;"
                            d="M540.698 539.561L545.761 538.991L547.786 559.715L542.723 560.285L540.698 539.561ZM551.266 539.561L556.328 538.991L558.353 559.715L553.291 560.285L551.266 539.561Z"
                            fill="#A3DBAF"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            id="Vector_124"
                            d="M550.23 582.338C567.441 582.338 581.393 568.385 581.393 551.175C581.393 533.964 567.441 520.012 550.23 520.012C533.02 520.012 519.067 533.964 519.067 551.175C519.067 568.385 533.02 582.338 550.23 582.338Z"
                            fill="#95EAB3"
                          />
                          <path
                            id="Vector_125"
                            d="M550.23 570.061C560.661 570.061 569.117 561.605 569.117 551.174C569.117 540.744 560.661 532.288 550.23 532.288C539.8 532.288 531.344 540.744 531.344 551.174C531.344 561.605 539.8 570.061 550.23 570.061Z"
                            fill="#81D89A"
                          />
                          <path
                            id="&#219;&#177;&#219;&#177;"
                            d="M540.698 539.561L545.761 538.991L547.786 559.715L542.723 560.285L540.698 539.561ZM551.266 539.561L556.328 538.991L558.353 559.715L553.291 560.285L551.266 539.561Z"
                            fill="#41BE7B"
                          />
                        </>
                      )}
                      {levelState.current[11]?.today ? (
                        <>
                          <path
                            id="Vector_124"
                            d="M550.23 582.338C567.441 582.338 581.393 568.385 581.393 551.175C581.393 533.964 567.441 520.012 550.23 520.012C533.02 520.012 519.067 533.964 519.067 551.175C519.067 568.385 533.02 582.338 550.23 582.338Z"
                            fill="white"
                          />
                          <path
                            id="Vector_125"
                            d="M550.23 570.061C560.661 570.061 569.117 561.605 569.117 551.174C569.117 540.744 560.661 532.288 550.23 532.288C539.8 532.288 531.344 540.744 531.344 551.174C531.344 561.605 539.8 570.061 550.23 570.061Z"
                            fill="#DCDFF9"
                          />
                          <path
                            id="&#219;&#177;&#219;&#177;"
                            d="M540.698 539.561L545.761 538.991L547.786 559.715L542.723 560.285L540.698 539.561ZM551.266 539.561L556.328 538.991L558.353 559.715L553.291 560.285L551.266 539.561Z"
                            fill="#31A064"
                          />
                        </>
                      ) : null}
                    </g>
                    <g id="level_14" onClick={() => handleLevelClick(14)}>
                      {levelState.current[14]?.lock ? (
                        <>
                          <path
                            id="Vector_126"
                            d="M623.259 752.317C640.469 752.317 654.422 738.365 654.422 721.154C654.422 703.943 640.469 689.991 623.259 689.991C606.048 689.991 592.096 703.943 592.096 721.154C592.096 738.365 606.048 752.317 623.259 752.317Z"
                            fill="#57B679"
                          />
                          <path
                            id="Vector_127"
                            d="M623.259 740.041C633.689 740.041 642.145 731.585 642.145 721.154C642.145 710.723 633.689 702.268 623.259 702.268C612.828 702.268 604.372 710.723 604.372 721.154C604.372 731.585 612.828 740.041 623.259 740.041Z"
                            fill="#4DA06B"
                          />
                          <path
                            id="&#219;&#177;&#219;&#180;"
                            d="M608.415 709.561L613.477 708.991L615.502 729.715L610.44 730.285L608.415 709.561ZM625.816 721.204C625.542 721.204 625.342 721.194 625.215 721.172L626.038 729.715L620.975 730.285L619.52 715.034C619.499 714.992 619.488 714.918 619.488 714.813L618.982 709.529L624.044 708.959L624.582 714.528C624.624 714.844 624.698 715.076 624.804 715.224C624.909 715.351 625.057 715.435 625.247 715.477C625.141 714.908 625.088 714.38 625.088 713.895C625.088 712.566 625.405 711.343 626.038 710.225C626.692 709.107 627.567 708.221 628.664 707.567C629.761 706.913 630.952 706.586 632.239 706.586C633.062 706.586 634.032 706.808 635.15 707.251C636.268 707.673 637.133 708.042 637.744 708.358L635.498 713.421C634.929 713.21 634.338 712.999 633.726 712.788C633.115 712.556 632.619 712.387 632.239 712.282C632.134 712.239 631.975 712.218 631.765 712.218C631.3 712.218 630.91 712.398 630.594 712.756C630.299 713.094 630.151 713.473 630.151 713.895C630.151 714.338 630.277 714.718 630.531 715.034C630.805 715.351 631.132 715.509 631.511 715.509H637.586V721.204H625.816Z"
                            fill="#A3DBAF"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            id="Vector_126"
                            d="M623.259 752.317C640.469 752.317 654.422 738.365 654.422 721.154C654.422 703.943 640.469 689.991 623.259 689.991C606.048 689.991 592.096 703.943 592.096 721.154C592.096 738.365 606.048 752.317 623.259 752.317Z"
                            fill="#95EAB3"
                          />
                          <path
                            id="Vector_127"
                            d="M623.259 740.041C633.689 740.041 642.145 731.585 642.145 721.154C642.145 710.723 633.689 702.268 623.259 702.268C612.828 702.268 604.372 710.723 604.372 721.154C604.372 731.585 612.828 740.041 623.259 740.041Z"
                            fill="#81D89A"
                          />
                          <path
                            id="&#219;&#177;&#219;&#180;"
                            d="M608.415 709.561L613.477 708.991L615.502 729.715L610.44 730.285L608.415 709.561ZM625.816 721.204C625.542 721.204 625.342 721.194 625.215 721.172L626.038 729.715L620.975 730.285L619.52 715.034C619.499 714.992 619.488 714.918 619.488 714.813L618.982 709.529L624.044 708.959L624.582 714.528C624.624 714.844 624.698 715.076 624.804 715.224C624.909 715.351 625.057 715.435 625.247 715.477C625.141 714.908 625.088 714.38 625.088 713.895C625.088 712.566 625.405 711.343 626.038 710.225C626.692 709.107 627.567 708.221 628.664 707.567C629.761 706.913 630.952 706.586 632.239 706.586C633.062 706.586 634.032 706.808 635.15 707.251C636.268 707.673 637.133 708.042 637.744 708.358L635.498 713.421C634.929 713.21 634.338 712.999 633.726 712.788C633.115 712.556 632.619 712.387 632.239 712.282C632.134 712.239 631.975 712.218 631.765 712.218C631.3 712.218 630.91 712.398 630.594 712.756C630.299 713.094 630.151 713.473 630.151 713.895C630.151 714.338 630.277 714.718 630.531 715.034C630.805 715.351 631.132 715.509 631.511 715.509H637.586V721.204H625.816Z"
                            fill="#41BE7B"
                          />
                        </>
                      )}
                      {levelState.current[14]?.today ? (
                        <>
                          <path
                            id="Vector_126"
                            d="M623.259 752.317C640.469 752.317 654.422 738.365 654.422 721.154C654.422 703.943 640.469 689.991 623.259 689.991C606.048 689.991 592.096 703.943 592.096 721.154C592.096 738.365 606.048 752.317 623.259 752.317Z"
                            fill="white"
                          />
                          <path
                            id="Vector_127"
                            d="M623.259 740.041C633.689 740.041 642.145 731.585 642.145 721.154C642.145 710.723 633.689 702.268 623.259 702.268C612.828 702.268 604.372 710.723 604.372 721.154C604.372 731.585 612.828 740.041 623.259 740.041Z"
                            fill="#DCDFF9"
                          />
                          <path
                            id="&#219;&#177;&#219;&#180;"
                            d="M608.415 709.561L613.477 708.991L615.502 729.715L610.44 730.285L608.415 709.561ZM625.816 721.204C625.542 721.204 625.342 721.194 625.215 721.172L626.038 729.715L620.975 730.285L619.52 715.034C619.499 714.992 619.488 714.918 619.488 714.813L618.982 709.529L624.044 708.959L624.582 714.528C624.624 714.844 624.698 715.076 624.804 715.224C624.909 715.351 625.057 715.435 625.247 715.477C625.141 714.908 625.088 714.38 625.088 713.895C625.088 712.566 625.405 711.343 626.038 710.225C626.692 709.107 627.567 708.221 628.664 707.567C629.761 706.913 630.952 706.586 632.239 706.586C633.062 706.586 634.032 706.808 635.15 707.251C636.268 707.673 637.133 708.042 637.744 708.358L635.498 713.421C634.929 713.21 634.338 712.999 633.726 712.788C633.115 712.556 632.619 712.387 632.239 712.282C632.134 712.239 631.975 712.218 631.765 712.218C631.3 712.218 630.91 712.398 630.594 712.756C630.299 713.094 630.151 713.473 630.151 713.895C630.151 714.338 630.277 714.718 630.531 715.034C630.805 715.351 631.132 715.509 631.511 715.509H637.586V721.204H625.816Z"
                            fill="#31A064"
                          />
                        </>
                      ) : null}
                    </g>
                  </g>
                  <path
                    id="Vector_128"
                    d="M708.248 283.614V265.987C707.304 260.006 711.081 254.34 717.062 253.081C718.951 252.766 720.839 252.766 722.413 253.396C717.377 255.284 714.229 260.321 714.229 265.672V282.67"
                    fill="#D84403"
                  />
                  <path
                    id="Vector_129"
                    d="M763.019 221.918H706.359V238.916H763.019V221.918Z"
                    fill="#FF8243"
                    stroke="#FF8243"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_130"
                    d="M763.649 223.177H705.73C705.73 223.177 695.028 206.494 697.546 190.755C701.953 167.461 730.283 156.129 734.689 154.241C738.782 155.815 742.874 157.703 746.966 159.907C757.039 165.573 769.315 175.646 771.833 190.755C774.351 206.808 763.649 223.177 763.649 223.177Z"
                    fill="#FFBC97"
                    stroke="#FFBC97"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_131"
                    d="M780.018 237.342V284.558H743.504V271.967C743.504 261.58 735.634 253.081 725.247 252.451C714.859 252.136 706.36 260.321 706.045 270.708V282.355C698.176 285.818 689.362 290.539 684.64 295.576L683.381 296.835L683.066 237.027L780.018 237.342Z"
                    fill="#FF8243"
                    stroke="#FF8243"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_132"
                    d="M809.921 237.342H779.073V284.873H809.921V237.342Z"
                    fill="#D84403"
                    stroke="#D84403"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_133"
                    d="M723.358 174.701C723.358 174.701 715.488 180.367 713.285 185.718"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_134"
                    d="M768.056 236.712H723.357"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_135"
                    d="M718.951 236.398H716.118"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_136"
                    opacity="0.4"
                    d="M719.58 228.213L732.171 227.269C728.079 228.528 723.672 228.843 719.58 228.213Z"
                    fill="#FF8243"
                    stroke="#FF8243"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_137"
                    opacity="0.4"
                    d="M763.02 223.177H741.615C747.596 219.085 752.632 211.845 754.206 199.254C755.78 184.459 750.428 168.72 746.022 159.907C756.094 165.573 768.371 175.646 770.889 190.755C773.722 206.809 763.02 223.177 763.02 223.177Z"
                    fill="#FF8243"
                    stroke="#FF8243"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_138"
                    d="M660.087 482.868L660.402 476.572C660.717 469.962 667.642 465.24 674.252 465.87C674.882 465.87 675.511 465.87 676.141 466.185C671.419 467.759 667.957 472.166 667.957 477.202L667.642 481.924"
                    fill="#D84403"
                  />
                  <path
                    id="Vector_139"
                    d="M655.68 358.846V421.486H642.46V443.206H630.813V358.846H655.68Z"
                    fill="#D84403"
                    stroke="#D84403"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_140"
                    d="M637.738 367.03V378.047"
                    stroke="#FFBC97"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_141"
                    d="M643.404 367.03V378.047"
                    stroke="#FFBC97"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_142"
                    d="M648.755 367.03V378.047"
                    stroke="#FFBC97"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_143"
                    d="M723.672 408.895C717.377 410.784 712.655 415.506 710.137 421.486H666.698C667.957 404.803 682.437 392.212 699.12 393.157C709.507 393.786 718.636 399.767 723.672 408.895Z"
                    fill="#5EA4F7"
                    stroke="#5EA4F7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_144"
                    d="M748.854 421.486H710.137C712.34 415.191 717.377 410.469 723.672 408.895C725.561 408.266 727.449 407.951 729.653 407.951C738.152 407.951 746.021 413.302 748.854 421.486Z"
                    fill="#2473FF"
                    stroke="#2473FF"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_145"
                    d="M756.094 421.486H710.452V504.902H756.094V421.486Z"
                    fill="#FF8243"
                    stroke="#FF8243"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_146"
                    d="M642.46 443.206V484.127C640.257 484.127 638.053 484.442 635.535 484.442H623.888V443.521L642.46 443.206Z"
                    fill="#FF8243"
                    stroke="#FF8243"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_147"
                    d="M710.452 421.486V504.902H686.843V478.461C686.843 470.592 680.548 464.296 672.678 464.296C664.809 464.296 658.513 470.592 658.513 478.461V481.924C654.107 482.868 648.441 483.183 642.145 483.812V420.857L710.452 421.486Z"
                    fill="#FFBC97"
                    stroke="#FFBC97"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_148"
                    d="M699.75 507.106C699.75 501.755 704.156 497.662 709.193 497.662C714.229 497.662 718.636 502.069 718.636 507.106H699.75Z"
                    fill="#66BF8C"
                  />
                  <path
                    id="Vector_149"
                    d="M689.362 401.656C685.899 401.97 682.751 403.859 680.863 406.692"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_150"
                    d="M710.452 440.058H698.805"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_151"
                    d="M712.97 463.352H718.006"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_152"
                    d="M649.07 453.279H657.884"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_153"
                    d="M760.816 485.386C753.891 485.386 747.596 488.849 743.818 494.2C741.93 493.57 740.041 492.941 738.152 492.941C730.912 492.941 724.932 498.922 724.932 506.162H781.906C781.906 494.83 772.463 485.386 760.816 485.386Z"
                    fill="#31A064"
                  />
                  <path
                    id="Vector_154"
                    d="M476.257 429.356C476.257 424.005 473.424 424.949 469.018 423.69C469.962 423.375 470.906 423.06 471.851 423.06C477.831 423.06 482.868 422.431 482.868 428.726"
                    fill="#D84403"
                  />
                  <path
                    id="Vector_155"
                    d="M321.387 428.412C321.387 418.339 328.942 415.506 338.385 415.506C339.959 415.506 341.218 415.821 342.792 416.135C335.867 418.339 331.46 419.283 331.46 427.467"
                    fill="#D84403"
                  />
                  <path
                    id="Vector_156"
                    d="M351.291 344.681L308.167 343.422L294.631 322.646C303.13 307.852 318.554 274.8 348.143 295.576C358.531 302.816 361.364 316.036 363.253 328.942L351.291 344.681Z"
                    fill="#D84403"
                    stroke="#D84403"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_157"
                    d="M494.83 428.726L484.127 427.782C480.035 421.172 471.536 418.968 464.611 422.746C460.204 425.264 457.686 429.985 457.686 435.022V460.204L358.216 458.001C358.216 458.001 366.401 415.821 341.533 413.302C322.647 411.099 319.499 426.838 319.499 426.838L251.822 424.949L249.618 416.765C249.618 416.765 234.194 356.328 258.117 342.792C282.04 329.257 282.04 333.349 289.28 327.998C291.169 326.424 292.743 324.22 293.687 321.702C296.835 321.387 300.297 321.702 303.445 322.646C308.796 324.85 302.501 333.664 314.462 337.756C323.906 340.904 321.702 323.591 333.979 322.332C346.884 320.758 343.422 332.719 353.81 332.719C357.272 332.719 360.735 331.145 362.938 328.312C364.827 343.737 364.512 355.698 373.011 360.105C374.9 361.049 376.473 362.308 378.047 363.882C381.51 366.4 385.602 367.974 390.009 367.974C395.675 368.289 407.007 364.827 423.375 367.66C439.744 370.493 448.557 391.583 452.335 395.36C464.296 405.748 480.35 401.026 487.59 410.469C491.682 414.876 493.571 421.486 494.83 428.726Z"
                    fill="#FC997C"
                    stroke="#FC997C"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_158"
                    d="M285.188 407.636C292.113 407.636 298.409 411.099 302.186 416.45C303.76 415.82 305.649 415.191 307.852 415.191C315.092 415.191 321.073 421.172 321.073 428.412H264.098C264.098 417.08 273.541 407.636 285.188 407.636Z"
                    fill="#31A064"
                  />
                  <path
                    id="Vector_159"
                    d="M435.651 439.744C443.206 439.744 450.446 443.521 454.853 449.816C456.741 448.872 458.945 448.557 460.833 448.557C469.018 448.557 475.628 455.168 475.628 463.352H412.043C412.043 450.446 422.431 439.744 435.651 439.744Z"
                    fill="#31A064"
                  />
                  <path
                    id="Vector_160"
                    d="M814.958 552.119H811.81C810.866 552.119 810.236 552.119 809.292 552.434C804.256 543.62 793.238 540.157 784.11 545.194C778.129 548.342 774.667 554.637 774.667 561.562V584.856C774.667 593.984 781.277 601.539 790.091 603.113L789.776 603.428H814.958C824.401 603.428 831.956 595.873 831.956 586.43V569.432C831.956 559.988 824.401 552.434 814.958 552.119Z"
                    fill="#5463FF"
                  />
                  <path
                    id="Vector_161"
                    d="M802.996 568.173V589.892V642.46"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_162"
                    d="M815.902 580.764V585.485C815.902 588.948 813.069 591.781 809.606 591.781H802.996"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_163"
                    d="M802.996 580.764H798.904C793.553 580.764 789.461 576.672 789.146 571.32V556.526"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_164"
                    d="M401.026 306.593H398.822C398.193 306.593 397.563 306.593 396.934 306.908C393.471 300.612 385.602 298.409 379.306 301.871C375.214 304.075 372.696 308.482 372.696 313.203V329.257C372.696 335.552 377.417 340.589 383.398 341.848H400.711C407.321 341.848 412.672 336.497 412.672 330.201V318.554C412.987 312.259 407.951 306.908 401.34 306.593H401.026Z"
                    fill="#5463FF"
                  />
                  <path
                    id="Vector_165"
                    d="M392.842 317.925V332.719V367.345"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_166"
                    d="M401.656 326.424V329.886C401.656 332.405 399.767 334.293 397.249 334.293H392.842"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_167"
                    d="M392.842 326.424H389.694C385.917 326.424 383.083 323.276 383.083 319.813V309.741"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_168"
                    d="M368.604 441.317H365.456C364.512 441.317 363.567 441.317 362.623 441.632C359.16 435.651 352.865 431.874 345.625 431.559C334.923 431.559 326.109 440.373 326.109 450.761V475.313C326.109 484.757 333.034 492.626 342.163 494.515L341.848 494.83H367.974C377.732 494.83 385.602 486.96 385.602 477.202V459.574C386.231 450.131 378.991 441.947 369.548 441.317H368.604Z"
                    fill="#5463FF"
                  />
                  <path
                    id="Vector_169"
                    d="M356.328 458.001V480.979V535.436"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_170"
                    d="M369.548 470.906V475.943C369.548 479.72 366.401 482.553 362.938 482.553H356.328"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_171"
                    d="M356.327 470.907H351.921C346.569 470.907 341.848 466.5 341.848 461.148V445.724"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_172"
                    d="M623.888 754.206H780.332C780.332 754.206 760.501 724.302 702.268 725.876C635.535 728.079 623.888 754.206 623.888 754.206Z"
                    fill="#FFBC97"
                    stroke="#FFBC97"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_173"
                    d="M795.756 645.293C795.441 639.942 799.534 635.535 804.885 635.22C810.236 634.905 814.643 638.997 814.958 644.349V645.293H795.756V645.293Z"
                    fill="#66BF8C"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_526_1436"
                    x="418.448"
                    y="278.372"
                    width="92.3257"
                    height="92.3258"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="7.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_526_1436"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_526_1436"
                      result="shape"
                    />
                  </filter>
                  <clipPath id="clip0_526_1436">
                    <rect width="1080" height="906.558" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </section>

        {/* mobile fixed bottom buttons ⬇️*/}
        <section className="w-full fixed bottom-0 2xl:hidden landscape:relative">
          <div className="container p-6">
            <div className="flex gap-2 flex-wrap">
              <div className="flex-[1_1_152px] relative">
                <div className="w-full h-full absolute left-0 top-0 opacity-75 rounded-[10px] bg-[#68ccd8] -z-1"></div>
                <Link
                  to="/invite"
                  className="text-center block w-full h-full text-white font-dana-medium leading-8 p-2"
                >
                  دعوت از دوستان
                </Link>
              </div>
              <div className="flex-[1_1_152px] relative">
                <div className="w-full h-full absolute left-0 top-0 opacity-75 rounded-[10px] bg-[#68ccd8] -z-1"></div>
                <Link
                  to={
                    Object.keys(
                      JSON.parse(localStorage.getItem("filimo::teaminfo")) || {}
                    ).length > 0
                      ? "/leader-board/teams/add-teammate"
                      : "/leader-board/teams/create"
                  }
                  className="text-center block w-full h-full text-white font-dana-medium leading-8 p-2"
                >
                  ایجاد تیم
                </Link>
              </div>

              <Button
                style={"flex-[1_1_152px] relative"}
                type="primary"
                onClick={() => {
                  handleLevelClick(Math.floor(daydiff.current));
                }}
              >
                <span className="my-1 block">چالش</span>
              </Button>
            </div>
          </div>
        </section>

        {/* desktop layout ⬇️*/}
        <aside className="hidden col-start-2 col-end-3 row-start-1 row-end-2 2xl:block h-fit sticky top-20 mb-12">
          <div className="w-full bg-white rounded-3xl ">
            <div className="container p-4 pt-[27px]">
              <div className="flex items-center my-2">
                <figure className="rounded-full overflow-hidden w-w-10/5 h-h-10/5 ml-[6px] mr-[10px]">
                  <img
                    src={require(`images/common/avatars/${FindAvatarAdd(
                      parseInt(user?.avatar_code)
                    )}`)}
                    alt="پروفایل"
                    className="w-full h-full object-cover"
                  />
                </figure>

                <div className="flex flex-col">
                  <span className="text-base text-right text-[#333333] font-dana-regular">
                    کاربر شماره - {user?.filimo_id}
                  </span>
                  <span
                    className="text-[12px] text-right light-text font-dana-regular"
                    dir="ltr"
                  >
                    {hidePhoneNumber(user?.mobile)}
                  </span>
                </div>
              </div>

              <div className="bg-[#f8f8f8] rounded-[10px] py-4 px-4 mt-4">
                <ul className="list-none flex flex-col gap-y-4">
                  <li className="flex font-dana-regular text-[#1d1d1d]">
                    <span className="ml-auto text-base">جدول امتیاز من</span>
                    <span className="flex">
                      <span className="mt-[2px] ml-1">{user?.total_score}</span>{" "}
                      <img
                        className="block w-5 h-5 object-contain"
                        src={StarIcon}
                      />
                    </span>
                  </li>

                  <li className="w-full h-[1px] bg-[#ececec]"></li>

                  <li className="flex">
                    <span className="inline-block ml-auto text-base font-dana-regular text-[#7c7c7c]">
                      امتیاز از بازی
                    </span>
                    <span className="inline-block font-dana-regular">
                      <span className="text-[10px] ml-1 text-black">
                        امتیاز
                      </span>
                      <span className="text-sm text-black">
                        {userScorsTable?.casual_score}
                      </span>
                    </span>
                  </li>

                  <li className="flex">
                    <span className="inline-block ml-auto text-base font-dana-regular text-[#7c7c7c]">
                      امتیاز از ماموریت
                    </span>
                    <span className="inline-block font-dana-regular">
                      <span className="text-[10px] ml-1 text-black">
                        امتیاز
                      </span>
                      <span className="text-sm text-black">
                        {userScorsTable?.mission_score}
                      </span>
                    </span>
                  </li>

                  <li className="flex">
                    <span className="inline-block ml-auto text-base font-dana-regular text-[#7c7c7c]">
                      امتیاز از تماشا
                    </span>
                    <span className="inline-block font-dana-regular">
                      <span className="text-[10px] ml-1 text-black">
                        امتیاز
                      </span>
                      <span className="text-sm text-black">
                        {userScorsTable?.watch_time_score}
                      </span>
                    </span>
                  </li>

                  <li className="flex">
                    <span className="inline-block ml-auto text-base font-dana-regular text-[#7c7c7c]">
                      امتیاز از دعوت
                    </span>
                    <span className="inline-block font-dana-regular">
                      <span className="text-[10px] ml-1 text-black">
                        امتیاز
                      </span>
                      <span className="text-sm text-black">
                        {userScorsTable?.referral_score}
                      </span>
                    </span>
                  </li>

                  {/* <li className="flex">
                    <span className="inline-block text-base font-dana-regular text-[#7c7c7c]">
                      سایر امتیازات
                    </span>

                    <span className="ml-auto cursor-pointer">
                      <img
                        className="w-4 h-4 object-contain block mt-1 mr-1"
                        src={InfoIcon}
                        alt="info icon"
                      />
                    </span>

                    <span className="inline-block font-dana-regular">
                      <span className="text-[10px] ml-1 text-black">
                        امتیاز
                      </span>
                      <span className="text-sm text-black">230+</span>
                    </span>
                  </li> */}
                </ul>
              </div>

              <div className="flex flex-wrap w-full gap-2 mt-2">
                <Link
                  to="/invite"
                  className="text-center block flex-[1_1_140px] h-full text-white font-dana-medium leading-8 p-2 rounded-[10px] bg-[#68ccd8] bg-opacity-75"
                >
                  دعوت از دوستان
                </Link>

                <Link
                  to={
                    Object.keys(
                      JSON.parse(localStorage.getItem("filimo::teaminfo")) || {}
                    ).length > 0
                      ? "/leader-board/teams/add-teammate"
                      : "/leader-board/teams/create"
                  }
                  className="text-center block h-full flex-[1_1_140px] text-white font-dana-medium leading-8 p-2 rounded-[10px] bg-[#68ccd8] bg-opacity-75"
                >
                  ایجاد تیم
                </Link>

                <Button
                  type="primary"
                  onClick={() => {
                    handleLevelClick(Math.floor(daydiff.current));
                  }}
                >
                  <span className="my-1 block">چالش</span>
                </Button>
              </div>
            </div>
          </div>
        </aside>

        <aside className="hidden col-start-4 col-end-5 row-start-1 row-end-2 2xl:block h-fit sticky top-20 mb-12">
          <div className="w-full bg-white rounded-3xl max-h-[664px] min-h-[664px] overflow-y-auto">
            <div className="container py-6 px-4">
              <CustomTab />
            </div>
          </div>
        </aside>
        {/* desktop layout ⬆️*/}

        {/* profile drawer */}
        <Menu isOpen={isProfileMenuOpen} setIsOpen={setIsProfileMenuOpen}>
          <div className="container px-4 py-[27px]">
            <div className="flex items-center my-2">
              <figure className="rounded-full overflow-hidden w-w-10/5 h-h-10/5 ml-[6px]">
                <img
                  src={require(`images/common/avatars/${FindAvatarAdd(
                    parseInt(user?.avatar_code)
                  )}`)}
                  alt="پروفایل"
                  className="w-full h-full object-cover"
                />
              </figure>

              <div className="flex flex-col">
                <span className="text-base text-right text-[#333333] font-dana-regular">
                  کاربر شماره - {user?.filimo_id}
                </span>
                <span
                  className="text-[12px] text-right light-text font-dana-regular"
                  dir="ltr"
                >
                  {hidePhoneNumber(user?.mobile)}
                </span>
              </div>
            </div>

            <div className="bg-[#f8f8f8] rounded-[10px] py-4 px-[6px] mt-4">
              <ul className="list-none flex flex-col gap-y-4">
                <li className="flex font-dana-regular text-[#1d1d1d] mx-[10px]">
                  <span className="ml-auto text-base">جدول امتیاز من</span>
                  <span className="flex">
                    <span className="mt-[2px] ml-1">{user?.total_score}</span>{" "}
                    <img
                      className="block w-5 h-5 object-contain"
                      src={StarIcon}
                    />
                  </span>
                </li>

                <li className="w-full h-[1px] bg-[#ececec]"></li>

                <li className="flex mx-[10px]">
                  <span className="inline-block ml-auto text-base font-dana-regular text-[#7c7c7c]">
                    امتیاز از بازی
                  </span>
                  <span className="inline-block font-dana-regular">
                    <span className="text-[10px] ml-1 text-black">امتیاز</span>
                    <span className="text-sm text-black">
                      {userScorsTable?.casual_score}
                    </span>
                  </span>
                </li>

                <li className="flex mx-[10px]">
                  <span className="inline-block ml-auto text-base font-dana-regular text-[#7c7c7c]">
                    امتیاز از ماموریت
                  </span>
                  <span className="inline-block font-dana-regular">
                    <span className="text-[10px] ml-1 text-black">امتیاز</span>
                    <span className="text-sm text-black">
                      {userScorsTable?.mission_score}
                    </span>
                  </span>
                </li>

                <li className="flex mx-[10px]">
                  <span className="inline-block ml-auto text-base font-dana-regular text-[#7c7c7c]">
                    امتیاز از تماشا
                  </span>
                  <span className="inline-block font-dana-regular">
                    <span className="text-[10px] ml-1 text-black">امتیاز</span>
                    <span className="text-sm text-black">
                      {userScorsTable?.watch_time_score}
                    </span>
                  </span>
                </li>

                <li className="flex mx-[10px]">
                  <span className="inline-block ml-auto text-base font-dana-regular text-[#7c7c7c]">
                    امتیاز از دعوت
                  </span>
                  <span className="inline-block font-dana-regular">
                    <span className="text-[10px] ml-1 text-black">امتیاز</span>
                    <span className="text-sm text-black">
                      {userScorsTable?.referral_score}
                    </span>
                  </span>
                </li>

                {/* <li className="flex mx-[10px]">
                  <span className="inline-block text-base font-dana-regular text-[#7c7c7c]">
                    سایر امتیازات
                  </span>

                  <span className="ml-auto cursor-pointer">
                    <img
                      className="w-4 h-4 object-contain block mt-1 mr-1"
                      src={InfoIcon}
                      alt="info icon"
                    />
                  </span>

                  <span className="inline-block font-dana-regular">
                    <span className="text-[10px] ml-1 text-black">امتیاز</span>
                    <span className="text-sm text-black">230+</span>
                  </span>
                </li> */}
              </ul>
            </div>

            <nav className="flex flex-col gap-y-2 mt-2">
              <li className="flex rounded-[10px] bg-[#f8f8f8] p-2">
                <Link
                  className="text-base font-dana-regular text-[#1d1d1d] leading-[1.81] w-full"
                  to="/leader-board/teams"
                >
                  جدول امتیازات
                </Link>
              </li>

              <li className="flex rounded-[10px] bg-[#f8f8f8] p-2">
                <Link
                  className="text-base font-dana-regular text-[#1d1d1d] leading-[1.81] w-full"
                  to="/leader-board/invitees"
                >
                  جدول دعوت از دوستان
                </Link>
              </li>

              <li className="flex rounded-[10px] bg-[#f8f8f8] p-2">
                <Link
                  className="text-base font-dana-regular text-[#1d1d1d] leading-[1.81] w-full"
                  to="/leader-board/teams/create"
                >
                  ایجاد تیم
                </Link>
              </li>

              <li className="flex rounded-[10px] bg-[#f8f8f8] p-2">
                <Link
                  className="text-base font-dana-regular text-[#1d1d1d] leading-[1.81] w-full"
                  to="/invite"
                >
                  دعوت از دوستان
                </Link>
              </li>

              <li className="flex rounded-[10px] bg-[#f8f8f8] p-2">
                <button
                  className="text-base font-dana-regular text-[#1d1d1d] leading-[1.81] w-full text-right"
                  onClick={handleOpenRegisterModal}
                >
                  شرایط و مقررات
                </button>
              </li>
            </nav>
          </div>
        </Menu>

        {/* leader board  drawer*/}
        <Menu
          left
          isOpen={isLeaderBoardMenuOpen}
          setIsOpen={setIsLeaderBoardMenuOpen}
        >
          <div className="container py-6 px-4">
            <CustomTab />
          </div>
        </Menu>

        <SimpleBottomSheet
          isOpen={isSimpleBottomSheetOpen}
          setIsOpen={setIsSimpleBottomSheetOpen}
          style="bg-white"
        >
          <div className="container p-4">
            <h3 className="text-base default-title-color mx-2 light-text font-dana-regular">
              چالش {challengeLevel.current}
            </h3>

            <div className="flex flex-col gap-y-2 my-4">
              <Link
                to={
                  !levelState.current[challengeLevel.current]
                    ?.casual_levels_gaming_agian
                    ? `/games/${challengeLevel.current}`
                    : `/`
                }
                // to={!levelState.current[challengeLevel.current]?.casual_levels_gaming_agian ?
                //   `/games/${challengeLevel.current}` :
                //   (!levelState.current[challengeLevel.current]?.casual_levels_gaming ?
                //     `/` :
                //     '/')}

                className={
                  levelState.current[challengeLevel.current]
                    ?.casual_levels_gaming
                    ? "flex bg-[#f8f8f8] rounded-[10px] p-2 items-center disabled_link"
                    : "flex bg-[#f8f8f8] rounded-[10px] p-2 items-center"
                }
              >
                {console.log(
                  "=>>>>>>>>>>>.",
                  levelState.current[challengeLevel.current]
                    ?.casual_levels_gaming_agian
                )}
                <h4 className="leading-[1.81] text-base text-right ml-[39px] text-black font-dana-regular w-[81px]">
                  بازی
                </h4>

                <span className="text-sm text-black ml-auto mt-1 font-dana-regular flex items-center">
                  <span className="score-title ml-1">امتیاز</span>
                  <span>
                    {casual_levels.current[challengeLevel.current - 1]?.value}
                  </span>
                </span>

                {/* use this if not done */}
                <span
                  className={
                    !levelState.current[challengeLevel.current]
                      ?.casual_levels_gaming
                      ? "bg-[#ffc23a] rounded-2xl p-2 text-sm font-dana-regular text-black game_level"
                      : "bg-[#ffc23a] rounded-2xl p-2 text-sm font-dana-regular text-black game_level_2"
                  }
                >
                  {!levelState.current[challengeLevel.current]
                    ?.casual_levels_gaming_agian ? (
                    `  شروع بازی `
                  ) : !levelState.current[challengeLevel.current]
                      ?.casual_levels_gaming ? (
                    <button
                      onClick={() => {
                        setacceptOpenModal(true);
                        playGameAgianId.current =
                          casual_levels.current[challengeLevel.current - 1]?.id;
                      }}
                    >
                      بازی مجدد
                    </button>
                  ) : (
                    <img src={TickIcon} />
                  )}
                </span>

                {/* ue this icon if it is done */}
                {/* <figure className="w-6 h-6">
                  <img
                    className="w-full h-full object-contain"
                    src={TickIcon}
                    alt="button icon"
                  />
                </figure> */}
              </Link>

              <Link
                to={`/challenge/${challengeLevel.current}-${challengeLevelID.current}`}
                className={
                  levelState.current[challengeLevel.current]
                    ?.mission_levels_gaming
                    ? "flex bg-[#f8f8f8] rounded-[10px] p-2 items-center disabled_link"
                    : "flex bg-[#f8f8f8] rounded-[10px] p-2 items-center"
                }
              >
                <h4 className="leading-[1.81] text-base text-right ml-auto text-black font-dana-regular w-[81px]">
                  ماموریت
                </h4>

                <span className="text-sm text-black ml-auto mt-1 font-dana-regular flex items-center">
                  <span className="score-title ml-1">امتیاز</span>
                  <span>
                    {mission_levels.current[challengeLevel.current - 1]?.value}
                  </span>
                </span>

                {/* use this if not done */}
                <span className="bg-[#ffc23a] rounded-2xl p-2 text-sm font-dana-regular text-black mission_level">
                  {!levelState.current[challengeLevel.current]
                    ?.mission_levels_gaming ? (
                    `انجام ماموریت`
                  ) : (
                    <img src={TickIcon} />
                  )}
                </span>

                {/* ue this icon if it is done */}
                {/* <figure className="w-6 h-6">
                  <img
                    className="w-full h-full object-contain"
                    src={TickIcon}
                    alt="button icon"
                  />
                </figure> */}
              </Link>
            </div>

            <div className="rounded-[10px] flex flex-col bg-[#f8f8f8]">
              <div className="p-4">
                <h4 className="text-base font-dana-regular light-text mb-3">
                  تماشا{" "}
                  <span className="text-xs text-[#7c7c7c]">
                    (با دیدن هر ساعت فیلم ۵ امتیاز بگیر)
                  </span>
                </h4>
                <div className="flex gap-x-2">
                  <a href={poster.current[0]?.link} rel="noreferrer">
                    <div className="flex items-center">
                      <img
                        className="max-w-[48px] h-auto object-cover"
                        src={String(poster.current[0]?.poster)}
                        alt="video"
                      />
                      <div className="max-w-[88px] flex flex-col mr-2">
                        <span className="text-xs text-[#7c7c7c] block font-dana-regular">
                          پیشنهاد فیلیمو
                        </span>
                        <h6 className="text-base text-right default-title-color text-ellipsis overflow-hidden font-dana-regular">
                          {poster.current[0]?.name}
                        </h6>
                      </div>
                    </div>
                  </a>
                  <a href={poster.current[1]?.link} rel="noreferrer">
                    <div className="flex items-center">
                      <img
                        className="max-w-[48px] h-auto object-cover"
                        src={String(poster.current[1]?.poster)}
                        alt="video"
                      />
                      <div className="max-w-[88px] flex flex-col mr-2">
                        <span className="text-xs text-[#7c7c7c] block font-dana-regular">
                          پیشنهاد فیلیمو
                        </span>
                        <h6 className="text-base text-right default-title-color font-dana-regular">
                          {poster.current[1]?.name}
                        </h6>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SimpleBottomSheet>

        <Modal
          alignEnd
          isOpen={isRegisterModalOpen}
          setIsOpen={setIsRegisterModalOpen}
        >
          <h6 className="text-base text-[#333] text-right font-dana-regular leading-8 mx-4 mt-4">
            قوانین و مقررات
          </h6>
          <p className="text-xs text-[#333] text-right font-dana-regular max-h-[357px] overflow-hidden overflow-y-auto mt-2 px-4 leading-6">
            کاربر گرامی؛ ضمن سپاس از انتخاب سرویس فیلیمو لازم است پیش از خرید
            مورد نظر و تماشای فیلم، سریال و تئاتر، توافقنامه و قوانین ذیل را
            مطالعه فرمایید، فیلیمو سرویس خود را تحت شرایط و مقررات این توافقنامه
            در اختیار شما می گذارد و شما به عنوان کاربران این سرویس ملزم به
            رعایت مفاد مذکور در این توافقنامه که ممکن است در آینده تغییر یابد،
            هستید. <br /> این سرویس با نام تجاری "فیلیمو" ثبت گردیده است و از حق
            کپی رایت برخوردار است. اگر در سایت های دیگر با موارد نقض کپی رایت
            فیلیمو مواجه شدید، لطفا آن را به سرویس پشتیبانی « فیلیمو» به آدرس
            ایمیل support [at] filimo [dot] com زیر اطلاع دهید. تمامی محتواهای
            ارایه شده در سرویس فیلیمو در چارچوب قوانین و مقررات جمهوری اسلامی
            ایران می باشد. برای دسترسی به نمایش محتوای مورد نظر، کاربر باید
            اقدام به خرید اشتراک نماید. خرید اشتراک در واقع به منزله خرید دسترسی
            به محتواهای فیلیمو می باشد. فیلیمو در صورت مشاهده هرگونه اقدام غیر
            متعارف برای دسترسی به اشتراک، خرید و ورود، این حق را دارد که این
            اقدامات غیرمجاز را متوقف و در ادامه اشتراک کاربر را لغو کند. تعداد
            محتواهایی که کاربران با خرید اشتراک به آنها دسترسی پیدا می کنند ممکن
            است پیش از پایان مدت اعتبار اشتراک، تغییر یافته و فیلم ها یا سریال
            هایی به مجموع محتواها اضافه یا از آن حذف گردد. همچنین ممکن است با
            تغییر مکان جغرافیایی خود به سایر کشورها، دسترسی به تعدادی از محتواها
            که اجازه نشر در خارج از کشور ندارند را از دست بدهید. اعمال غیر
            قانونی و مغایر با قوانین موضوعه جمهوری اسلامی ایران به هر نحو ممکن
            ممنوع است. استفاده از سرویس فیلیمو هیچگونه حقی را برای کاربران در
            ارتباط با مالکیت فیلم ها، سریال ها و به طور کلی هر محتوای ارائه شده
            و انتشار یا پخش عمومی آنها چه از طریق سرویس فیلیمو و چه از طرق دیگر
            ایجاد نمی کند. مسلم است با پرداخت مبلغ، شما می توانید خدمات خریداری
            شده را در بازه زمانی مشخص شده مشاهده کنید، اما مالک این محتوا
            نخواهید شد و اجازه دانلود (به استثنای دانلود محافظت شده اپلیکیشن
            فیلیمو https://www.filimo.com/app و بازنشر آن را ندارید. فیلیمو این
            حق را دارد که در صورت نیاز تغییراتی در قوانین ایجاد کرده یا مانع
            دسترسی به بعضی از قسمت های سرویس یا همه سرویس بطور موقت یا دائمی
            شود. فیلیمو این حق را دارد در صورت صلاحدید به منظور کاهش هزینه‌ها و
            جلوگیری از افزایش قیمت اشتراک‌ها در هر بخش از محتوا، نسبت به پخش
            تبلیغات اقدام نماید. فیلیمو با داشتن تنوع محتوایی این اختیار را به
            کاربر داده است تا خود طبق علایق و سلایق شخصی و اجتماعی خود، فیلم
            مورد نظر خود را تماشا نماید، ما هیچ تضمینی بر اعتبار آنها و تاثیر
            مثبت یا منفی آنها بر مخاطب نخواهیم داشت. ممکن است در آینده تغییراتی
            در این توافقنامه ایجاد شود که شامل نه محدود به حذف یا اضافه کردن
            مطالب و قوانینی به آن است که بلافاصله از نظر مسئولان سرویس لازم
            الاجراست. لذا کاربر موظف به مرور قوانین طی استفاده از سرویس فیلیمو
            است تا از تغییرات احتمالی آن آگاه گردد. این تغیرات در شبکه های
            اجتماعی فیلیمو به اطلاع کاربران خواهد رسید. در قسمت مربوط به نظرات
            کاربران، انتشار مطالب خلاف یا نقض کننده قوانین جمهوری اسلامی ایران،
            مضر، تهدید کننده، توهین آمیز، غیر اخلاقی، افترا آمیز و مبتذل و
            همچنین مطالبی که به نژاد، گروه یا دسته خاصی از مردم توهین کند، ممنوع
            است در قسمت مربوط به نظرات کاربران، قرار دادن لینک هایی به سایت های
            غیر قانونی، غیر اخلاقی یا مبتذل و همینطور سایت هایی که به هر نحو
            مناسبات فرهنگی، اخلاقی، عرفی یا قانونی جامعه را زیر پا می گذارند یا
            با قوانین جمهوری اسلامی ایران مغایرند، ممنوع است. هر کاربر در فیلیمو
            حق ایجاد یک نام کاربری را دارد و ایجاد چند نام کاربری برای یک نفر
            جهت استفاده بیشتر از تسهیلاتی که برخی اوقات توسط فیلیمو در اختیار
            کاربران قرار می گیرد، ممنوع است. همچنین کاربران فیلیمو حق واگذاری
            نام کاربری خود به فرد دیگر و یا استفاده از نام کاربری فرد دیگر را
            ندارند محتواهای موجود توسط یک تهیه‌کننده یا شرکت تولیدی فیلم تهیه
            شده است. فیلیمو تنها یک بستر نمایش این محتواها بوده و نقشی در تولید
            آنها نداشته، از اینرو مسئولیتی در قبال محتوای ارائه شده ندارد.
            درصورت بروز شرایط فورس ماژور (مانند سیل، زلزله، بلایای طبیعی و...) و
            پیش آمدهای خارج از کنترل فیلیموکه منجر به قطع سرویس و ارائه خدمات
            شود، تا زمان برطرف شدن مشکل، این قرارداد معلق خواهد شد. این
            توافقنامه مشروعیت و اعتبار خود را از قوانین حاکم بر جمهوری اسلامی
            ایران کسب می کند. ترافیک مصرفی کاربران فیلیمو ، بر اساس سیاست‌ها و
            تنظیمات اپراتورهای مختلف اینترنتی به صورت تمام بها یا نیم بها محاسبه
            خواهد شد و فیلیمو تضمینی برای محاسبه ترافیک نیم بها برای کاربران خود
            نخواهد داشت.
          </p>

          <div className="h-[1px] bg-[#f1f1f1] mx-4 mt-2"></div>

          <span className="text-xs text-[#333] font-dana-regular mt-[18px] block leading-6 text-right mx-4">
            قوانین شرکت در مسابقه را خواندم
          </span>

          <div className="flex px-4 pb-4">
            <Button
              type="primary"
              style="mt-2"
              onClick={handleCloseRegisterModal}
            >
              تایید
            </Button>
          </div>
        </Modal>

        <Modal
          alignCenter
          isOpen={isChallengeModalOpen}
          setIsOpen={setIsChallengeModalOpen}
        >
          <div className="container p-4">
            <h3 className="text-base text-[#1d1d1d] mx-2 text-right light-text font-dana-regular">
              چالش {challengeLevel.current}
            </h3>

            <div className="flex flex-col gap-y-2 my-4">
              <Link
                to={
                  !levelState.current[challengeLevel.current]
                    ?.casual_levels_gaming_agian
                    ? `/games/${challengeLevel.current}`
                    : `/`
                }
                // to={levelState.current[challengeLevel.current]?.casual_levels_gaming_agian ?
                //   `/games/${challengeLevel.current}` :
                //   (!levelState.current[challengeLevel.current]?.casual_levels_gaming ?
                //     `/` :
                //     '/')}

                className={
                  levelState.current[challengeLevel.current]
                    ?.casual_levels_gaming
                    ? "flex bg-[#f8f8f8] rounded-[10px] p-2 items-center disabled_link"
                    : "flex bg-[#f8f8f8] rounded-[10px] p-2 items-center"
                }
              >
                {console.log(
                  "=>>>>>>>>>>>.",
                  levelState.current[challengeLevel.current]
                    ?.casual_levels_gaming_agian
                )}

                <h4 className="leading-[1.81] text-base text-right ml-8 text-black font-dana-regular w-[81px]">
                  بازی
                </h4>

                <span className="text-sm text-black ml-auto mt-1 font-dana-regular flex items-center">
                  <span className="score-title ml-1">امتیاز</span>
                  <span>
                    {casual_levels.current[challengeLevel.current - 1]?.value}
                  </span>
                </span>

                {/* use this if not done */}
                <span
                  className={
                    !levelState.current[challengeLevel.current]
                      ?.casual_levels_gaming
                      ? "bg-[#ffc23a] rounded-2xl p-2 text-sm font-dana-regular text-black game_level"
                      : "bg-[#ffc23a] rounded-2xl p-2 text-sm font-dana-regular text-black game_level_2"
                  }
                >
                  {/* { !levelState.current[challengeLevel.current]?.casual_levels_gaming ? `  شروع بازی `:(<img src={TickIcon} />)}  */}
                  {!levelState.current[challengeLevel.current]
                    ?.casual_levels_gaming_agian ? (
                    `  شروع بازی `
                  ) : !levelState.current[challengeLevel.current]
                      ?.casual_levels_gaming ? (
                    <button
                      onClick={() => {
                        setacceptOpenModal(true);
                        playGameAgianId.current =
                          casual_levels.current[challengeLevel.current - 1]?.id;
                      }}
                    >
                      بازی مجدد
                    </button>
                  ) : (
                    <img src={TickIcon} />
                  )}
                </span>

                {/* ue this icon if it is done */}
                {/* <figure className="w-6 h-6">
                  <img
                    className="w-full h-full object-contain"
                    src={TickIcon}
                    alt="button icon"
                  />
                </figure> */}
              </Link>

              <Link
                to={`/challenge/${challengeLevel.current}-${challengeLevelID.current}`}
                className={
                  levelState.current[challengeLevel.current]
                    ?.mission_levels_gaming
                    ? "flex bg-[#f8f8f8] rounded-[10px] p-2 items-center disabled_link"
                    : "flex bg-[#f8f8f8] rounded-[10px] p-2 items-center"
                }
              >
                {/* {console.log('ssss',levelState.current[challengeLevel.current - 1]?.mission_levels_gaming  ,challengeLevel.current)} */}
                <h4 className="leading-[1.81] text-base text-right ml-8 text-black font-dana-regular w-[81px]">
                  ماموریت
                </h4>

                <span className="text-sm text-black ml-auto mt-1 font-dana-regular flex items-center">
                  <span className="score-title ml-1">امتیاز</span>
                  <span>
                    {mission_levels.current[challengeLevel.current - 1]?.value}
                  </span>
                </span>

                {/* use this if not done */}
                <span className="bg-[#ffc23a] rounded-2xl p-2 text-sm font-dana-regular text-black mission_level">
                  {!levelState.current[challengeLevel.current]
                    ?.mission_levels_gaming ? (
                    `انجام ماموریت`
                  ) : (
                    <img src={TickIcon} />
                  )}
                </span>

                {/* ue this icon if it is done */}
                {/* <figure className="w-6 h-6">
                  <img
                    className="w-full h-full object-contain"
                    src={TickIcon}
                    alt="button icon"
                  />
                </figure> */}
              </Link>
            </div>

            <div className="mt-4">
              <h4 className="text-base font-dana-regular text-[#1d1d1d] mb-4 text-right">
                تماشا{" "}
                <span className="text-xs text-[#7c7c7c]">
                  (با دیدن هر ساعت فیلم ۵ امتیاز بگیر)
                </span>
              </h4>

              <div className="flex flex-col gap-y-2">
                {/* {[...Array(2)].map((e, i) => ( */}
                <a
                  // key={i}
                  className="flex items-center bg-[#f9f9f9] rounded-[10px] overflow-hidden"
                  href={poster.current[0]?.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <figure className="w-12 h-16 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={String(poster.current[0]?.poster)}
                      alt="پیشنهاد فیلیمو"
                    />
                  </figure>

                  <div className="mr-2">
                    <span className="block font-dana-regular text-xs text-[#7c7c7c]">
                      پیشنهاد فیلیمو
                    </span>
                    <h6 className="font-dana-regular text-base text-[#1d1d1d] text-right">
                      {poster.current[0]?.name}
                    </h6>
                  </div>
                </a>
                <a
                  // key={i}
                  className="flex items-center bg-[#f9f9f9] rounded-[10px] overflow-hidden"
                  href={poster.current[1]?.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <figure className="w-12 h-16 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={String(poster.current[1]?.poster)}
                      alt="پیشنهاد فیلیمو"
                    />
                  </figure>

                  <div className="mr-2">
                    <span className="block font-dana-regular text-xs text-[#7c7c7c]">
                      پیشنهاد فیلیمو
                    </span>
                    <h6 className="font-dana-regular text-base text-[#1d1d1d] text-right">
                      {poster.current[1]?.name}
                    </h6>
                  </div>
                </a>
                {/* ))} */}
              </div>
            </div>
          </div>
        </Modal>

        {/* het phone number bottom sheet */}
        <SimpleBottomSheet
          isOpen={openPhoneNumberBottomSheet}
          setIsOpen={setOpenPhoneNumberBottomSheet}
          backdropClose={false}
          style="bg-white"
        >
          <div className="container p-6 pt-4">
            <h2 className="text-right text-base font-dana-regular text-[#1d1d1d]">
              {phoneNumberStep === 1
                ? "شماره موبایل خود را ثبت کنید"
                : "کد ارسالی را وارد کنید"}
            </h2>

            {phoneNumberStep === 1 ? (
              <Fragment>
                <TextField
                  type="tel"
                  name="phone"
                  placeholder=" "
                  required
                  maxLength={11}
                  label="موبایل"
                  style={{ container: "mt-6" }}
                />

                <p className="leading-[2] text-[#4c4c4c] mt-2 text-xs font-dana-regular">
                  در ثبت شماره موبایل دقت کنید تا پیامک ارسال شده حاوی کد ثبت به
                  دست شما برسد.
                </p>

                <Button
                  type="primary"
                  style="mt-20"
                  onClick={handleNextPhoneNumberStep}
                >
                  تایید شماره موبایل
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <p className="text-[#4d4d4d] text-sm font-dana-regular mt-[9px]">
                  کد ۵ رقمی به شماره شما پیامک شد
                </p>

                <button
                  className="p-2 bg-opacity-10 bg-[#d04f56] rounded-2xl flex items-center w-fit mx-auto mt-[14px]"
                  onClick={handlePrevPhoneNumberStep}
                >
                  <span className="text-sm text-[#d04f56] font-dana-medium ml-2 mt-1">
                    ۰۹۳۵۷۸۹۴۵۶۰
                  </span>
                  <img
                    src={EditIcon}
                    className="w-[18px] h-[18px] object-contain"
                    alt="edit icon"
                  />
                </button>

                <div className="mt-[17px] flex justify-center">
                  <OtpInput
                    value={otpState}
                    direction="rtl"
                    onChange={handleOtpChange}
                    numInputs={5}
                    isInputNum={true}
                    shouldAutoFocus={true}
                    containerStyle="flex-row-reverse"
                    className="font-dana-regular"
                    inputStyle={{
                      border: "1px solid #bbb",
                      borderRadius: "10px",
                      width: "40px",
                      height: "56px",
                      fontSize: "30px",
                      color: "#1b1b1b",
                      fontWeight: "500",
                      caretColor: "#1b1b1b",
                      marginLeft: "4px",
                      marginRight: "4px",
                    }}
                    focusStyle={{
                      border: "1px solid #3c3c3c",
                      outline: "none",
                    }}
                  />
                </div>

                <div className="px-6 mt-14">
                  <span className="text-sm text-[#9b9b9b] font-dana-regular ml-5">
                    پیامکی دریافت نکردید؟
                  </span>
                  <button className="text-sm text-[#db717b] font-dana-medium">
                    ارسال مجدد پیامک‌
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        </SimpleBottomSheet>

        {/* get phone number modal */}
        <Modal
          alignCenter
          isOpen={openPhoneNumberModal}
          setIsOpen={setOpenPhoneNumberModal}
          backdropClose={false}
        >
          <div className="container p-6 pt-4">
            <h2 className="text-right text-base font-dana-regular text-[#1d1d1d]">
              {phoneNumberStep === 1
                ? "شماره موبایل خود را ثبت کنید"
                : "کد ارسالی را وارد کنید"}
            </h2>

            {phoneNumberStep === 1 ? (
              <Fragment>
                <TextField
                  type="tel"
                  name="phone"
                  placeholder=" "
                  required
                  maxLength={11}
                  label="موبایل"
                  style={{ container: "mt-6" }}
                />

                <p className="leading-[2] text-[#4c4c4c] mt-2 text-xs font-dana-regular">
                  در ثبت شماره موبایل دقت کنید تا پیامک ارسال شده حاوی کد ثبت به
                  دست شما برسد.
                </p>

                <Button
                  type="primary"
                  style="mt-20"
                  onClick={handleNextPhoneNumberStep}
                >
                  تایید شماره موبایل
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <p className="text-[#4d4d4d] text-sm font-dana-regular mt-[9px]">
                  کد ۵ رقمی به شماره شما پیامک شد
                </p>

                <button
                  className="p-2 bg-opacity-10 bg-[#d04f56] rounded-2xl flex items-center w-fit mx-auto mt-[14px]"
                  onClick={handlePrevPhoneNumberStep}
                >
                  <span className="text-sm text-[#d04f56] font-dana-medium ml-2 mt-1">
                    ۰۹۳۵۷۸۹۴۵۶۰
                  </span>
                  <img
                    src={EditIcon}
                    className="w-[18px] h-[18px] object-contain"
                    alt="edit icon"
                  />
                </button>

                <div className="mt-[17px] flex justify-center">
                  <OtpInput
                    value={otpState}
                    direction="rtl"
                    onChange={handleOtpChange}
                    numInputs={5}
                    isInputNum={true}
                    shouldAutoFocus={true}
                    containerStyle="flex-row-reverse"
                    className="font-dana-regular"
                    inputStyle={{
                      border: "1px solid #bbb",
                      borderRadius: "10px",
                      width: "40px",
                      height: "56px",
                      fontSize: "30px",
                      color: "#1b1b1b",
                      fontWeight: "500",
                      caretColor: "#1b1b1b",
                      marginLeft: "4px",
                      marginRight: "4px",
                    }}
                    focusStyle={{
                      border: "1px solid #3c3c3c",
                      outline: "none",
                    }}
                  />
                </div>

                <div className="px-6 mt-14">
                  <span className="text-sm text-[#9b9b9b] font-dana-regular ml-5">
                    پیامکی دریافت نکردید؟
                  </span>
                  <button className="text-sm text-[#db717b] font-dana-medium">
                    ارسال مجدد پیامک‌
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        </Modal>
      </motion.main>
    </Fragment>
  );
}
