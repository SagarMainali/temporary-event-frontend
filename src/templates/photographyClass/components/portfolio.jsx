import React from "react";
import LogoInstagram from "../assets/svgicons/instagram.svg?react";
import LogoPinterest from "../assets/svgicons/pinterest.svg?react";
import LogoWebsite from "../assets/svgicons/website.svg?react";
import LogoYoutube from "../assets/svgicons/youtube.svg?react";
import Modal from "@/pages/user/components/Modal";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import PortfolioEditor from "../editorForms/PortfolioEditor";

const Portfolio = ({ editable, section, onUpdateSection }) => {
  console.log("🚀 ~ Portfolio ~ section:", section)

  const { title, socials } = section.content;

  const portfolioDetail = [
    {
      section: "Portfolio",
      title: title,
      digitalMarketing: [
        {
          id: 0,
          dLogo: LogoWebsite,
          dTitle: socials[0].title,
          dLink: socials[0].link,
          userName: socials[0].username,
        },
        {
          id: 1,
          dLogo: LogoInstagram,
          dTitle: socials[1].title,
          dLink: socials[1].link,
          userName: socials[1].username,

        },
        {
          id: 2,
          dLogo: LogoPinterest,
          dTitle: socials[2].title,
          dLink: socials[2].link,
          userName: socials[2].username,
        },
        {
          id: 3,
          dLogo: LogoYoutube,
          dTitle: socials[3].title,
          dLink: socials[3].link,
          userName: socials[3].username,
        },
      ],
    },
  ];

  return (
    <div className="text-center items-center mb-40 relative">

      {editable &&
        <Modal
          triggerer={
            <Button className="flex absolute right-0">
              <Pen size={16} />
            </Button>
          }
          title="Portfolio Section"
          description="Edit portfolio section contents"
          content={<PortfolioEditor section={section} onUpdateSection={onUpdateSection} />}
        />
      }

      {portfolioDetail.map((folio, index) => (
        <div key={index}>
          {/* Section title */}
          <div className="flex items-center justify-center gap-2 text-center">
            <p className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]"></p>
            <p className="text-lg font-medium">{folio.section}</p>
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
                      <p style={{ fontSize: "12px", fontWeight: "bold" }} className="text-xs font-bold text-[var(--text-primary)]">{item.dTitle}</p>
                      <p className="text-[var(--text-primary)]">
                        {item.userName}
                      </p>
                    </div>
                  </div>

                </a>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
