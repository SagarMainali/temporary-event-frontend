import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ExternalLink, CircleCheckBig } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const TemplateCard = ({ template, isSelected, onClick }) => {
    return (
        <Card
            className={cn(
                "w-full py-0 max-w-sm rounded-xl shadow-lg overflow-hidden transform transition-all gap-0 cursor-pointer hover:scale-[1.03] hover:shadow-2xl",
                isSelected ? "border-2 border-blue-500 shadow-2xl" : "border-2 border-gray-100"
            )}
            onClick={onClick}
        >
            <CardHeader className="flex justify-between items-center p-6 bg-accent">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">{template.templateName}</h2>
                        {
                            isSelected && <CircleCheckBig className="text-blue-500 stroke-3" size={16} />
                        }

                    </div>
                    <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </div>
                <Link to="/template"><ExternalLink /></Link>
            </CardHeader>
            <CardContent className="p-6">
                <img src={template.previewImage} alt="template_preview_image" />
            </CardContent>
        </Card>
    );
};

export default TemplateCard;
