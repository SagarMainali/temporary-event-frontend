import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react";
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea";
import { CirclePlus, X } from "lucide-react";
import { uploadToCloudinary } from "@/templates/utils/utils";

function TestimonialsEditor({ closeModal, section, onUpdateSection }) {
    const { testimonials } = section.content;

    // Initializing state for form inputs
    const [formData, setFormData] = useState({
        testimonials
    });

    console.log("🚀 ~ TestimonialsEditor ~ formData:", formData)

    const [imagesToDelete, setImagesToDelete] = useState([])

    // for referencing array of hidden of input fields of type file
    const imageInputRefs = useRef([]);

    // handling input changes
    const handleChange = async (e) => {
        const { name } = e.target
        const [field, index] = name.split("#")

        let value;
        if (field === 'image') {
            const image = e.target.files[0]

            if (image && image.type.startsWith('image/')) {
                const oldImage = formData.testimonials[index].image;

                if (typeof oldImage === 'string') {
                    setImagesToDelete((prevImages) => [...prevImages, oldImage]);
                }

                value = image;
            } else {
                toast.error("Invalid file type. File must be an image.");
                return;
            }

        } else { // for reading values of type text
            value = e.target.value;
        }

        setFormData((prevData) => {
            const updatedTestimonials = prevData.testimonials.map((t, i) => (
                i === parseInt(index)
                    ? {
                        ...t,
                        [field]: value
                    }
                    : t
            ))

            return {
                testimonials: updatedTestimonials
            }
        });
    };

    // add item
    const handleItemAddition = () => {
        setFormData((prevData) => {
            toast.success("Testimonial added");
            return {
                testimonials: [
                    ...prevData.testimonials,
                    {
                        image: '',
                        name: '',
                        profession: '',
                        review: ''
                    }
                ]
            };
        });
    };

    // remove item
    const handleItemRemoval = (index) => {
        setFormData((prevData) => {
            const updatedTestimonials = prevData.testimonials.filter((_, i) => index !== i);
            toast.success("Testimonial removed");
            return { testimonials: updatedTestimonials };
        });
    };

    // Handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const loadingToast = toast.loading("Updating Section...");

        try {
            const updatedTestimonials = await Promise.all(
                formData.testimonials.map(async (t) => {
                    const isImage = t.image instanceof File

                    if (isImage) {
                        const imageUrl = await uploadToCloudinary(t.image)
                        return {
                            ...t,
                            image: imageUrl
                        }
                    } else {
                        return t
                    }
                })
            )

            const updatedSection = {
                ...section,
                content: {
                    ...section.content,
                    testimonials: updatedTestimonials,
                },
                imagesToDelete
            };

            // update local storage as well as local state
            onUpdateSection(updatedSection);

            toast.dismiss(loadingToast);
            toast.success("Section saved locally");

            closeModal();
        } catch (error) {
            toast.dismiss(loadingToast)
            toast.error("Failed to update section locally. Please try again later.")
            console.error("Error updating section locally", error);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {
                formData.testimonials.map((t, index) => (
                    <div className="space-y-4 bg-slate-50 p-4 rounded-lg shadow-lg" key={index}>
                        <div className="font-semibold text-center relative">
                            <span>
                                Testimonial # {index + 1}
                            </span>
                            <X
                                size={13}
                                className="absolute right-0 top-0 text-destructive cursor-pointer transition-transform hover:scale-150"
                                onClick={() => handleItemRemoval(index)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Image</Label>
                            <div className="p-1 border border-gray-200 rounded-md flex justify-center">
                                <img src={
                                    t.image instanceof File
                                        ? URL.createObjectURL(t.image)
                                        : t.image
                                }
                                    alt={t.name}
                                    className="max-h-[300px]"
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button type="button" variant="outline" size="sm" onClick={() => {
                                    if (imageInputRefs.current[index]) {
                                        imageInputRefs.current[index].click()
                                    }
                                }}>
                                    Choose New Image
                                </Button>
                            </div>
                            <Input
                                type="file"
                                hidden
                                name={`image#${index}`}
                                onChange={handleChange}
                                ref={(el) => (imageInputRefs.current[index] = el)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`name#${index}`}>Name</Label>
                            <Input
                                id={`name#${index}`}
                                name={`name#${index}`}
                                value={t.name}
                                onChange={handleChange}
                                placeholder="Enter name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`profession#${index}`}>Profession</Label>
                            <Input
                                id={`profession#${index}`}
                                name={`profession#${index}`}
                                value={t.profession}
                                onChange={handleChange}
                                placeholder="Enter profession"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`review#${index}`}>Review</Label>
                            <Textarea
                                id={`review#${index}`}
                                name={`review#${index}`}
                                value={t.review}
                                onChange={handleChange}
                                placeholder="Enter review"
                            />
                        </div>
                    </div>
                ))
            }

            <div className="flex justify-center">
                <Button type="button" variant="outline" size="sm" onClick={handleItemAddition}>
                    <CirclePlus /> Add Testimonial
                </Button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
                <Button type="submit">Update Testimonials Section</Button>
            </div>
        </form >
    );
}

export default TestimonialsEditor;
