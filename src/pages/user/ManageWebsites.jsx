import axios from "@/axiosConfig"
import { useEffect, useState } from "react";
import { getPublishedWebsitesUrl } from "@/config/urls";
import WebsiteCard from "./components/WebsiteCard";
import CMSLoader from "@/components/loaders/CMSLoader";

function ManagePublishedWebsites() {
    const [publishedWebsites, setPublishedWebsites] = useState([]);
    console.log("🚀 ~ ManagePublishedWebsites ~ publishedWebsites:", publishedWebsites)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublishedWebsites = async () => {
            setLoading(true);

            try {
                const response = await axios.get(getPublishedWebsitesUrl);
                setPublishedWebsites(response.data.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false)
            }
        };

        fetchPublishedWebsites();
    }, []);

    if (loading) {
        return <CMSLoader />
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl">Published Websites</h2>
            </div>

            <div className="flex gap-8 flex-wrap">
                {
                    publishedWebsites.length > 0
                        ?
                        publishedWebsites.map((publishedWebsite) => <WebsiteCard publishedWebsite={publishedWebsite} key={publishedWebsite.website._id} />)
                        :
                        <div>No websites have been published yet.</div>
                }
            </div>
        </div>
    )
}

export default ManagePublishedWebsites
