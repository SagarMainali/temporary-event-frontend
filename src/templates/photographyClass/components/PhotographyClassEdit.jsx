import { useState } from 'react' //this is used for for focused and scroll behaviour in form section
import sectionIds from '../scrollToSectionIds'

import LandingPage from '../sections/landingpage'
import Portfolio from '../sections/portfolio'
import Schedule from '../sections/Schedule'
import Booking from '../sections/booking'
import Bookticket from '../sections/bookcard'
import Location from '../sections/location'
import Carousel from '../sections/carousel'
import Form from '../sections/form'
import Footer from '../sections/footer'
import { getSectionData } from '../../utils/utils'

export default function PhotographyClassEdit({ data }) {
    console.log("🚀 ~ PhotographyClassEdit ~ data:", data);

    const { sections } = data;

    const { formSectionId, scheduleSectionId, ticketSectionId } = sectionIds;

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

    const [scheduleSection, setScheduleSection] = useState(() =>
        getSectionData(
            'photographyClassWebsite_ScheduleSection',
            sections.find(section => section.sectionName === 'programDetails')
        )
    )

    const handleUpdateScheduleSection = (newSection) => {
        localStorage.setItem('photographyClassWebsite_ScheduleSection', JSON.stringify(newSection));
        setScheduleSection(newSection);
    };

    return (
        <div className='bg-[var(--allbodybg-color)] max-w-[1600px] w-full mx-auto'>
            <div className='mx-auto max-sm:max-w-[95%] max-md:max-w-[95%] max-lg:max-w-[95%] max-xl:max-w-[95%] max-2xl:max-w-[95%]'>
                <LandingPage
                    formSectionId={formSectionId}
                    scheduleSectionId={scheduleSectionId}
                    editable={true}
                    section={heroSection}
                    onUpdateSection={handleUpdateHeroSection}
                /> {/* Pass ref to LandingPage */}
                {/* <LandingPage formRef={formRef} /> Pass ref to LandingPage */}

                <Portfolio
                    editable={true}
                    section={portfolioSection}
                    onUpdateSection={handleUpdatePortfolioSection}
                />

                <Schedule
                    scheduleSectionId={scheduleSectionId}
                    editable={true}
                    section={scheduleSection}
                    onUpdateSection={handleUpdateScheduleSection}
                /> {/* Pass ref to schedule.jsx */}

                <div id={ticketSectionId} className='flex gap-20 max-lg:gap-10 items-center justify-between max-sm:flex-col max-md:flex-col max-lg:flex-col'>
                    <div  >
                        <Booking />
                    </div>

                    <div>
                        <Bookticket
                            scheduleSectionId={scheduleSectionId} />
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
                    formSectionId={formSectionId}// Pass ref to Form
                    ticketSectionId={ticketSectionId} // Pass ref to Form
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
