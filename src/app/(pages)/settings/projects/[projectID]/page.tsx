"use client";

import withAuth from "@/components/Authentication/withAuth";
import { usePathname } from "next/navigation";
import DarkModeSwitch from "@/components/Buttons/darkModeSwitch/darkModeSwitch";
import SearchTickets from "@/components/Buttons/searchTickets/searchTickets";
import TicketsTable from "@/components/Tables/ticketsTable/ticketsTable";
import NavigationMenu from "@/components/navigationMenu/navigationMenu";
import NotificationBell from "@/components/notificationBell/notificationBell";
import { useRouter } from "next/navigation";
import ProjectUpdateCard from "@/components/Settings/projectUpdateCard/projectUpdateCard";
import { useEffect, useState } from "react";

interface ProjectData {
  project_id: string;
  project_name: string;
  project_description: string;
  project_status: string;
  created_at: string; // Dates as strings
  updated_at: string;
}

const ProjectDetailsPage = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").pop()?.split("-");
  const projId = pathParts ? pathParts[0] : " ";
  const [projectData, setProjectData] = useState<ProjectData | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(`/api/projects/${projId}`);
        if (response.ok) {
          const data: ProjectData = await response.json();
          setProjectData(data);
        } else {
          throw new Error("Failed to fetch project data");
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, [projId]);

  return (
    <div className="flex w-screen bg-slate-50 dark:bg-slate-900 transition-all duration-200 ease-in delay-100">
      <NavigationMenu />
      <div className="grow mx-10 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-2xl"> Manage Projects</span>
          </div>

          <div className="flex items-center gap-1">
            <NotificationBell></NotificationBell>
            <DarkModeSwitch></DarkModeSwitch>
          </div>
        </div>
        {projectData ? (
          <ProjectUpdateCard projectData={projectData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
