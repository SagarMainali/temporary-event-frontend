import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, Pen, Trash } from 'lucide-react';

const EventCard = ({ event }) => {
    return (
        <Card className="w-full max-w-sm px-4 py-4 shadow-lg">
            <CardHeader className="flex justify-between">
                <div>
                    <h2 className="text-lg font-semibold">{event.eventName}</h2>
                    <p className="text-sm text-gray-500">{event.description}</p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger><EllipsisVertical size={16} /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="cursor-pointer"><Pen className="text-blue-600" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer"><Trash className="text-red-500" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <div className="mb-2">
                    <strong className="text-sm">Location:</strong> {event.location}
                </div>
                <div className="mb-2">
                    <strong className="text-sm">Date:</strong> {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="mb-2">
                    <strong className="text-sm">Time:</strong> {event.time}
                </div>
                <div className="mb-2">
                    <strong className="text-sm">Expected Number of People:</strong> {event.expectedNumberOfPeople}
                </div>
                <div className="mb-2">
                    <strong className="text-sm">Contact:</strong> {event.phone} | {event.email}
                </div>
            </CardContent>
            <CardFooter className="mt-auto">
                <span className={`text-sm font-semibold ${event.status === "Completed" ? "text-green-600" : event.status === "Failed" ? "text-red-500" : "text-blue-600"}`}>
                    Status: {event.status}
                </span>
            </CardFooter>
        </Card>
    );
};

export default EventCard;
