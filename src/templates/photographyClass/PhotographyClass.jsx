import { useState, useRef } from 'react' //this is used for for focused and scroll behaviour in form section

import LandingPage from './components/landingpage'
import Portfolio from './components/portfolio'
import Schedule from './components/Schedule'
import Booking from './components/booking'
import Bookticket from './components/bookcard'
import Location from './components/location'
import Carousel from './components/carousel'
import Form from './components/form'
import Footer from './components/footer'
import { getSectionData } from '../utils/utils'

export default function PhotographyClass({ data }) {
    console.log("🚀 ~ PhotographyClass ~ data:", data)

    const { type, sections } = data;

    const formRef = useRef(null); // Create ref here to used for focused and scroll behaviour in form.jsx section

    const scheduleRef = useRef(null); // Create ref here to used for focused and scroll behaviour in Schedule.jsx section

    const ticketcardRef = useRef(null); // Create ref here to used for focused and scroll behaviour in form.jsx section

    const [heroSection, setHeroSection] = useState(() =>
        getSectionData(
            'photographyClassWebsite_HeroSection',
            sections.find(section => section.sectionName === 'hero')
        )
    );

    // updates localstorage and local state causing re-render reflecting latest data
    const handleUpdateHeroSection = (newSection) => {
        localStorage.setItem('photographyClassWebsite_HeroSection', JSON.stringify(newSection));
        setHeroSection(newSection);
    };

    const [portfolioSection, setPortfolioSection] = useState(() =>
        getSectionData(
            'photographyClassWebsite_PortfolioSection',
            sections.find(section => section.sectionName === 'portfolio')
        )
    )

    const handleUpdatePortfolioSection = (newSection) => {
        localStorage.setItem('photographyClassWebsite_PortfolioSection', JSON.stringify(newSection));
        setPortfolioSection(newSection);
    };

    return (
        <div className='bg-[var(--allbodybg-color)] '>
            <div className='max-w-[1400px] border border-dashed border-blue-300 mx-auto max-sm:max-w-[95%] max-md:max-w-[95%] max-lg:max-w-[95%] max-xl:max-w-[95%] max-2xl:max-w-[95%]'>
                <LandingPage
                    formRef={formRef}
                    scheduleRef={scheduleRef}
                    editable={type === 'website'}
                    section={heroSection}
                    onUpdateSection={handleUpdateHeroSection}
                /> {/* Pass ref to LandingPage */}

                {/* <LandingPage formRef={formRef} /> Pass ref to LandingPage */}

                <Portfolio
                    editable={type === 'website'}
                    section={portfolioSection}
                    onUpdateSection={handleUpdatePortfolioSection}
                />

                <Schedule scheduleRef={scheduleRef} /> {/* Pass ref to schedule.jsx */}

                <div ref={ticketcardRef} className='flex gap-20 max-lg:gap-10 items-center justify-between max-sm:flex-col max-md:flex-col max-lg:flex-col'>
                    <div  >
                        <Booking />
                    </div>

                    <div>
                        <Bookticket
                            scheduleRef={scheduleRef} />
                        {/* now this for by card */}
                    </div>
                </div>

                {/* Location Section */}
                <div>
                    <Location
                        Locationhead="Location"

                    />

                </div>

                <Carousel />

                <Form
                    title="Register for Pre-Booking"
                    formRef={formRef} // Pass ref to Form
                    ticketcardRef={ticketcardRef} // Pass ref to Form
                />

                <Footer
                    day="3-Day Photography Masterclass with 
          Sijan Tamang"
                    date="Apr 23rd -  Apr 26th"
                    location="Event Banquet, Lalitpur"
                    organiser="Event Organized by Lotus Events"
                    phone="8XXXXXXXX, 98XXXXXXXX"
                    mail="inquiry@lotusEvents.com"
                />
            </div>
        </div>

    )
}
