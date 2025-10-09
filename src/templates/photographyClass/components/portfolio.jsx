import React from "react";
import LogoInstagram from "../assets/svgicons/instagram.svg?react";
import LogoPinterest from "../assets/svgicons/pinterest.svg?react";
import LogoWebsite from "../assets/svgicons/website.svg?react";
import LogoYoutube from "../assets/svgicons/youtube.svg?react";

const portfolioDetail = [
  {
    section: "Portfolio",
    title: "Take a glimpse into my Work",
    digitalMarketing: [
      {
        id: 0,
        dLogo: LogoWebsite,
        dTitle: "Website",
        dLink: "portfoliowebM.com",
        userName:"portfoliowebM.com",
      },
      {
        id: 1,
        dLogo: LogoInstagram,
        dTitle: "Instagram",
        dLink: "https://www.instagram.com",
        userName:"@placeholdernyc",

      },
      {
        id: 2,
        dLogo: LogoPinterest,
        dTitle: "Pinterest",
        dLink: "https://www.pinterest.com",
        userName:"@Secretstar2028",
      },
      {
        id: 3,
        dLogo: LogoYoutube,
        dTitle: "YouTube",
        dLink: "https://www.youtube.com",
        userName:"@photrographerProfile",
      },
    ],
  },
];

const Portfolio = () => {
  return (
    <div className="text-center items-center mb-40">
      {portfolioDetail.map((folio, index) => (
        <div key={index}>
          {/* Section title */}
          <div className="flex items-center justify-center gap-2 text-center">
            <p className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]"></p>
            <p className="text-sm font-medium">{folio.section}</p>
          </div>

          <h2 className="mb-14 text-2xl font-bold">{folio.title}</h2>

          {/* Portfolio items */}
          <div className="flex justify-center flex-wrap gap-8">
            {folio.digitalMarketing.map((item) => {
              const LogoComponent = item.dLogo;
              return (
                <a
                  key={item.id}
                  href={item.dLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.userName}

                >
                  {/*  Add `group` here so that children can use `group-hover:` */}
                  <div className="group flex gap-2 items-center px-4 py-2 rounded-4xl border border-[var(--color-secondary)] hover:border-[var(--color-primary)] hover:shadow-md transition">
                    
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <LogoComponent
                        className="w-10 h-10 
                                   text-[var(--color-secondary)] fill-[var(--color-secondary)] 
                                   group-hover:fill-[var(--color-primary)] 
                                   transition"
                      />
                    </div>

                    {/* Text */}
                    <div className="text-left">
                      <p style={{fontSize:"12px",fontWeight:"bold"}} className="text-xs font-bold text-[var(--text-primary)]">{item.dTitle}</p>
                      <p className="text-[var(--text-primary)]">
                        {item.userName}
                      </p>
                    </div>
                  </div>
                  
                </a>




              );


            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
