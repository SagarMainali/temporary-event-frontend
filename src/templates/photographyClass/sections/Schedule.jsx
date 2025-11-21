import React, { useState } from "react";
import sphoto from "../assets/images/dann.png";
import Modal from "@/pages/user/components/Modal";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import ScheduleEditor from "./editorForms/ScheduleEditor";

const Schedule = ({ scheduleSectionId, section, onUpdateSection }) => {  //Receive formRef as prop from app.jsx
  console.log("🚀 ~ Schedule ~ section:", section)

  const [activeIndex, setActiveIndex] = useState(0);

  const schedules = section.content.schedules;
  const title = section.content.title;

  return (
    <div id={scheduleSectionId} className="mb-30 w-[100%] mx-auto relative">

      <Modal
        triggerer={
          <Button className="flex absolute right-0">
            <Pen size={16} />
          </Button>
        }
        title="Schedule Section"
        description="Edit schedule section contents"
        content={<ScheduleEditor section={section} onUpdateSection={onUpdateSection} />}
      />

      <h2 className="mb-16 max-sm:mb-8 text-center text-2xl">{title}</h2>

      <div className="flex max-sm:flex-col max-lg:flex-col max-md:flex-col gap-20 max-sm:gap-10 mx-auto w-[80%] max-sm:w-[100%] max-md:w-[100%] max-lg:w-[100%]">
        {/* Left Date Buttons */}
        <div className="flex flex-col gap-12 max-sm:flex-row max-md:flex-row max-lg:flex-row">
          {schedules.map((schedule, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-[100px] max-sm:w-[80px] h-[100px] max-sm:h-[80px] rounded-full flex items-center justify-center font-bold max-sm:text-sm transition
                ${activeIndex === index
                  ? "bg-[var(--color-primary)]  text-[var(--text-white)]"
                  : "bg-[var(--color-white)] text-[var(--text-primary)]  border border-[var(--color-primary)]"
                }`}
            >
              {schedule.date}
            </button>
          ))}
        </div>

        {/* Right Sessions List */}
        <div className="flex flex-col flex-1 w-full max-sm:overflow-x-auto">
          <div className="min-w-[640px]">
            {schedules[activeIndex].sessions.map((session, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b-2 border-b-[#989595]">
                <div className="w-[15%]">
                  <p className="text-[var(--text-seondary)] text-xl font-semibold">{session.time}</p>
                  <p className="font-semibold">{session.location}</p>
                </div>

                <p className="uppercase text-2xl font-bold w-[25%] max-sm:text-xl">{session.name}</p>
                <p className="text-xl w-[35%]">{session.post}</p>
                <img
                  src={session.photo || sphoto}
                  alt={session.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
