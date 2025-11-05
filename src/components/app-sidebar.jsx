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

export function AppSidebar({
  ...props
}) {

  const location = useLocation();
  const { logout } = useLogin();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h3 className="p-3">EMS</h3>
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
        <Button className="mt-auto mb-2 mx-3" onClick={() => logout()}>Logout</Button>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
