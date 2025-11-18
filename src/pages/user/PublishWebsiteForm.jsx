import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { publishWebsiteUrl } from '@/config/urls';
import axios from "@/axiosConfig";
import { toast } from 'sonner';
import { X } from 'lucide-react';

export default function PublishWebsiteForm({ closeModal, websiteId, setWebsiteUrl }) {
    const [subdomain, setSubdomain] = useState('');

    const handleSubmission = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(publishWebsiteUrl(websiteId), {
                subdomain
            });

            console.log("Website Publish Status:🔔🔔🔔", response.data.success);

            if (response.data.success) {
                const publishedUrl = response.data.data.url;
                console.log("🚀 ~ handleSubmission ~ publishedUrl:", publishedUrl)

                closeModal();

                setWebsiteUrl(publishedUrl);

                toast.success(
                    <div className='flex gap-1 items-center'>
                        <p>Successfully published website</p>
                        <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className='text-blue-400 underline'>
                            View Website
                        </a>
                    </div>,
                    {
                        duration: 7000,
                        action: (
                            <span className='rounded-full cursor-pointer hover:bg-gray-700 p-1'>
                                <X onClick={() => toast.dismiss()} size={14} />
                            </span>
                        )
                    }
                );
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                return toast.error(
                    "This subdomain is already in use by another website. Please choose another subdomain.",
                    {
                        duration: 7000,
                        action: (
                            <span className='rounded-full cursor-pointer hover:bg-gray-700 p-1'>
                                <X onClick={() => toast.dismiss()} size={14} />
                            </span>
                        )
                    })
            }
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
