import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function Modal({ triggerer, title, description, content }) {
    return <Dialog>
        <DialogTrigger asChild>{triggerer}</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {content}
        </DialogContent>
    </Dialog>
}