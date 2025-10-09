import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { IoMdAddCircle } from "react-icons/io";
import EventForm from "@/components/EventForm";
import EventCard from "@/components/EventCard";

const mockEvents = [
    {
        eventName: "Tech Conference 2025",
        description: "A tech conference for developers and tech enthusiasts.",
        location: "San Francisco, CA",
        date: "2025-11-12",
        time: "09:00 AM",
        expectedNumberOfPeople: 500,
        phone: "+1 123-456-7890",
        email: "info@techconference.com",
        status: "Completed",
    },
    {
        eventName: "Music Fest 2025",
        description: "A live music festival featuring top artists.",
        location: "Los Angeles, CA",
        date: "2025-12-05",
        time: "04:00 PM",
        expectedNumberOfPeople: 10000,
        phone: "+1 987-654-3210",
        email: "contact@musicfest.com",
        status: "Failed",
    },
    {
        eventName: "Startup Pitch Night",
        description: "An event for startups to pitch their ideas to investors.",
        location: "New York, NY",
        date: "2025-10-22",
        time: "06:00 PM",
        expectedNumberOfPeople: 200,
        phone: "+1 555-234-5678",
        email: "hello@startuppitch.com",
        status: "Completed",
    },
    {
        eventName: "Yoga Retreat",
        description: "A peaceful retreat for relaxation and yoga practice.",
        location: "Boulder, CO",
        date: "2025-10-15",
        time: "07:00 AM",
        expectedNumberOfPeople: 50,
        phone: "+1 444-555-6666",
        email: "retreat@holistic.com",
        status: "Failed",
    },
    {
        eventName: "Art Exhibition",
        description: "An art exhibition showcasing modern artists.",
        location: "Chicago, IL",
        date: "2025-11-02",
        time: "10:00 AM",
        expectedNumberOfPeople: 300,
        phone: "+1 333-444-5555",
        email: "artshow@exhibit.com",
        status: "Planned",
    },
];

function ManageEvent() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl">My Events</h2>
                <Modal
                    title="Add New Event"
                    description="Add your upcoming"
                    triggerer={<Button><IoMdAddCircle /> New Event</Button>}
                    content={<EventForm />}
                />
            </div>

            <div className="flex gap-6 flex-wrap">
                {mockEvents.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </div>
    )
}

export default ManageEvent
