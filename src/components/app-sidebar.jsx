import * as React from "react"

import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import { Button } from "./ui/button";
import { useLogin } from "@/context/authContext";
import { sidebarSections } from "@/lib/sidebar-config";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function AppSidebar({
  ...props
}) {

  const location = useLocation();
  const { logout } = useLogin();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogOut = async () => {
    setLoggingOut(true);
    await logout();
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h3 className="p-3">Evento</h3>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {sidebarSections.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-sidebar-foreground/50">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => {
                  const isActive = location.pathname.includes(subItem.href);

                  return <SidebarMenuItem key={subItem.label}>
                    <SidebarMenuButton asChild isActive={isActive} className="data-[active=true]:font-semibold">
                      <Link to={subItem.href} aria-current={isActive ? 'page' : undefined}>{subItem.label}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <Button className="mt-auto mb-2 mx-3" onClick={handleLogOut} disabled={loggingOut}>
          {
            loggingOut
              ? <span className="flex gap-2 items-center">Logging Out <Loader2 className="animate-spin text-gray-600" size={24} /></span>
              : 'Logout'
          }
        </Button>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
