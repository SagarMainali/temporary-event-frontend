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

const Carousel = () => {
    const carouseList = [
        {
            carouseTeamPhoto: gone,
            carouseTitle:
                "Absolutely magical! Working with Shuttersoul was an unforgettable experience. From the moment we met, they made us feel completely at ease — like we were simply spending time with friends. The entire shoot felt natural and fun, and the results... breathtaking. Every photo captured real emotion, genuine connection, and stunning detail. We couldn’t be happier with how it all turned out. Truly beyond our expectations.",
            carouseTeamName: "Jason Roy",
            carouseTeamPost: "UI/UX Designer",
        },
        {
            carouseTeamPhoto: gtwo,
            carouseTitle:
                "Absolutely magical! Working with Shuttersoul was an unforgettable experience. From the moment we met, they made us feel completely at ease — like we were simply spending time with friends. The entire shoot felt natural and fun, and the results... breathtaking.",
            carouseTeamName: "Ishraq Khan",
            carouseTeamPost: "Founder & CEO @Kodezi",
        },
        {
            carouseTeamPhoto: gthree,
            carouseTitle:
                "Absolutely magical! Working with Shuttersoul was an unforgettable experience. From the moment we met, they made us feel completely at ease — like we were simply spending time with friends. The entire shoot felt natural and fun, and the results... breathtaking.",
            carouseTeamName: "Sarah Johnson",
            carouseTeamPost: "Creative Director",
        },
        {
            carouseTeamPhoto: gfour,
            carouseTitle:
                "Absolutely magical! Working with Shuttersoul was an unforgettable experience. From the moment we met, they made us feel completely at ease — like we were simply spending time with friends. The entire shoot felt natural and fun, and the results... breathtaking.",
            carouseTeamName: "Michael Smith",
            carouseTeamPost: "Photographer",
        },
        {
            carouseTeamPhoto: gfive,
            carouseTitle:
                "Absolutely magical! Working with Shuttersoul was an unforgettable experience. From the moment we met, they made us feel completely at ease — like we were simply spending time with friends. The entire shoot felt natural and fun, and the results... breathtaking.",
            carouseTeamName: "Emily Davis",
            carouseTeamPost: "Marketing Manager",
        },
    ];

    return (
        <div className="carousel relative">
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
                {carouseList.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex items-center gap-10 p-6 max-sm:p-0 max-md:p-0 max-lg:p-0 max-sm:flex-col max-md:flex-col max-lg:flex-col">


                            {/* Left Side - Image */}
                            <div className="bg-[var(--color-primary)] max-sm:bg-transparent max-md:bg-transparent max-lg:bg-transparent rounded-2xl w-full">
                                <img
                                    src={item.carouseTeamPhoto}
                                    alt={item.carouseTeamName}
                                    className="w-[300px] h-[350px] max-sm:h-[300px] object-cover rounded-2xl max-sm:w-[300px] max-sm:object-fill"
                                />
                            </div>

                            {/* Right Side - Quote & Text */}
                            <div>
                              

                               
                                <BsQuote className="text-[50px] text-blue-500 mb-4" />

                                <p className="text-lg uppercase font-bold mb-6">
                                    {item.carouseTitle}
                                </p>

                               


                                <h6 className="font-extrabold text-base uppercase">
                                    {item.carouseTeamName}
                                </h6>
                                <p className="text-[var(--text-primary)] text-sm">{item.carouseTeamPost}</p>

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
