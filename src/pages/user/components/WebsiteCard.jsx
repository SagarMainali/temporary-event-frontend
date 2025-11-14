import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const WebsiteCard = ({ publishedWebsite: { eventName, website } }) => {
    return (
        <Card
            className={cn(
                "w-full min-w-[330px] py-0 max-w-sm rounded-xl shadow-lg overflow-hidden transform transition-all gap-0 cursor-pointer hover:scale-[1.03] hover:shadow-2xl"
            )}
            title="Select template"
        >
            <CardHeader className="flex justify-between items-start p-6 bg-accent h-[140px]">
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">{website.subdomain}.{import.meta.env.VITE_DOMAIN_NAME}</h2>
                    <span className="py-2 px-3 bg-blue-400 text-white font-semibold rounded-lg">{eventName}</span>
                </div>
                <Link to={website.url} target="_blank" title="Open template preview in new tab">
                    <ExternalLink className="hover:translate-x-0.5 hover:-translate-y-0.5 transition-all" />
                </Link>
            </CardHeader>
            <CardContent className="p-6">
                <img src="" alt="website_preview_image" className="max-h-[250px] w-full object-contain" />
            </CardContent>
        </Card>
    );
};

export default WebsiteCard;
