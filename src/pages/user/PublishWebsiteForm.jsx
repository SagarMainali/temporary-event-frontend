import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { publishWebsiteUrl } from '@/config/urls';
import axios from "@/axiosConfig";
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { buildWebsiteUrl } from '@/utils/utils';

// export default function PublishWebsiteForm({ closeModal, websiteId, setWebsiteUrl }) {
export default function PublishWebsiteForm({ closeModal, websiteId, setSubdomain }) {
    // const [subdomain, setSubdomain] = useState('');
    const [userInput, setUserInput] = useState('');

    const handleSubmission = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(publishWebsiteUrl(websiteId), {
                subdomain: userInput
            });

            if (response.data.success) {
                // const publishedUrl = response.data.data.url;
                const subdomain = response.data.data.subdomain;
                console.log("🚀🚀🚀 ~ handleSubmission ~ subdomain:", subdomain)

                closeModal();

                // setWebsiteUrl(publishedUrl);
                setSubdomain(subdomain);

                toast.success(
                    <div className='flex gap-1 items-center'>
                        <p>Successfully published website</p>
                        {/* <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className='text-blue-400 underline'> */}
                        <a href={buildWebsiteUrl(subdomain)} target="_blank" rel="noopener noreferrer" className='text-blue-400 underline'>
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
            <div className='w-full flex border rounded-md focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 overflow-hidden'>
                <Input
                    type="text"
                    placeholder="Enter subdomain"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="rounded-tr-none rounded-br-none border-none focus-visible:ring-0"
                />
                <Label className="px-2 bg-gray-200 text-gray-600">
                    .{import.meta.env.VITE_DOMAIN_NAME}
                </Label>
            </div>

            <Button type="submit">Publish Website</Button>
        </form>
    )
}
