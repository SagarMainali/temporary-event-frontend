import React, { useRef } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import axios from "@/axiosConfig";
import { toast } from "sonner";
import { deleteEventUrl } from "@/config/urls";
import UpdateEventForm from "./UpdateEventForm";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/utils";

const EventCard = ({ event, onDeleteSuccess, onUpdateSuccess }) => {
    // ref attached to hidden Modal triggerer element
    const editModalRef = useRef(null);

    const triggerEventEditModal = async (e) => {
        // click the hidden Modal triggerer element
        editModalRef.current?.click();
    }

    // delete the event
    const deleteEvent = async (e) => {
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
        <Card className="py-0 w-[300px] rounded-xl shadow-lg gap-0 overflow-hidden">
            <CardHeader className="flex justify-between items-center p-6 bg-accent mb-auto">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">{event.eventName}</h2>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical size={18} className="text-gray-600 hover:text-gray-800 transition-all" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-32">
                        <DropdownMenuItem className="cursor-pointer text-sm p-0 rounded-md flex items-center" onClick={triggerEventEditModal}>
                            <span className="w-full h-full flex items-center text-blue-600 p-2"><Pencil className="mr-2 text-blue-600" size={16} /> Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-sm p-0 rounded-md flex items-center" onClick={deleteEvent}>
                            <span className="w-full h-full flex items-center text-red-600 p-2"><Trash className="mr-2 text-red-600" size={16} /> Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* triggered via ddmenu item - placed outside of ddmenu because after the click ddmenu closes which automatically closes the modal as well */}
                <Modal
                    title="Update Event"
                    description="Update existing details for your event"
                    triggerer={<span ref={editModalRef} />}
                    content={<UpdateEventForm event={event} onUpdateSuccess={onUpdateSuccess} />}
                />
            </CardHeader>
            <CardContent className="p-6 bg-white transition-all cursor-pointer hover:scale-[1.03] hover:shadow-2xl h-full">
                <Link to={event._id}>
                    <div className="mb-3">
                        <strong className="text-sm text-gray-600">Location:</strong>
                        <p className="text-sm text-gray-700">{event.location}</p>
                    </div>
                    <div className="mb-3">
                        <strong className="text-sm text-gray-600">Date:</strong>
                        <p className="text-sm text-gray-700">{formatDate(event.date)}</p>
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
                </Link>
            </CardContent>
            <CardFooter className="p-6 bg-accent flex items-center gap-1 font-semibold mt-auto">
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
