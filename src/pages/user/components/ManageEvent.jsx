import { Button } from "@/components/ui/button";

function ManageEvent() {

    function handleSubmit(e) {
        e.preventDefault();

        // handle rest with create event api
    }

    return (
        <div className="flex flex-col gap-8 items-start">
            <div>
                <h3>Add event</h3>

                <form onSubmit={handleSubmit} className="flex flex-col">
                    *create event form inputs*

                    <Button type="submit">Create event</Button>
                </form>
            </div>

            <div>
                <h3>My Events</h3>
                *events lists*
            </div>
        </div>
    )
}

export default ManageEvent
