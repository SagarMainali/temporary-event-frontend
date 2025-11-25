import React from 'react'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Modal from "@/pages/user/components/Modal";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import BookingDetailsEditor from './editorForms/BookingDetailsEditor';

const Booking = ({ editable, section, onUpdateSection }) => {
    console.log("🚀 ~ Booking ~ section:", section)

    const { title, description, included, notIncluded } = section.content;

    return (
        <div className='w-[75%] max-sm:w-[100%] max-md:w-full max-lg:w-[80%] max-xl:w-[100%] max-2xl:w-[80%] relative'>
            {
                editable &&
                <Modal
                    triggerer={
                        <Button className="flex absolute right-0">
                            <Pen size={16} />
                        </Button>
                    }
                    title="Booking Details"
                    description="Edit booking details"
                    content={<BookingDetailsEditor section={section} onUpdateSection={onUpdateSection} />}
                />
            }

            <div className="booking-card">
                <h2 className='mb-4'>{title}</h2>
                <p className='mb-8'>{description}</p>
                <div className="included-section mb-8">
                    <h3 className='mb-3'>{included.title}</h3>
                    <ul>
                        {included.list.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center gap-2 text-base/8">
                                <IoMdCheckmarkCircleOutline className="check-icon" />  {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="not-included-section">
                    <h3 className='mb-3'>{notIncluded.title}</h3>
                    <ul>
                        {notIncluded.list.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center gap-2 text-base/8">
                                <IoMdCloseCircleOutline className="cross-icon" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Booking