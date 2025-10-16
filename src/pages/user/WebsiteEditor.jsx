import { getWebsiteUrl } from '@/config/urls';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "@/axiosConfig";
import PhotographyClass from '@/templates/photographyClass/PhotographyClass';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WebsiteEditor() {
  const { websiteId } = useParams();
  const [website, setWebsite] = useState();
  console.log("🚀 ~ WebsiteEditor ~ website:", website);

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const response = await axios.get(getWebsiteUrl(websiteId));
        setWebsite(response.data.data);
      } catch (error) {
        console.error("Error fetching website", error);
      }
    };

    fetchWebsite();
  }, []);

  if (!website) return (
    <div className="flex justify-center items-center h-screen" >
      <Loader2 className="animate-spin text-gray-600" size={40} />
    </div>
  )

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button
          onClick={() => console.log('Button action')}
        >
          Save All
        </Button>
      </div>

      {/* Template rendering */}
      {(() => {
        switch (website.baseTemplate.templateName) {
          case 'Photography Class':
            return <PhotographyClass data={website} />;
          default:
            return <div>Website not found</div>;
        }
      })()}
    </div>
  );

}
