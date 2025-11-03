// import { useRef } from "react";

import landingphotomobile from "../assets/images/landing_mobile.png";

import { FaRegCircle } from "react-icons/fa";
import { PiTriangleBold } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";

// this below 2 import is useContext
import { useContext } from "react";
import { ThemeContext } from "../../../components/usecontext";

import { Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/pages/user/components/Modal";
import LandingPageEditor from "@/templates/photographyClass/sections/editorForms/LandingPageEditor";
import { scrollToSection } from "@/templates/utils/utils";

const LandingPage = ({ formSectionId, scheduleSectionId, editable, section, onUpdateSection }) => {
  console.log("🚀 ~ LandingPage ~ section:", section)

  const { title, description, bannerImage, buttonNames, topics } = section.content;

  // Get theme context
  const {
    theme,
    toggleTheme,
    toggleFontFamily,
    fontFamily,
    // fontSize, 
    increaseFontSize,
    decreaseFontSize,
    resetFontSize
  } = useContext(ThemeContext);

  const landingDetail = [
    {
      photo: bannerImage[0],
      photo2: landingphotomobile,
      title: title,
      description:
        description,

      btnPRM: buttonNames[0],
      btnSCY: buttonNames[1],

      // small cards
      smallCards: [
        {
          scard: "1",
          photoIcon: <PiTriangleBold size={"30px"} />,
          cardTitle: topics[0],
        },
        {
          scard: "2",
          photoIcon: <RxCross2 size={"30px"} />,
          cardTitle: topics[1],
        },
        {
          scard: "3",
          photoIcon: <FaRegCircle size={"30px"} />,
          cardTitle: topics[2],
        },
      ],
    },
  ];

  return (
    <div className="landing mb-20 relative">
      {/* <div className="flex items-center justify-between w-full fixed left-0 top-1 z-10">
        <button onClick={toggleFontFamily} className="btn_dark" title="Change font family">
          {fontFamily === "fontFamily" ? "Sorcecode" : "Montserrat"}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={decreaseFontSize}
            className="btn_dark text-sm px-2 py-1"
            title="Decrease font size">
            - 2px
          </button> */}

      {/* <span className="btn_dark text-xs px-2 py-1 cursor-default">
            {fontSize}px
          </span> */}

      {/* <button
            onClick={increaseFontSize}
            className="btn_dark text-sm px-2 py-1"
            title="Increase font size">
            + 2px
          </button>
          <button
            onClick={resetFontSize}
            className="btn_dark text-xs px-2 py-1"
            title="Reset font size to default (16px)">
            Reset
          </button>
        </div>

        <button onClick={toggleTheme} className="btn_dark" title="Dark mode">
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div> */}

      {editable &&
        <Modal
          triggerer={
            <Button className="flex absolute right-0">
              <Pen size={16} />
            </Button>
          }
          title="Landing Page"
          description="Edit landing page contents"
          content={<LandingPageEditor section={section} onUpdateSection={onUpdateSection} />}
        />
      }

      <div className="landing_wrapper">
        {landingDetail.map((landing, index) => (
          <div
            key={index}
            className="h-screen max-h-[900px] flex flex-col lg:flex-row items-center gap-[89px] max-xl:gap-10  max-lg:h-fit"
          >
            {/* Desktop Photo (>=1024px) */}
            <img
              className="hidden lg:block rounded-[120px] w-[45%] h-[90%] object-cover"
              src={landing.photo}
              alt="this is >1024px landing pictures"
            />

            {/* Mobile/Tablet Photo (<1024px) */}
            <img
              className="block lg:hidden object-cover rounded-2xl w-full h-auto"
              src={landing.photo2}
              alt="this is <1024px landing pictures"
            />

            {/* Content */}
            <div className="w-[50%] max-lg:w-full">
              <h1 className="max-sm:text-2xl max-md:text-3xl text-2xl">{landing.title}</h1>
              <p className="leading-6 font-normal max-sm:text-xl/snug max-md:text-xl text-lg">
                {landing.description}
              </p>

              {/* Buttons */}
              <div className="flex my-15 gap-8 max-sm:my-10 max-sm:justify-around max-[500px]:justify-between max-[500px]:my-0">
                <button
                  onClick={() => scrollToSection(formSectionId)}
                  className="btn_main max-sm:text-sm max-sm:p-1 max-[500px]:p-0.5"
                >
                  {landing.btnPRM}
                </button>

                <button onClick={() => scrollToSection(scheduleSectionId)} className="btn_secondary">
                  {landing.btnSCY}
                </button>
              </div>

              {/* Small Cards */}
              <div className="flex gap-5 max-[500px]:flex-wrap">
                {landing.smallCards.map((card) => (
                  <div
                    key={card.scard}
                    className="flex flex-col border-1 border-[var(--color-secondary)] border-dashed rounded-xl p-4 max-sm:p-2"
                  >
                    <span className="text-[var(--color-primary)] mb-3">
                      {card.photoIcon}
                    </span>
                    <p className="font-normal max-sm:text-lg">{card.cardTitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
