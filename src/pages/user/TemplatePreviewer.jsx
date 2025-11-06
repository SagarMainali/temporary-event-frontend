import { getTemplateUrl } from '@/config/urls';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "@/axiosConfig";
import PhotographyClassView from '@/templates/photographyClass/components/PhotographyClassView';
import { Loader2 } from 'lucide-react';

export default function TemplatePreviewer() {
    const { templateId } = useParams();
    const [template, setTemplate] = useState();
    console.log("🚀 ~ TemplatePreviewer ~ template:", template)

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const response = await axios.get(getTemplateUrl(templateId));
                setTemplate(response.data.data);
            } catch (error) {
                console.error("Error fetching template", error);
            }
        };

        fetchTemplate();
    }, []);

    if (!template) return (
        <div className="flex justify-center items-center h-screen" >
            <Loader2 className="animate-spin text-gray-600" size={40} />
        </div>
    )

    switch (template.templateName) {
        case 'Photography Class':
            return <PhotographyClassView data={template} />;
        // future cases for other templates
        default:
            return <div>Template not found</div>;
    }
}
