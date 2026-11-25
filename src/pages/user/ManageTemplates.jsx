import React, { useEffect, useState } from 'react'
import TemplateCard from './components/TemplateCard';
import CMSLoader from '@/components/loaders/CMSLoader';
import { getAllTemplatesUrl } from '@/config/urls';
import axios from "@/axiosConfig";

export default function ManageTemplates() {
    const [templates, setTemplates] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <CMSLoader />
    }

    return (
        <div className='space-y-6'>
            <h2 className="text-xl">Available Templates</h2>

            <div className="flex gap-8 flex-wrap">
                {templates.length > 0 && templates.map((template) => (
                    <TemplateCard
                        key={template._id}
                        template={template}
                    // isSelected={selectedTemplate === template._id}
                    // onClick={() => toggleTemplateSelect(template._id)}
                    />
                ))}
            </div>
        </div >
    )
}
