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
        <div className='bg-[var(--allbodybg-color)] max-w-[1600px] w-full mx-auto p-4'>
            <LandingPage
                formSectionId={formSectionId}
                scheduleSectionId={scheduleSectionId}
                editable={false}
                section={sections.find(section => section.sectionName === 'hero')}
            />

            <Portfolio
                editable={false}
                section={sections.find(section => section.sectionName === 'portfolio')}
            />

            <Schedule
                scheduleSectionId={scheduleSectionId}
                editable={false}
                section={sections.find(section => section.sectionName === 'programDetails')}
            />

            <div id={ticketSectionId} className='flex gap-20 max-lg:gap-10 items-center justify-between max-sm:flex-col max-md:flex-col max-lg:flex-col'>
                <Booking
                    editable={false}
                    section={sections.find(section => section.sectionName === 'bookingDetails')}
                />

                <Bookticket
                    editable={false}
                    section={sections.find(section => section.sectionName === 'ticketDetails')}
                />
            </div>

            <div>
                <Location
                    editable={false}
                    section={sections.find(section => section.sectionName === 'locationDetails')}
                />
            </div>

            <Carousel
                editable={false}
                section={sections.find(section => section.sectionName === 'testimonials')}
            />

            <Form
                section={sections.find(section => section.sectionName === 'contactForm')}
                title="Register for Pre-Booking"
                formSectionId={formSectionId}
                ticketSectionId={ticketSectionId}
                organizerEmail={data.type !== 'template' ? data.belongsToThisEvent.email : null}
                disabled={data.type === 'template'}
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
    )
}
