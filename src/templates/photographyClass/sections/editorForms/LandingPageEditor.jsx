import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { toast } from "sonner"
import { uploadToCloudinary } from "@/templates/utils/utils";

function LandingPageEditor({ closeModal, section, onUpdateSection }) {
    const { title, description, topics, image } = section.content;

    // Initializing state for form inputs
    const [formData, setFormData] = useState({
        image,
        title,
        description,
        topics,
    });

    // to append old images here on every new image update
    const [imagesToDelete, setImagesToDelete] = useState([]);

    const imageInputRef = useRef();

    // handling input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // handle image field change
    const handleImageChange = async (file) => {
        // capture old image
        if (typeof formData.image === "string") {
            setImagesToDelete((prevImages) => [...prevImages, formData.image]);
        }

        setFormData((prevData) => ({
            ...prevData,
            image: file
        }))
    }

    // Handling topics change
    const handleTopicsChange = (index, value) => {
        const topics = [...formData.topics];
        topics[index] = value;
        setFormData((prev) => (
            {
                ...prev,
                topics
            }
        ));
    };

    // Handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const loadingToast = toast.loading("Updating Section...");

        try {
            let imageUrl = null;
            if (formData.image instanceof File && imagesToDelete.length > 0) {
                imageUrl = await uploadToCloudinary(formData.image);
            }

            const updatedSection = {
                ...section,
                content: {
                    ...section.content,
                    ...formData,
                    image: imageUrl ?? formData.image
                },
                imagesToDelete
            };

            // updates local storage as well as local state
            onUpdateSection(updatedSection);

            toast.dismiss(loadingToast);
            toast.success("Section saved locally")

            closeModal();
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error("Failed to update section locally. Please try again later.");
            console.error("Error updating section locally", error);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Banner Image */}
            <div className="space-y-2">
                <Label htmlFor="image">Banner Image</Label>
                <div className="p-1 border border-gray-200 rounded-md flex justify-center">
                    <img
                        src={
                            formData.image instanceof File
                                ? URL.createObjectURL(formData.image)
                                : formData.image
                        }
                        alt="banner_image"
                        className="max-h-[300px]"
                    />
                </div>
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
                    id="image"
                    name="image"
                    onChange={(e) => handleImageChange(e.target.files[0])}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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

export default LandingPageEditor;
