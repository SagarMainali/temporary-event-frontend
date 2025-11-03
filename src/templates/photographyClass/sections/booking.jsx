import React from 'react'
// Check mark
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// cross mark
import { IoMdCloseCircleOutline } from "react-icons/io";

const Booking = () => {
    const bookSeat = [
        {
            heading: "Book Your Seat",
            titile: "Join our 3-Day Photography Masterclass and elevate your skills from basics to mastery! Reserve your spot now and take the next step in your photography journey!",

            included: [
                "3 days of hands-on photography training",
                "Guidance on lighting, focus, framing, and tools",
                "Access to expert techniques and methods",
                "Individual assessment and personal consultation",
                "Certificate of completion",
            ],

            notincluded: [
                "Travel or accommodation expenses",
                "Personal camera equipment (participants should bring their own)",
                "Meals and refreshments (unless otherwise specified)",
                "Optional extras like photo editing software",
            ]

        },
    ];

    return (
        <div className='w-[64%] max-sm:w-[100%] max-md:w-full max-lg:w-[80%] max-xl:w-[100%] max-2xl:w-[80%]'>

            {bookSeat.map((book, index) => (
                <div key={index} className="booking-card">
                    <h2 className='mb-4'>{book.heading}</h2>
                    <p className='mb-8'>{book.titile}</p>



                    <div className="included-section mb-8">
                        <h3 className='mb-3'>What is Included</h3>
                        <ul>
                            {book.included.map((item, itemIndex) => (
                                <li key={itemIndex}
                                    className="flex items-center gap-2 text-base/8"
                                >

                                    <IoMdCheckmarkCircleOutline className="check-icon" />  {item}

                                </li>
                            ))}
                        </ul>
                    </div>



                    <div className="not-included-section">
                        <h3 className='mb-3'>What is Not Included</h3>

                        <ul>
                            {book.notincluded.map((item, itemIndex) => (
                                <li key={itemIndex}
                                    className="flex items-center gap-2 text-base/8"
                                >

                                    <IoMdCloseCircleOutline className="cross-icon" /> {item}

                                </li>
                            ))}
                        </ul>
                    </div>




                </div>
            ))}
        </div>
    )
}

export default Booking