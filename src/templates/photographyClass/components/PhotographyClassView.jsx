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

export default function PhotographyClassView({ data }) {
    console.log("🚀 ~ PhotographyClassView ~ data:", data);

    const { sections } = data;

    const { formSectionId, scheduleSectionId, ticketSectionId } = sectionIds;

    return (
        <div className='bg-[var(--allbodybg-color)] max-w-[1600px] w-full mx-auto'>
            <div className='mx-auto max-sm:max-w-[95%] max-md:max-w-[95%] max-lg:max-w-[95%] max-xl:max-w-[95%] max-2xl:max-w-[95%]'>
                <LandingPage
                    formSectionId={formSectionId}
                    scheduleSectionId={scheduleSectionId}
                    editable={false}
                    section={sections.find(section => section.sectionName === 'hero')}
                /> {/* Pass ref to LandingPage */}
                {/* <LandingPage formRef={formRef} /> Pass ref to LandingPage */}

                <Portfolio
                    editable={false}
                    section={sections.find(section => section.sectionName === 'portfolio')}
                />

                <Schedule
                    scheduleSectionId={scheduleSectionId}
                    editable={false}
                    section={sections.find(section => section.sectionName === 'programDetails')}
                /> {/* Pass ref to schedule.jsx */}

                <div id={ticketSectionId} className='flex gap-20 max-lg:gap-10 items-center justify-between max-sm:flex-col max-md:flex-col max-lg:flex-col'>
                    <div  >
                        <Booking />
                    </div>

                    <div>
                        <Bookticket />
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
                    formSectionId={formSectionId} // Pass ref to Form
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
