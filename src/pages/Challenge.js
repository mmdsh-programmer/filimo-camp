import React, { useState, useEffect, useRef } from "react";
import Button from "Components/Button";
import Modal from "Components/Modal";
import CloseIcon from "icons/modal/close.svg";
import StarIcon from "icons/home/star.svg";
import { motion } from "framer-motion";
import { Fragment, } from "react/cjs/react.production.min";
import Header from "Components/Header";
import FilimoLogo from "icons/common/filimo-logo.svg";
import { Link } from "react-router-dom";
import Fetch from "Helper/Fetch";
import { useLocation ,useNavigate} from "react-router-dom";
import {userData} from 'Helper/helperFunc'
import {FindAvatarAdd} from 'Helper/avatars'


export default function Challenge() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openUnsuccessModal, setOpenUnSuccessModal] = useState(false);
  const [questionDetails, setquestionDetails] = useState({});
  const location = useLocation();
  let [level, setLevel] = useState('');
  const navigator = useNavigate();
  let levelID = useRef('');
  const [valueGame, setvalueGame] = useState();
  const [userAvatar, setuserAvatar] = useState();
  const handleSelection = ({ target: { value } }) => {

    setSelectedAnswer(value);

  };

  const handleSubmit = (e) => {

    e.preventDefault();
    setAns()


  };
  const setAns = async () => {

    var raw = JSON.stringify({
      "quiz_id": String(questionDetails.id),
      "choice_id": String(selectedAnswer)
    });
    var id = 6;

    const ansURL = await Fetch({
      url: `http://37.152.185.94:8001/user/play-quiz/${levelID.current}/`,
      method: 'POST',
      data: raw,
      redirect: 'follow'
    });
    if (!('ERROR' in ansURL)) {
      setvalueGame(ansURL.data.data.value);
      ansURL.data.data.result ? handleOpenSuccess() : handleOpenUnsuccess();

    }
    else {

    }

  }
  const getQuestion = async () => {
    const loginUrl = await Fetch({
      url: 'http://37.152.185.94:8001/user/get-quiz/',
      method: 'GET',
      redirect: 'follow'
    });
    if (!('ERROR' in loginUrl)) {
      setquestionDetails({ ...loginUrl.data.data });


    }
    else {

    }
  }

  const handleOpenSuccess = () => {
    setOpenSuccessModal(true);

  };

  const handleCloseSuccess = () => {
    setOpenSuccessModal(false);
    navigator('/');

  };

  const handleOpenUnsuccess = () => {
    setOpenUnSuccessModal(true);
  };

  const handleCloseUnsuccess = () => {
    setOpenUnSuccessModal(false);
    navigator('/');

  };
  useEffect(async () => {
    await getQuestion();
    setLevel(location.pathname.split('/')[2].split('-')[0]);
    levelID.current = location.pathname.split('/')[2].split('-')[1];
    let avatarid= await userData()
    setuserAvatar(avatarid[0].avatar_code)
  }, [])
  useEffect(() => { }, [level]);
  return (
    <Fragment>
      <Header />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen 2xl:min-h-fit"
      >
        <section className="min-h-screen 2xl:h-full 2xl:min-h-fit">
          <div className="container p-6 pb-[100px] min-h-screen flex flex-col 2xl:h-full 2xl:min-h-fit">
            <div className="relative">
              <h1 className="text-base text-white font-dana-regular leading-[1.81]">
                سوال
              </h1>

              <span className="font-dana-regular text-xs text-[#7c7c7c]">
                مرحله {level}
              </span>

              <Link
                to="/"
                className="absolute left-2/4 -translate-x-2/4 top-0 mt-[6px] block 2xl:hidden"
              >
                <figure className="w-10 h-10 overflow-hidden">
                  <img
                    src={FilimoLogo}
                    className="w-full h-full object-contain"
                    alt="filimo logo"
                  />
                </figure>
              </Link>
            </div>

            <h2 className="text-base mt-10 mb-14 text-white font-dana-regular">
              {questionDetails?.question}
            </h2>
            {questionDetails?.note  && ( <small className="text-base text-white font-data-regular mt-4 ">راهنما : {questionDetails?.note}</small>)}
           
            <div className="mt-auto">
              <form>
                <ul className="flex flex-col gap-y-2">
                  {questionDetails.choices?.map((item, index) => {
                    return (
                      <li className="relative rounded-[10px] bg-[#f9f9f9] bg-opacity-10 overflow-hidden">
                        <input
                          className="sr-only peer"
                          type="radio"
                          value={item.id}
                          name="answer"
                          id={`answer_${index}`}
                          onChange={handleSelection}
                        />
                        <label
                          className="font-dana-regular text-sm text-white flex p-2 pt-[10px] leading-[2.07] cursor-pointer 
                      peer-checked:bg-white peer-checked:text-black peer-checked:font-dana-medium peer-checked:ring-2 peer-checked:border-transparent"
                          htmlFor={`answer_${index}`}
                        >
                          {item.choice}
                        </label>
                      </li>)
                  })}



                </ul>

                <div className="flex w-full fixed bottom-0 left-0 2xl:relative">
                  <div className="container px-6 pb-6 2xl:px-0">
                    <Button
                      type={`${selectedAnswer ? "primary" : "disabled"}`}
                      style="w-full mt-8"
                      disabled={!selectedAnswer}
                      onClick={handleSubmit}
                    >
                      تایید
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* sucess modal */}
        <Modal
          alignCenter
          isOpen={openSuccessModal}
          setIsOpen={setOpenSuccessModal}
        >
          <button
            className="absolute left-4 top-4 w-6 h-6"
            onClick={handleCloseSuccess}
          >
            <img src={CloseIcon} alt="close button" />
          </button>
          <div className="container px-6 pb-[27px] py-7">
            <div className="rounded-full overflow-hidden mx-auto w-52 h-52">
              <img
                className="w-full h-full object-cover"
                src={require(`images/common/avatars/${FindAvatarAdd(parseInt(userAvatar), 'happy')}`)}

                alt="profile image"
              />
            </div>

            <h6 className="text-center font-dana-medium text-[22px] text-black leading-[2.5]">
              ایول
            </h6>

            <p className="text-center font-dana-regular text-xs text-black">
              جواب عالی دادی، غنچه بودی شکفتی :)
            </p>

            <div className="flex items-center border-[1px] border-[#f1f1f1] rounded-[5px] p-2 mt-4">
              <span className="font-dana-regular text-xs text-black leading-8 ml-auto">
                امتیاز این مرحله
              </span>
              <span className="font-dana-medium text-xl text-black ml-1 mt-[6px]">
                {valueGame}
              </span>
              <img
                className="w-4 h-4 object-contain"
                src={StarIcon}
                alt="star icon"
              />
            </div>

            {/* <Button
              type="primary"
              style="w-full mt-14"
              onClick={handleCloseSuccess}
            >
              اشتراک‌گذاری در صفحات اجتماعی
            </Button> */}

            <Button
              type="secondary"
              style="w-full mt-2"
              onClick={handleCloseSuccess}
            >
              متوجه شدم
            </Button>
          </div>
        </Modal>

        {/* unsucess modal */}
        <Modal
          alignCenter
          isOpen={openUnsuccessModal}
          setIsOpen={setOpenUnSuccessModal}
        >
          <button
            className="absolute left-4 top-4 w-6 h-6"
            onClick={handleCloseUnsuccess}
          >
            <img src={CloseIcon} alt="close button" />
          </button>
          <div className="container px-6 pb-[27px] py-7">
            <div className="rounded-full overflow-hidden mx-auto w-52 h-52">
              <img
                className="w-full h-full object-cover"
                src={require(`images/common/avatars/${FindAvatarAdd(parseInt(userAvatar), 'sad')}`)}

                alt="profile image"
              />
            </div>

            <h6 className="text-center font-dana-medium text-[22px] text-black mt-3">
              گند زدی که!
            </h6>

            <p className="text-center font-dana-regular text-xs text-black leading-9">
              <br />عیبی نداره
             انشالله فردا بازی میکنی و میبری.
            </p>

            <div className="flex items-center border-[1px] border-[#f1f1f1] rounded-[5px] p-2 mt-4">
              <span className="font-dana-regular text-xs text-black leading-8 ml-auto">
                امتیاز این مرحله
              </span>
              <span className="font-dana-medium text-xl text-black ml-1 mt-[6px]">
                {valueGame}
              </span>
              <img
                className="w-4 h-4 object-contain"
                src={StarIcon}
                alt="star icon"
              />
            </div>

            <div className="flex gap-x-2 mt-6">
              <Button
                type="secondary"
                style="w-full mt-2"
                onClick={handleCloseUnsuccess}
              >
                 متوجه شدم
              </Button>
              {/* <Button
                type="primary"
                style="flex-[1]"
                onClick={handleCloseUnsuccess}
              >
                دوباره
              </Button> */}
            </div>
          </div>
        </Modal>
      </motion.main>
    </Fragment>
  );
}
