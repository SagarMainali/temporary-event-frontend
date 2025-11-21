import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea";

function BookingDetailsEditor({ closeModal, section, onUpdateSection }) {
    const { title, description, included, notIncluded } = section.content;

    // Initializing state for form inputs
    const [formData, setFormData] = useState({
        title,
        description,
        included,
        notIncluded
    });

    // handling input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'includedTitle') {
            setFormData((prevData) => ({
                ...prevData,
                included: {
                    ...prevData.included,
                    title: value
                }
            }))
        } else if (name === 'notIncludedTitle') {
            setFormData((prevData) => ({
                ...prevData,
                notIncluded: {
                    ...prevData.notIncluded,
                    title: value
                }
            }))
        } else {
            const [field, index] = name.split('#')

            if (field === 'included' || field === 'notIncluded') {
                const updatedList = [...formData[field].list]
                updatedList[parseInt(index)] = value
                setFormData((prevData) => ({
                    ...prevData,
                    [field]: {
                        ...prevData[field],
                        list: updatedList
                    },
                }))
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            }
        }
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
                    disabled
                />
            </div>

            {/* description */}
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="includedTitle">Inclusives</Label>
                <Input
                    id="includedTitle"
                    name="includedTitle"
                    value={formData.included.title}
                    onChange={handleChange}
                    placeholder="Enter title for this part"
                    disabled
                />

                <div className="space-y-2">
                    {
                        formData.included.list.map((item, index) => {
                            const itemNumber = index + 1;
                            return <div className="flex gap-2 items-center">
                                <span>{itemNumber}</span>
                                <Input
                                    name={`included#${index}`}
                                    value={item}
                                    onChange={handleChange}
                                    placeholder={`Inclusive # ${itemNumber}`}
                                />
                            </div>
                        })
                    }
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="notIncludedTitle">Non inclusives</Label>
                <Input
                    id="notIncludedTitle"
                    name="notIncludedTitle"
                    value={formData.notIncluded.title}
                    onChange={handleChange}
                    placeholder="Enter title for this part"
                    disabled
                />

                <div className="space-y-2">
                    {
                        formData.notIncluded.list.map((item, index) => {
                            const itemNumber = index + 1;
                            return <div className="flex gap-2 items-center">
                                <span>{itemNumber}</span>
                                <Input
                                    name={`notIncluded#${index}`}
                                    value={item}
                                    onChange={handleChange}
                                    placeholder={`Non Inclusive # ${itemNumber}`}
                                />
                            </div>
                        })
                    }
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
                <Button type="submit">Update Booking Details Section</Button>
            </div>
        </form>
    );
}

export default BookingDetailsEditor;
