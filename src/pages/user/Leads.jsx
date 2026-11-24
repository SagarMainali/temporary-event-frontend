import axios from "@/axiosConfig"
import CMSLoader from "@/components/loaders/CMSLoader";
import { getSubmissionsUrl } from "@/config/urls";
import { formatDate } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function Leads() {
    const [submissions, setSubmissions] = useState([]);
    console.log("🚀🚀🚀 ~ Leads ~ submissions:", submissions)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
            setLoading(true);

            try {
                const response = await axios.get(getSubmissionsUrl);
                setSubmissions(response.data.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false)
            }
        };

        fetchSubmissions();
    }, []);

    // Helper for status badge colors
    const getStatusBadge = (status) => {
        switch (status) {
            case "sent":
                return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "failed":
                return "bg-rose-100 text-rose-700 border-rose-200";
            default:
                return "bg-amber-100 text-amber-700 border-amber-200";
        }
    };

    if (loading) {
        // return <div className="p-6 text-gray-500">Loading submissions...</div>;
        return <CMSLoader />
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Form Submissions</h2>
                <span className="text-sm text-gray-500">Total: {submissions.length}</span>
            </div>

            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                            <th className="py-3.5 px-4">Site</th>
                            <th className="py-3.5 px-4">Full Name</th>
                            <th className="py-3.5 px-4">Message</th>
                            <th className="py-3.5 px-4">Email</th>
                            <th className="py-3.5 px-4">Contact</th>
                            <th className="py-3.5 px-4">📧 Status</th>
                            <th className="py-3.5 px-4">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                        {submissions.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="py-8 text-center text-gray-400">
                                    No submissions yet
                                </td>
                            </tr>
                        ) : (
                            submissions.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-3.5 px-4 font-medium text-gray-900">
                                        {item.subdomain}
                                    </td>
                                    <td className="py-3.5 px-4 text-gray-600 capitalize">
                                        {item.firstname + ' ' + item.lastname}
                                    </td>
                                    <td className="py-3.5 px-4 max-w-xs truncate text-gray-600" title={item.message}>
                                        {item.description || "—"}
                                    </td>
                                    <td className="py-3.5 px-4 text-gray-600">
                                        {item.visitorEmail}
                                    </td>
                                    <td className="py-3.5 px-4 text-gray-600">
                                        {item.phone}
                                    </td>
                                    <td className="py-3.5 px-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${getStatusBadge(
                                                item.emailStatus
                                            )}`}
                                            title={item.emailError || ""}
                                        >
                                            {item.emailStatus}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                                        {/* {new Date(item.createdAt).toLocaleDateString()} */}
                                        {formatDate(item.createdAt)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}