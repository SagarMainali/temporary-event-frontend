import Modal from "@/pages/user/components/Modal";
import { Button } from "@/components/ui/button";
import { IoMdAddCircle } from "react-icons/io";
import EventForm from "@/pages/user/components/EventForm";
import EventCard from "@/pages/user/components/EventCard";
import axios from "@/axiosConfig"
import { useEffect, useState } from "react";
import { fetchUserEventsUrl } from "@/config/urls";
import { Link } from "react-router-dom";

function ManageEvent() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(fetchUserEventsUrl);
                setEvents(response.data.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchEvents();
    }, []);

    console.log("🚀 ~ ManageEvent ~ events:", events);

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

            <div className="flex gap-8 flex-wrap">
                {events.length > 0 && events.map((event) => (
                    <Link to={`/events/${event._id}`} key={event._id}>
                        <EventCard event={event} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ManageEvent
