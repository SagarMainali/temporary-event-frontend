import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { fetchEventUrl } from '@/config/urls';
import axios from "@/axiosConfig";

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(fetchEventUrl(eventId));
        setEvent(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event data", error);
      }
    };

    fetchEvent();
  }, []);

  console.log(event)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-gray-600" size={40} />
      </div>
    );
  }

  const handleCreateWebsite = () => {
    navigate(`select-website-template`);
  };

  const handleEditWebsite = (websiteId) => {
    navigate(`/website/edit/${websiteId}`);
  };

  return (
    <div className="container mx-auto p-8">
      <Card className="bg-white rounded-xl shadow-xl overflow-hidden p-6 mb-8">
        <CardHeader>
          <h2 className="text-3xl font-semibold text-gray-800">{event.eventName}</h2>
          <p className="text-sm text-gray-600 mt-2">{event.description}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 font-medium">Location</p>
              <p className="text-sm text-gray-800">{event.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Date</p>
              <p className="text-sm text-gray-800">{new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Time</p>
              <p className="text-sm text-gray-800">{event.time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Expected Attendees</p>
              <p className="text-sm text-gray-800">{event.expectedNumberOfPeople}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Contact</p>
              <p className="text-sm text-gray-800">{event.phone} | {event.email}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 font-medium">Status</p>
            <p className={`text-sm font-semibold ${event.status === 'Completed' ? 'text-green-600' : event.status === 'Failed' ? 'text-red-500' : 'text-blue-600'}`}>
              {event.status.toUpperCase()}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          {
            event.website
              ? <Button onClick={() => handleEditWebsite(event.website._id)} className="bg-blue-600 text-white hover:bg-blue-700 transition-all">
                Edit Website
              </Button>
              : <Button onClick={handleCreateWebsite} className="bg-blue-600 text-white hover:bg-blue-700 transition-all">
                Create Website
              </Button>
          }
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventDetail;
