import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Routes, Route } from "react-router-dom";
import ManageEvent from "./components/ManageEvent";
import ManageWebsites from "./components/ManageWebsite";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Manage
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Events</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<h3 >*Dashboard Contents*</h3>} />
            <Route path="events" element={<ManageEvent />} />
            <Route path="websites" element={<ManageWebsites />} />
            <Route path="emails" element={<h3>*To TRACK EMAILS HERE*</h3>} />
            <Route path="profile" element={<h3>*TO MANAGE PROFILE HERE*</h3>} />
            <Route path="settings" element={<h3>*To HANDLE SETTINGS HERE*</h3>} />
          </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
