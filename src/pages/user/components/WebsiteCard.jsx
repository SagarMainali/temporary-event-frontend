import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLink, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { getformattedDate } from "@/utils/utils";

const WebsiteCard = ({ publishedWebsite: { eventName, website } }) => {
    return (
        <Card
            className={cn(
                "w-full min-w-[330px] py-0 max-w-sm rounded-xl shadow-lg overflow-hidden transform transition-all gap-0 hover:shadow-2xl"
            )}
            title="Select template"
        >
            <CardHeader className="flex justify-between items-start p-6 bg-accent">
                <h2 className="text-xl font-semibold">{website.subdomain}.{import.meta.env.VITE_DOMAIN_NAME}</h2>
            </CardHeader>
            <CardContent className="p-6 space-y-2">
                <div className="flex gap-2 items-center">
                    Event: <Label className="border py-2 px-4 rounded-lg">{eventName}</Label>
                </div>
                <div className="flex gap-2 items-center">
                    Template: <Label className="border py-2 px-4 rounded-lg">{website.baseTemplate.templateName}</Label>
                </div>
                <div className="flex gap-2 items-center">
                    Published On: <Label className="border py-2 px-4 rounded-lg">{getformattedDate(website.publishedOn)}</Label>
                </div>
                <div className="flex gap-2 items-center">
                    Last Updated: <Label className="border py-2 px-4 rounded-lg">{getformattedDate(website.updatedAt)}</Label>
                </div>
            </CardContent>
            <CardFooter className="w-full flex gap-2.5 justify-end mt-auto h-[50px]">
                <Link to={`/events/${website.belongsToThisEvent}/edit-website/${website._id}`} title="Edit site">
                    <Pencil size={14} className=" text-blue-600 transition-all hover:scale-[1.3]" />
                </Link>
                <a href={website.url} target="_blank" rel="noopener noreferrer" title="Open site in a new tab">
                    <ExternalLink className=" text-blue-600 transition-all hover:scale-[1.3]" size={14} />
                </a>
            </CardFooter>
        </Card>
    );
};

export default WebsiteCard;
