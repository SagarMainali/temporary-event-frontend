// Carousel.jsx
import React from "react";
import gone from "../assets/images/grid1.png";
import gtwo from "../assets/images/grid2.png";
import gthree from "../assets/images/grid3.png";
import gfour from "../assets/images/grid4.png";
import gfive from "../assets/images/grid5.png";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { BsQuote } from "react-icons/bs";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "./carousel.css";
import Modal from "@/pages/user/components/Modal";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import TestimonialsEditor from "./editorForms/TestimonialsEditor";

const Carousel = ({ editable, section, onUpdateSection }) => {
    console.log("🚀 ~ Carousel ~ section:", section)

    const { testimonials } = section.content;

    return (
        <div className="relative">
            {
                editable &&
                <Modal
                    triggerer={
                        <Button className="flex absolute right-0 z-50">
                            <Pen size={16} />
                        </Button>
                    }
                    title="Testimonials Section"
                    description="Edit testimonials section contents"
                    content={<TestimonialsEditor section={section} onUpdateSection={onUpdateSection} />}
                />
            }

            <Swiper
                modules={[Navigation, Autoplay]}
                slidesPerView={1}
                loop={true}
                navigation={{
                    nextEl: ".custom-swiper-button-next",
                    prevEl: ".custom-swiper-button-prev",
                }}
                autoplay={{
                    delay: 3000, // 3 seconds
                    disableOnInteraction: false, // keeps autoplay after user swipes
                    pauseOnMouseEnter: true, // optional: pause when hover
                }}
            >
                {testimonials.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex items-center gap-10 p-6 max-sm:p-0 max-md:p-0 max-lg:p-0 max-sm:flex-col max-md:flex-col max-lg:flex-col">
                            {/* Left Side - Image */}
                            <div className="bg-[var(--color-primary)] max-sm:bg-transparent max-md:bg-transparent max-lg:bg-transparent rounded-2xl w-1/3 border border-orange-500">
                                <img
                                    src={item.photo}
                                    alt={item.name}
                                    className="object-cover rounded-2xl"
                                />
                            </div>

                            {/* Right Side - Quote & Text */}
                            <div className="w-2/3">
                                <BsQuote className="text-[50px] text-blue-500 mb-4" />

                                <p className="text-lg uppercase font-bold mb-6">
                                    {item.review}
                                </p>

                                <h6 className="font-extrabold text-base uppercase">
                                    {item.name}
                                </h6>
                                <p className="text-[var(--text-primary)] text-sm">{item.profession}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom Navigation Arrows inside Swiper */}
                <div className="custom-swiper-buttons-wrapper">
                    <button className="custom-swiper-button-prev">
                        <BiLeftArrowAlt size={24} />
                    </button>
                    <button className="custom-swiper-button-next">
                        <BiRightArrowAlt size={24} />
                    </button>
                </div>
            </Swiper>
        </div>
    );
};

export default Carousel;
