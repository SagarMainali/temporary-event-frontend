import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ServerWakeupLoader() {
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setElapsed((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const loadingStages = [
        { after: 0, text: "Connecting..." },
        { after: 4, text: "Starting the server..." },
        {
            after: 11,
            text: "The server was inactive and is waking up. This may take up to a 50 seconds.",
        },
        {
            after: 25,
            text: "Still starting the server. Thanks for your patience.",
        },
        {
            after: 40,
            text: "Almost there..."
        }
    ];

    const message =
        [...loadingStages]
            .reverse()
            .find((stage) => elapsed >= stage.after)?.text ??
        loadingStages[0].text;

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <Loader2 className="animate-spin text-gray-600" size={40} />
            <p className="text-center text-gray-600">{message}</p>
            {/* <p className="text-sm text-gray-500">
          Subsequent requests will be much faster.
        </p> */}
        </div>
    );
}
