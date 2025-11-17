import { getWebsiteUrl, saveWebsiteUrl, unpublishWebsiteUrl } from '@/config/urls';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from "@/axiosConfig";
import PhotographyClassEdit from '@/templates/photographyClass/components/PhotographyClassEdit';
import { Loader2, Globe, GlobeLock, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Alert from './components/Alert';
import Modal from './components/Modal';
import PublishWebsiteForm from './PublishWebsiteForm';
import { toast } from 'sonner';

export default function WebsiteEditor() {
  const { websiteId } = useParams();
  const [website, setWebsite] = useState();
  const [loading, setLoading] = useState();
  const [publishSuccessful, setPublishSuccessful] = useState(false);
  const [editedContentsPresentOnLocal, setEditedContentsPresentOnLocal] = useState(false);
  console.log("🚀 ~ WebsiteEditor ~ website:", website);

  const fetchWebsite = async () => {
    try {
      const response = await axios.get(getWebsiteUrl(websiteId));
      setWebsite(response.data.data);
    } catch (error) {
      console.error("Error fetching website", error);
    }
  };

  useEffect(() => {
    fetchWebsite();
  }, []);

  const sectionKeys = [
    'photographyClassWebsite_HeroSection',
    'photographyClassWebsite_PortfolioSection',
    'photographyClassWebsite_ScheduleSection',
    // to add more here...
  ];

  // get all sections of photographyClass website from localstorage
  const getAllWebsiteSections = () => {
    const sections = sectionKeys.map((key) => {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }).filter(Boolean); // Removes any null entries

    return sections;
  };

  // clear all sections data from localstorage
  const clearAllWebsiteSections = () => {
    sectionKeys.forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  // send the section saved in localstorage to backend and clear localstorage
  const updateWebsiteSections = async () => {
    const sections = getAllWebsiteSections();

    if (sections.length === 0) {
      toast.warning("Nothnig to save. You have not edited any section.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.patch(saveWebsiteUrl(websiteId), {
        sections
      })

      if (response.data.success) {
        console.log("Sections updated:", response.data);
        toast.success("Successfully saved changes")
        clearAllWebsiteSections(); // remove data from localstorage
        setEditedContentsPresentOnLocal(false);
        await fetchWebsite(); // fetch latest data from db
      }
    } catch (err) {
      console.error("Request error:", err);
    } finally {
      setLoading(false);
    }
  };

  // to unpublish website through alert model
  const confirmationAction = async () => {
    setLoading(true);

    try {
      const response = await axios.patch(unpublishWebsiteUrl(websiteId));
      if (response.data.success) {
        toast.success("The website has been unpublished");
        setPublishSuccessful(false);
        await fetchWebsite(); // fetch latest data from db
      }
    } catch (error) {
      toast.error("Couldn't unpublish this site at the moment. Please try again later.");
      console.log("Error in unpublishing website:", error);
    } finally {
      setLoading(false);
    }
  }

  // check if contents are saved locally
  useEffect(() => {
    const sections = getAllWebsiteSections();
    setEditedContentsPresentOnLocal(sections.length > 0);
  }, [])

  if (!website || loading) return (
    <div className="flex justify-center items-center h-screen" >
      <Loader2 className="animate-spin text-gray-600" size={40} />
    </div>
  )

  return (
    <div>
      <div className="mb-4 flex justify-center gap-2">
        {editedContentsPresentOnLocal && (
          <Button onClick={updateWebsiteSections}>
            Save All <Save />
          </Button>
        )
        }

        {website.published || publishSuccessful
          ?
          <>
            <Link to={website.url} target="_blank" rel="noopener noreferrer">
              <Button>View Published Site <Globe className='text-green-400 animate-pulse' /></Button>
            </Link>
            <Alert
              triggerer={<Button>Unpublish Site <GlobeLock className='text-red-400' /></Button>}
              title="Unpublish Website?"
              description="Your site will be removed from live along with linked subdomain. Do you want to proceed?"
              confirmationAction={confirmationAction}
            />
          </>
          :
          <>
            <Link to={`${import.meta.env.VITE_FRONTEND_BASE_URL}?appMode=website&websiteId=${websiteId}`} target="_blank" rel="noopener noreferrer">
              <Button>View Saved Site <Eye /></Button>
            </Link>
            <Modal
              triggerer={<Button>Publish Website <Globe /></Button>}
              title="Pubilsh Website"
              description="Create a suitable subdomain name for your website"
              content={<PublishWebsiteForm websiteId={websiteId} setPublishSuccessful={setPublishSuccessful} />}
            />
          </>
        }
      </div>

      {/* Template rendering */}
      {
        (() => {
          switch (website.baseTemplate.templateName) {
            case 'Photography Class':
              return <PhotographyClassEdit data={website} setEditedContentsPresentOnLocal={setEditedContentsPresentOnLocal} />;
            default:
              return <div>Website not found</div>;
          }
        })()
      }
    </div >
  );
}
