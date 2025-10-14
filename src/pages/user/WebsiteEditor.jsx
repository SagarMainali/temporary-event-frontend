import { getWebsiteUrl } from '@/config/urls';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "@/axiosConfig";
import PhotographyClass from '@/templates/photographyClass/PhotographyClass';
import { Loader2 } from 'lucide-react';

export default function WebsiteEditor() {
  const { websiteId } = useParams();
  const [website, setWebsite] = useState();
  console.log("🚀 ~ WebsiteEditor ~ website:", website)

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

  switch (website.baseTemplate.templateName) {
    case 'Photography Class':
      return <PhotographyClass sections={website.sections} />;
    // future cases for other templates
    default:
      return <div>Template not found</div>;
  }
}
