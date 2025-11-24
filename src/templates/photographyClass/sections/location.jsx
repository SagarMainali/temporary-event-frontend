import React from 'react';
import Modal from '@/pages/user/components/Modal';
import { Button } from '@/components/ui/button';
import { Pen } from 'lucide-react';
import LocationDetailsEditor from './editorForms/LocationDetailsEditor';

const Location = ({ editable, section, onUpdateSection }) => {
  console.log("🚀 ~ Location ~ section:", section)

  const { title, images, googleMapLink } = section.content;

  return (
    <div className="location mt-[100px] relative">

      {
        editable &&
        <Modal
          triggerer={
            <Button className="flex absolute right-0">
              <Pen size={16} />
            </Button>
          }
          title="Landing Page"
          description="Edit landing page contents"
          content={<LocationDetailsEditor section={section} onUpdateSection={onUpdateSection} />}
        />
      }

      {/* Heading */}
      <h2 className="mb-8">
        {title}
      </h2>

      {/* Location Cards */}
      <div
        className="bg-[var(--color-bglocation)] px-14 max-sm:px-6 max-lg:px-6 pt-14 max-sm:pt-6 max-lg:pt-6 pb-10 max-sm:pb-4 max-lg:pb-4 rounded-4xl border border-[var(--color-primary)] mb-25 max-[500px]:px-2 max-[500px]:pt-2 max-[500px]:pb-2 "
      >
        <img
          src={images[0]}
          alt="Location"
          className="w-full object-cover rounded-4xl mb-10 max-sm:mb-4 max-lg:mb-4 max-h-[600px]"
        />

        <div className="flex justify-between items-start">
          <p className="italic font-bold max-[500px]:text-xs">
            Event Banquet, PatanDhoka, Lalitpur
          </p>

          <a
            href={googleMapLink}
            className="font-bold hover:underline max-[500px]:text-xs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Google Map
          </a>
        </div>
      </div>
    </div>
  );
};

export default Location;
