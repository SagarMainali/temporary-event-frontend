import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function Modal({ triggerer, title, description, content }) {
    const [open, setOpen] = useState(false);

    // Function to close the modal
    const closeModal = () => setOpen(false);

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{triggerer}</DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {React.cloneElement(content, { closeModal })}
        </DialogContent>
    </Dialog>
}