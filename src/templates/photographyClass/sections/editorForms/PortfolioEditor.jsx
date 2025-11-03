import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { toast } from "sonner"

function PortfolioEditor({ closeModal, section, onUpdateSection }) {
    const { title, socials } = section.content;

    // Initializing state for form inputs
    const [formData, setFormData] = useState({
        title,
        socials
    });

    // handling input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handling date change from DatePicker
    const handleSocialChange = (index, name, value) => {
        const socials = [...formData.socials];
        socials[index][name] = value;
        setFormData((prev) => (
            {
                ...prev,
                socials
            }
        ));
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
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter section title"
                />
            </div>

            {formData.socials.map((social, i) => (
                <div key={i} className="mb-[30px] bg-white shadow-md py-2 px-6 rounded-md">
                    <Label>Social {i + 1}</Label>
                    <div className="flex gap-4 items-start mt-4">
                        <div className="mb-0 flex flex-col gap-1 items-start">
                            <Label className="font-semibold text-xs">Title</Label>
                            <Input
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={social.title}
                                onChange={(e) => handleSocialChange(i, e.target.name, e.target.value)}
                                className="border p-2"
                                required
                            />
                        </div>
                        <div className="mb-0 flex flex-col gap-1 items-start">
                            <Label className="font-semibold text-xs">Username</Label>
                            <Input
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={social.username}
                                onChange={(e) => handleSocialChange(i, e.target.name, e.target.value)}
                                className="border p-2"
                                required
                            />
                        </div>
                        <div className="mb-0 flex flex-col gap-1 items-start">
                            <Label className="font-semibold text-xs">Link</Label>
                            <Input
                                type="text"
                                placeholder="Link"
                                name="link"
                                value={social.link}
                                onChange={(e) => handleSocialChange(i, e.target.name, e.target.value)}
                                className="border p-2"
                                required
                            />
                        </div>
                    </div>
                </div>
            ))}

            {/* Submit Button */}
            <div className="flex justify-center">
                <Button type="submit">Update Portfolio Section</Button>
            </div>
        </form>
    );
}

export default PortfolioEditor;
