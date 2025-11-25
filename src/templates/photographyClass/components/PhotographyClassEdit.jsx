import { useState } from 'react'
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

export default function PhotographyClassEdit({ data, setEditedContentsPresentOnLocal }) {
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
        setEditedContentsPresentOnLocal(true);
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
        setEditedContentsPresentOnLocal(true);
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
        setEditedContentsPresentOnLocal(true);
    };

    const [bookingDetailsSection, setBookingDetailsSection] = useState(() =>
        getSectionData(
            'photographyClassWebsite_BookingDetailsSection',
            sections.find(section => section.sectionName === 'bookingDetails')
        )
    )

    const handleUpdateBookingDetailsSection = (newSection) => {
        localStorage.setItem('photographyClassWebsite_BookingDetailsSection', JSON.stringify(newSection));
        setBookingDetailsSection(newSection);
        setEditedContentsPresentOnLocal(true);
    };

    const [ticketDetailsSection, setTicketDetailsSection] = useState(() =>
        getSectionData(
            'photographyClassWebsite_TicketDetailsSection',
            sections.find(section => section.sectionName === 'ticketDetails')
        )
    )

    const handleUpdateTicketDetailsSection = (newSection) => {
        localStorage.setItem('photographyClassWebsite_TicketDetailsSection', JSON.stringify(newSection));
        setTicketDetailsSection(newSection);
        setEditedContentsPresentOnLocal(true);
    };

    const [locaionDetailsSection, setLocaionDetailsSection] = useState(() =>
        getSectionData(
            'photographyClassWebsite_LocationDetailsSection',
            sections.find(section => section.sectionName === 'locationDetails')
        )
    )

    const handleUpdateLocaionDetailsSectionSection = (newSection) => {
        localStorage.setItem('photographyClassWebsite_LocationDetailsSection', JSON.stringify(newSection));
        setLocaionDetailsSection(newSection);
        setEditedContentsPresentOnLocal(true);
    };

    const [testimonialsSection, setTestimonialsSection] = useState(() =>
        getSectionData(
            'photographyClassWebsite_TestimonialsSection',
            sections.find(section => section.sectionName === 'testimonials')
        )
    )

    const handleUpdateTestimonialsSectionSection = (newSection) => {
        localStorage.setItem('photographyClassWebsite_TestimonialsSection', JSON.stringify(newSection));
        setTestimonialsSection(newSection);
        setEditedContentsPresentOnLocal(true);
    };

    return (
        <div className='bg-[var(--allbodybg-color)] max-w-[1600px] w-full mx-auto p-4'>
            <div className='mx-auto max-sm:max-w-[95%] max-md:max-w-[95%] max-lg:max-w-[95%] max-xl:max-w-[95%] max-2xl:max-w-[95%]'>
                <LandingPage
                    formSectionId={formSectionId}
                    scheduleSectionId={scheduleSectionId}
                    section={heroSection}
                    onUpdateSection={handleUpdateHeroSection}
                    editable={true}
                />

                <Portfolio
                    section={portfolioSection}
                    onUpdateSection={handleUpdatePortfolioSection}
                    editable={true}
                />

                <Schedule
                    scheduleSectionId={scheduleSectionId}
                    section={scheduleSection}
                    onUpdateSection={handleUpdateScheduleSection}
                    editable={true}
                />

                <div id={ticketSectionId} className='flex gap-10 justify-between max-sm:flex-col max-md:flex-col max-lg:flex-col'>
                    <Booking
                        section={bookingDetailsSection}
                        onUpdateSection={handleUpdateBookingDetailsSection}
                        editable={true}
                    />

                    <Bookticket
                        section={ticketDetailsSection}
                        onUpdateSection={handleUpdateTicketDetailsSection}
                        editable={true}
                    />
                </div>

                <Location
                    section={locaionDetailsSection}
                    onUpdateSection={handleUpdateLocaionDetailsSectionSection}
                    editable={true}
                />

                <Carousel
                    section={testimonialsSection}
                    onUpdateSection={handleUpdateTestimonialsSectionSection}
                    editable={true}
                />

                <Form
                    section={sections.find(section => section.sectionName === 'contactForm')}
                    title="Register for Pre-Booking"
                    formSectionId={formSectionId}
                    ticketSectionId={ticketSectionId}
                    organizerEmail={data.belongsToThisEvent.email}
                />

                <Footer
                    day="3-Day Photography Masterclass with Sijan Tamang"
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
