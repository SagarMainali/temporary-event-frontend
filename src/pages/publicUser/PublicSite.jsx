import { useEffect, useState } from 'react';
import { getPublicWebsiteUrl } from '@/config/urls';
import PhotographyClassView from '@/templates/photographyClass/components/PhotographyClassView'
import { Loader2 } from 'lucide-react';
import axios from "@/axiosConfig"

function PublicSite({ subdomain }) {
  console.log("🚀 ~ PublicSite ~ subdomain:", subdomain)

  const [loading, setLoading] = useState(true);

  const [website, setWebsite] = useState();

  // fetch the website data with the subdomain prop
  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const response = await axios.get(getPublicWebsiteUrl(subdomain));
        setWebsite(response.data.data);
      } catch (error) {
        console.error("Error fetching website", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsite();
  }, [])

  if (loading) return (
    <div className="flex justify-center items-center h-screen" >
      <Loader2 className="animate-spin text-gray-600" size={40} />
    </div>
  )

  if (!website) return (
    <div className="flex justify-center items-center h-screen" >
      <h2>No website found with the provided subdomain. Please recheck your subdomain or fix the URL.</h2>
    </div>
  )

  return (
    // from switch case render corresponding Template Component through website.baseTemplate.templateName and pass website data
    <PhotographyClassView data={website} />
  )
}

export default PublicSite
