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

import { useLogin } from "@/context/authContext";

const navMain = [
  {
    title: "Home",
    url: "#",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard/",
      },
    ],
  },
  {
    title: "Manage",
    url: "#",
    items: [
      {
        title: "Events",
        url: "/dashboard/events",
      },
      {
        title: "Websites",
        url: "/dashboard/websites",
      },
    ],
  },
  {
    title: "Tracking",
    url: "#",
    items: [
      {
        title: "Emails",
        url: "/dashboard/emails",
      },
    ],
  },
  {
    title: "Account",
    url: "#",
    items: [
      {
        title: "Profile",
        url: "/dashboard/profile",
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
      },
    ],
  },
]

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
        {navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => {
                  const isActive = location.pathname === subItem.url;
                  
                  return <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={subItem.url}>{subItem.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <button className="mt-auto text-white bg-gray-500/90 mb-2 mx-3 p-2 font-semibold" onClick={() => logout()}>Logout</button>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
