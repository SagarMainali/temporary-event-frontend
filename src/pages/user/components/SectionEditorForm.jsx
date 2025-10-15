import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { updateSectionUrl } from "@/config/urls";
import axios from "@/axiosConfig";
import { toast } from "sonner"
import { useParams } from "react-router-dom";

function SectionEditorForm({ closeModal, section }) {
    const { websiteId } = useParams();

    const {
        _id: sectionId,
        content: {
            title, description, topics, bannerImage
        } } = section;

    // Initializing state for form inputs
    const [formData, setFormData] = useState({
        bannerImage: bannerImage[0],
        title,
        description,
        topics
    });

    const imageInputRef = useRef();

    const imagesToRemove = useRef({});

    const [changedFields, setChangedFields] = useState(new Set());

    // Handling input changes
    const handleChange = (name, value) => {
        if (name === 'bannerImage' && formData.bannerImage) {
            imagesToRemove.current.bannerImage = [formData.bannerImage];
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // mark as changed
        setChangedFields(prev => new Set(prev).add(name));
    };

    // Handling date change from DatePicker
    const handleTopicsChange = (index, value) => {
        const topics = [...formData.topics];
        topics[index] = value;
        setFormData((prev) => (
            {
                ...prev,
                topics
            }
        ));
        setChangedFields(prev => new Set(prev).add("topics"));
    };

    // Handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const form = new FormData();

            changedFields.forEach(field => {
                if (field === "topics") {
                    formData.topics.forEach(topic => {
                        if (topic.trim()) form.append("topics[]", topic); // can also be topics - using topics[] for relevancy
                    });
                } else if (field === "bannerImage" && formData.bannerImage) {
                    form.append("bannerImage", formData.bannerImage);
                    if (imagesToRemove.current.bannerImage) {
                        form.append("imagesToRemove", JSON.stringify(imagesToRemove.current));
                    }
                } else {
                    form.append(field, formData[field]);
                }
            })

            // log form
            for (let [key, value] of form.entries()) {
                console.log(`${key}:`, value);
            }

            const response = await axios.patch(updateSectionUrl(websiteId, sectionId), form);
            if (response.data.success) {
                toast.success("Section updated successfully");
                // Resetting the form
                setFormData({
                    bannerImage: null,
                    title: "",
                    description: "",
                    topics: ["", "", ""],
                });
                setChangedFields(new Set());
                closeModal();
            }
        } catch (error) {
            toast.error("Failed to update section. Please try again later.")
            console.error("Error updating section", error);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Banner Image */}
            <div className="space-y-2">
                <Label htmlFor="bannerImage">Banner Image</Label>
                {
                    formData.bannerImage
                    &&
                    <div className="p-1 border border-gray-200 rounded-md flex justify-center">
                        <img src={
                            formData.bannerImage instanceof File
                                ? URL.createObjectURL(formData.bannerImage)
                                : formData.bannerImage}
                            alt="banner_image"
                            className="max-h-[300px]"
                        />
                    </div>

                }
                <div className="flex justify-end">
                    <Button type="button" variant="outline" size="sm" onClick={() => {
                        if (imageInputRef) {
                            imageInputRef.current.click()
                        }
                    }}>
                        Choose New Image
                    </Button>
                </div>
                <Input
                    type="file"
                    id="bannerImage"
                    name="bannerImage"
                    onChange={(e) => handleChange(e.target.name, e.target.files[0])}
                    placeholder="Choose banner image"
                    hidden
                    ref={imageInputRef}
                />
            </div>

            {/* Title */}
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    placeholder="Enter event title"
                />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    placeholder="Enter event description"
                />
            </div>

            {/* Topics */}
            <div className="space-y-2">
                <Label>Topics</Label>
                <Input
                    name="topic1"
                    value={formData.topics[0]}
                    onChange={(e) => handleTopicsChange(0, e.target.value)}
                    placeholder="Enter topic 1"
                />
                <Input
                    name="topic2"
                    value={formData.topics[1]}
                    onChange={(e) => handleTopicsChange(1, e.target.value)}
                    placeholder="Enter topic 2"
                />
                <Input
                    name="topic3"
                    value={formData.topics[2]}
                    onChange={(e) => handleTopicsChange(2, e.target.value)}
                    placeholder="Enter topic 3"
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
                <Button type="submit">Update Landing Page</Button>
            </div>
        </form>
    );
}

export default SectionEditorForm;
