import React from "react";
import { useLocation } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { sidebarSections } from "@/lib/sidebar-config";

export function DynamicBreadCrumb() {
    const location = useLocation();
    const currentPath = location.pathname;

    let currentItem = null;
    let currentSection = null;

    for (const section of sidebarSections) {
        const match = section.items.find((item) => currentPath.includes(item.href));
        if (match) {
            currentItem = match;
            currentSection = section.title;
            break;
        }
    }

    if (!currentItem || !currentSection) return null;

    return (
        <Breadcrumb>
            <BreadcrumbList className="flex flex-wrap items-center gap-1 text-sm">
                <BreadcrumbItem>
                    <span className="text-muted-foreground font-medium">
                        {currentSection}
                    </span>
                </BreadcrumbItem>

                <BreadcrumbSeparator className="hidden md:block" />

                <BreadcrumbItem>
                    <BreadcrumbPage className="font-medium">
                        {currentItem.label}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}