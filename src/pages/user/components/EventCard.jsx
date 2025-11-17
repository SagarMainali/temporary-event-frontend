import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pen, Trash } from "lucide-react";
import axios from "@/axiosConfig";
import { toast } from "sonner";
import { deleteEventUrl } from "@/config/urls";

const EventCard = ({ event, onDeleteSuccess }) => {

    const deleteEvent = async (e) => {
        e.stopPropagation();

        try {
            const response = await axios.delete(deleteEventUrl(event._id));
            if (response.data.success) {
                toast.success("The event has been successfully deleted");
                onDeleteSuccess(event._id);
            }
        } catch (error) {
            toast.error("Couldn't delete the event at the moment. Please try again later.")
        }
    }

    return (
        <Card className="w-full py-0 max-w-sm rounded-xl shadow-lg overflow-hidden transform transition-all gap-0 hover:scale-[1.03] hover:shadow-2xl">
            <CardHeader className="flex justify-between items-center p-6 bg-accent">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">{event.eventName}</h2>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical size={18} className="text-gray-600 hover:text-gray-800 transition-all" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-32">
                        <DropdownMenuItem className="cursor-pointer text-sm text-blue-600 hover:bg-blue-50 p-2 rounded-md flex items-center">
                            <Pen className="mr-2" size={16} /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-sm text-red-600 hover:bg-red-50 p-2 rounded-md flex items-center" onClick={deleteEvent}>
                            <Trash className="mr-2" size={16} /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="p-6">
                <div className="mb-3">
                    <strong className="text-sm text-gray-600">Location:</strong>
                    <p className="text-sm text-gray-700">{event.location}</p>
                </div>
                <div className="mb-3">
                    <strong className="text-sm text-gray-600">Date:</strong>
                    <p className="text-sm text-gray-700">{new Date(event.date).toLocaleDateString()}</p>
                </div>
                <div className="mb-3">
                    <strong className="text-sm text-gray-600">Time:</strong>
                    <p className="text-sm text-gray-700">{event.time}</p>
                </div>
                <div className="mb-3">
                    <strong className="text-sm text-gray-600">Expected Number of People:</strong>
                    <p className="text-sm text-gray-700">{event.expectedNumberOfPeople}</p>
                </div>
                <div className="mb-3">
                    <strong className="text-sm text-gray-600">Contact:</strong>
                    <p className="text-sm text-gray-700">{event.phone} | {event.email}</p>
                </div>
            </CardContent>
            <CardFooter className="p-6 bg-accent flex items-center gap-1 font-semibold">
                <span>
                    Status:
                </span>
                <span
                    className={`text-sm font-semibold ${event.status === "Completed"
                        ? "text-green-600"
                        : event.status === "Failed"
                            ? "text-red-500"
                            : "text-blue-600"
                        }`}
                >
                    {event.status.toUpperCase()}
                </span>
            </CardFooter>
        </Card>
    );
};

export default EventCard;
