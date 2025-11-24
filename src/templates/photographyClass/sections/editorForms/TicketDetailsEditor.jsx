import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { toast } from "sonner"

function TicketDetailsEditor({ closeModal, section, onUpdateSection }) {
    const { eventDays, ticketPrice } = section.content;

    // Initializing state for form inputs
    const [formData, setFormData] = useState({
        eventDays,
        ticketPrice
    });

    // handling input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedSection = {
                ...section,
                content: {
                    ...section.content,
                    ...formData,
                }
            };

            // update local storage as well as local state
            onUpdateSection(updatedSection);
            toast.success("Section saved locally.");
            closeModal();
        } catch (error) {
            toast.error("Failed to update section locally. Please try again later.")
            console.error("Error updating section locally", error);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="space-y-2">
                <Label htmlFor="eventDays">No of days of event</Label>
                <Input
                    id="eventDays"
                    name="eventDays"
                    value={formData.eventDays}
                    onChange={handleChange}
                    placeholder="Enter no. of days of event"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="ticketPrice">Ticket Price in Rs.</Label>
                <Input
                    id="ticketPrice"
                    name="ticketPrice"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter ticket price"
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
                <Button type="submit">Update Ticket Details Section</Button>
            </div>
        </form>
    );
}

export default TicketDetailsEditor;
