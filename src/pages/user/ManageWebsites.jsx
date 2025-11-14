import axios from "@/axiosConfig"
import { useEffect, useState } from "react";
import { getPublishedWebsitesUrl } from "@/config/urls";
import { Link } from "react-router-dom";
import WebsiteCard from "./components/WebsiteCard";

function ManagePublishedWebsites() {
    const [publishedWebsites, setPublishedWebsites] = useState([]);
    console.log("🚀 ~ ManagePublishedWebsites ~ publishedWebsites:", publishedWebsites)

    useEffect(() => {
        const fetchPublishedWebsites = async () => {
            try {
                const response = await axios.get(getPublishedWebsitesUrl);
                setPublishedWebsites(response.data.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchPublishedWebsites();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl">Published Websites</h2>
            </div>

            <div className="flex gap-8 flex-wrap">
                {
                    publishedWebsites.length > 0
                    &&
                    publishedWebsites.map((publishedWebsite) => <WebsiteCard publishedWebsite={publishedWebsite} key={publishedWebsite.website._id} />)
                }
            </div>
        </div>
    )
}

export default ManagePublishedWebsites
