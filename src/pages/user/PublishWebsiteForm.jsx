import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { publishWebsiteUrl } from '@/config/urls';
import axios from "@/axiosConfig";
import { toast } from 'sonner';

export default function PublishWebsiteForm({ closeModal, websiteId }) {
    const [subdomain, setSubdomain] = useState('');

    const handleSubmission = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(publishWebsiteUrl(websiteId), {
                subdomain
            });

            console.log("Website Publish Status:🔔🔔🔔", response.data.success);

            if (response.data.success) {
                const publishedUrl = response.data.data.url;
                console.log("🚀 ~ handleSubmission ~ publishedUrl:", publishedUrl)

                closeModal();

                toast.success(
                    <div className='flex gap-1 items-center'>
                        <p>Successfully published website</p>
                        <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className='text-blue-400 underline'>
                            View Website
                        </a>
                    </div>,
                    { duration: 5000 } // will stay until manually closed
                );
            }
        } catch (error) {
            console.error("Error publishing website", error);
        }
    }

    return (
        <form className='flex flex-col gap-4 items-center' onSubmit={handleSubmission}>
            <Input
                type="text"
                placeholder="Enter suitable subdomain name for your site"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
            />

            <Button type="submit">Publish Website</Button>
        </form>
    )
}
