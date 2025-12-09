import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react";
import { toast } from "sonner"
import { uploadToCloudinary } from "@/templates/utils/utils";

function LocationDetailsEditor({ closeModal, section, onUpdateSection }) {
    const { image, googleMapLink } = section.content;

    // Initializing state for form inputs
    const [formData, setFormData] = useState({
        image,
        googleMapLink
    });

    const imageInputRef = useRef();

    // handling input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // handle iamge change
    const handleImageChange = async (file) => {
        setFormData((prevData) => ({
            ...prevData,
            image: file
        }))
    }

    // Handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const loadingToast = toast.loading("Updating Section...");

        try {
            const imageUrl = await uploadToCloudinary(formData.image)

            const updatedSection = {
                ...section,
                content: {
                    ...section.content,
                    ...formData,
                    image: imageUrl
                }
            };

            // update local storage as well as local state
            onUpdateSection(updatedSection);

            toast.dismiss(loadingToast);
            toast.success("Section saved locally")

            closeModal();
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error("Failed to update section locally. Please try again later.")
            console.error("Error updating section locally", error);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="space-y-2">
                <div className="space-y-2">
                    <Label htmlFor="locationImage">Location Image</Label>
                    {
                        formData.image
                        &&
                        <div className="p-1 border border-gray-200 rounded-md flex justify-center">
                            <img src={
                                formData.image instanceof File
                                    ? URL.createObjectURL(formData.image)
                                    : formData.image
                            }
                                alt="location_image"
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
                        id="image"
                        name="image"
                        onChange={(e) => handleImageChange(e.target.files[0])}
                        hidden
                        ref={imageInputRef}
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="googleMapLink">Google Map Link</Label>
                <Input
                    id="googleMapLink"
                    name="googleMapLink"
                    value={formData.googleMapLink}
                    onChange={handleChange}
                    placeholder="Paste google map link"
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
                <Button type="submit">Update Location Details Section</Button>
            </div>
        </form>
    );
}

export default LocationDetailsEditor;
