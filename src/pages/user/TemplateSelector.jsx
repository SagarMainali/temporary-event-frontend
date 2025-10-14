import React, { useState, useEffect } from 'react'
import axios from "@/axiosConfig";
import { createWebsiteUrl, getAllTemplatesUrl } from '@/config/urls';
import TemplateCard from './components/TemplateCard';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import Alert from './components/Alert';
import { toast } from 'sonner';

export default function TemplateSelector() {

    const [templates, setTemplates] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const { eventId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get(getAllTemplatesUrl);
                setTemplates(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching templates", error);
            }
        };

        fetchTemplates();
    }, []);

    const confirmationAction = async () => {
        try {
            const response = await axios.post(createWebsiteUrl, {
                eventId,
                templateId: selectedTemplate
            });
            if (response.data.success) {
                toast.success("Successfully selected template. Proceeding to edit page...");
                setTimeout(() => navigate(`/website/edit/${response.data.data._id}`), 2000);
            }
        } catch (error) {
            toast.error("Couldn't select template at the moment. Please try again later.");
            console.log("Error in template selection:", error);
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin text-gray-600" size={40} />
            </div>
        );
    }

    const toggleTemplateSelect = (id) => setSelectedTemplate(prev => prev === id ? null : id);

    return (
        <div className='space-y-6'>
            <h2 className="text-xl">Choose suitable template for your website</h2>

            <div className="flex gap-8 flex-wrap">
                {templates.length > 0 && templates.map((template) => (
                    <TemplateCard
                        key={template._id}
                        template={template}
                        isSelected={selectedTemplate === template._id}
                        onClick={() => toggleTemplateSelect(template._id)}
                    />
                ))}
            </div>

            <Alert
                triggerer={<Button disabled={!selectedTemplate} className="bg-blue-500 hover:bg-blue-600">Start Editing</Button>}
                title="Do you confirm your template selection?"
                description=" If you are sure with your template selection then we will now proceed to edit the website."
                confirmationAction={confirmationAction}
            />
        </div >
    )
}
