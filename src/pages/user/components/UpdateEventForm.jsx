import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "./DatePicker";
import { useState } from "react";
import { updateEventUrl } from "@/config/urls";
import axios from "@/axiosConfig";
import { toast } from "sonner"

function UpdateEventForm({ closeModal, event, onUpdateSuccess }) {
    const { _id, eventName, description, location, date, time, expectedNumberOfPeople, phone, email } = event;

    // Initializing state for form inputs
    const [formData, setFormData] = useState({
        eventName,
        description,
        location,
        date,
        time,
        expectedNumberOfPeople,
        phone,
        email,
    });

    // Handling input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handling date change from DatePicker
    const handleDateChange = (selectedDate) => {
        setFormData({
            ...formData,
            date: selectedDate ? selectedDate.toLocaleDateString("en-US") : "", // Format date to string
        });
    };

    // Handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(updateEventUrl(_id), {
                ...formData
            });
            if (response.data.success) {
                const updatedEvent = response.data.data;

                toast.success("Event updated successfully");
                // Resetting the form
                setFormData({
                    eventName: "",
                    description: "",
                    location: "",
                    date: "",
                    time: "",
                    expectedNumberOfPeople: "",
                    phone: "",
                    email: "",
                });
                closeModal();
                onUpdateSuccess(updatedEvent);
                console.log("Event updated:\n", updatedEvent);

            }
        } catch (error) {
            toast.error("Failed to update event. Please try again later.")
            console.error("Error updating event", error);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Event Name */}
            <div className="space-y-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                    id="eventName"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    placeholder="Enter event name"
                />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter event description"
                />
            </div>

            {/* Location */}
            <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter event location"
                />
            </div>

            {/* Date */}
            <div className="space-y-2">
                <Label htmlFor="date" className="px-1">Event Date</Label>
                <DatePicker
                    value={formData.date}
                    onSelect={handleDateChange}
                />
            </div>

            {/* Time */}
            <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                />
            </div>

            {/* Expected Number of People */}
            <div className="space-y-2">
                <Label htmlFor="expectedNumberOfPeople">Expected Number of People</Label>
                <Input
                    type="number"
                    id="expectedNumberOfPeople"
                    name="expectedNumberOfPeople"
                    value={formData.expectedNumberOfPeople}
                    onChange={handleChange}
                    placeholder="Enter expected number of people"
                />
            </div>

            {/* Phone */}
            <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                />
            </div>

            {/* Email */}
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
                <Button type="submit">Update Event</Button>
            </div>
        </form>
    );
}

export default UpdateEventForm;
