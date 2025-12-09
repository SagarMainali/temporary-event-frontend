import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { toast } from "sonner"

const ScheduleEditor = ({ closeModal, section, onUpdateSection }) => {
    const { title, schedules } = section.content;

    const [formData, setFormData] = useState({
        title,
        schedules
    })

    const handleTitleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            title: e.target.value
        }));
    };

    const handleDateChange = (index, value) => {
        const schedules = [...formData.schedules];;
        schedules[index].date = value;
        setFormData((prev) => ({
            ...prev,
            schedules
        }));
    };

    const handleSessionChange = (scheduleIndex, sessionIndex, field, value) => {
        const schedules = [...formData.schedules];;
        schedules[scheduleIndex].sessions[sessionIndex][field] = value;
        setFormData((prev) => ({
            ...prev,
            schedules
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
        <form className="p-4 max-w-4xl mx-auto" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Edit Program Details Section</h2>

            {/* Title Input */}
            <div className="mb-6">
                <Label className="block font-semibold mb-1">Section Title</Label>
                <Input
                    type="text"
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="border p-2 w-full"
                />
            </div>

            {/* Schedules */}
            {formData.schedules.map((schedule, scheduleIndex) => (
                <div key={scheduleIndex}>
                    <h2 className="mb-2 text-center">Day {scheduleIndex + 1}📅</h2>

                    <div className="mb-8 border p-4 rounded-lg">
                        <div className="mb-4">
                            <Label className="block font-medium">Date</Label>
                            <Input
                                type="text"
                                value={schedule.date}
                                onChange={(e) => handleDateChange(scheduleIndex, e.target.value)}
                                className="border p-2 w-full"
                            />
                        </div>

                        {/* Sessions */}
                        {schedule.sessions.map((session, sessionIndex) => (
                            <div key={sessionIndex} className="mb-4 border-t pt-4">
                                <h4 className="font-semibold mb-2">Session {sessionIndex + 1}</h4>
                                {["time", "location", "name", "post", "image"].map((field) => (
                                    <div key={field} className="mb-2">
                                        <Label className="block text-sm font-medium capitalize">{field}</Label>
                                        <Input
                                            type="text"
                                            value={session[field]}
                                            onChange={(e) =>
                                                handleSessionChange(scheduleIndex, sessionIndex, field, e.target.value)
                                            }
                                            className="border p-1 w-full"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Submit Button */}
            <div className="flex justify-center">
                <Button type="submit">Update Schedule Section</Button>
            </div>
        </form>
    );
};

export default ScheduleEditor;
