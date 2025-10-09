import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "./ui/textarea";
import DatePicker from "./DatePicker";

function EventForm() {
    return (
        <form className="space-y-4">
            {/* Event Name */}
            <div className="space-y-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input id="eventName" name="eventName" placeholder="Enter event name" />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Enter event description" />
            </div>

            {/* Location */}
            <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="Enter event location" />
            </div>

            {/* Date */}
            <div className="space-y-2">
                <Label htmlFor="date" className="px-1">Event Date</Label>
                <DatePicker />
            </div>

            {/* Time */}
            <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input type="time" id="time" name="time" />
            </div>

            {/* Expected Number of People */}
            <div className="space-y-2">
                <Label htmlFor="expectedNumberOfPeople">Expected Number of People</Label>
                <Input type="number" id="expectedNumberOfPeople" name="expectedNumberOfPeople" placeholder="Enter expected number of people" />
            </div>

            {/* Phone */}
            <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input type="tel" id="phone" name="phone" placeholder="Enter phone number" />
            </div>

            {/* Email */}
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" placeholder="Enter email address" />
            </div>


            {/* Submit Button */}
            <div className="flex justify-center">
                <Button type="submit">Create Event</Button>
            </div>
        </form>
    );
}

export default EventForm;
