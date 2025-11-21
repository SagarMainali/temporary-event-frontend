import Modal from "@/pages/user/components/Modal";
import { Button } from "@/components/ui/button";
import AddEventForm from "@/pages/user/components/AddEventForm";
import EventCard from "@/pages/user/components/EventCard";
import axios from "@/axiosConfig"
import { useEffect, useState } from "react";
import { fetchEventsUrl } from "@/config/urls";
import CMSLoader from "@/components/loaders/CMSLoader";
import { CirclePlus } from "lucide-react";

function ManageEvent() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(fetchEventsUrl);
                setEvents(response.data.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchEvents();
    }, []);

    console.log("🚀 ~ ManageEvent ~ events:", events);

    // update local state
    const onAddSuccess = (newEvent) => {
        setEvents(prevEvents => (
            [newEvent, ...prevEvents]
        ))
    }

    // update local state
    const onDeleteSuccess = (eventId) => {
        setEvents(prevEvents => (
            prevEvents.filter(event => event._id !== eventId)
        ))
    }

    // update local state
    const onUpdateSuccess = (updatedEvent) => {
        setEvents(prevEvents => (
            prevEvents.map(event => event._id === updatedEvent._id ? updatedEvent : event)
        ))
    }

    if (events.length === 0) {
        return <CMSLoader />
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl">My Events</h2>
                <Modal
                    title="Add New Event"
                    description="Add your upcoming"
                    triggerer={<Button><CirclePlus /> New Event</Button>}
                    content={<AddEventForm onAddSuccess={onAddSuccess} />}
                />
            </div>

            <div className="flex gap-8 flex-wrap">
                {events.length > 0 && events.map((event) => (
                    <EventCard event={event} key={event._id} onDeleteSuccess={onDeleteSuccess} onUpdateSuccess={onUpdateSuccess} />
                ))}
            </div>
        </div>
    )
}

export default ManageEvent
