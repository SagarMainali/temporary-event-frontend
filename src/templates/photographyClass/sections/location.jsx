import React from 'react';
import hallroom from '../assets/images/hall.png';

const locationData = [
  {
    locationPhoto: hallroom,
    eventLocation:
      "Event Banquet, PatanDhoka, Lalitpur.",
    book: "Find on Map",
  },
];

const Location = ({ Locationhead }) => {


  return (
    <div className="location mt-[100px]">

      {/* Heading */}
      <h2 className="mb-8">
        {Locationhead}
      </h2>



      {/* Location Cards */}
      {locationData.map((location, index) => (
        <div
          className="bg-[var(--color-bglocation)] px-14 max-sm:px-6 max-lg:px-6 pt-14 max-sm:pt-6 max-lg:pt-6 pb-10 max-sm:pb-4 max-lg:pb-4 rounded-4xl border border-[var(--color-primary)] mb-25 max-[500px]:px-2 max-[500px]:pt-2 max-[500px]:pb-2 "
          key={index}
        >
          <img
            src={location.locationPhoto}
            alt="Location"
            className="w-full object-cover rounded-4xl mb-10 max-sm:mb-4 max-lg:mb-4"
          />

          <div className="flex justify-between items-start">
            <p className="italic font-bold max-[500px]:text-xs">
              {location.eventLocation}
            </p>

            <a
              href="https://www.google.com/maps/@27.7247547,85.3208659,3992m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
              className="font-bold hover:underline max-[500px]:text-xs"
              target="_blank"
              rel="noopener noreferrer"
            >
              {location.book}
            </a>



          </div>


        </div>
      ))}
    </div>
  );
};

export default Location;
