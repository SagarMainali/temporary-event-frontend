import React from "react";
import Modal from "@/pages/user/components/Modal";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import PortfolioEditor from "./editorForms/PortfolioEditor";

const Portfolio = ({ editable, section, onUpdateSection }) => {
  console.log("🚀 ~ Portfolio ~ section:", section)

  const { title, socials } = section.content;

  return (
    <div className="text-center items-center mb-40 relative">

      {
        editable &&
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

      <div>
        {/* Section title */}
        <div className="flex items-center justify-center gap-2 text-center">
          <p className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]"></p>
          <p className="text-lg font-medium">Portfolio</p>
        </div>

        <h2 className="mb-14 text-2xl font-bold">{title}</h2>

        {/* Portfolio items */}
        <div className="flex justify-center flex-wrap gap-8">
          {socials.map((item, index) => {
            return (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                title={item.username}
              >
                {/*  Add `group` here so that children can use `group-hover:` */}
                <div className="group flex gap-2 items-center px-4 py-2 rounded-4xl border border-[var(--color-secondary)] hover:border-[var(--color-primary)] hover:shadow-md transition">

                  {/* Text */}
                  <div className="text-left">
                    <p style={{ fontSize: "12px", fontWeight: "bold" }} className="text-xs font-bold text-[var(--text-primary)]">{item.title}</p>
                    <p className="text-[var(--text-primary)]">
                      @{item.username}
                    </p>
                  </div>
                </div>

              </a>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
