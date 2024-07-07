"use client";

import withAuth from "@/components/Authentication/withAuth";
import { usePathname } from "next/navigation";
import DarkModeSwitch from "@/components/Buttons/darkModeSwitch/darkModeSwitch";
import SearchTickets from "@/components/Buttons/searchTickets/searchTickets";
import TicketsTable from "@/components/Tables/ticketsTable/ticketsTable";
import NavigationMenu from "@/components/navigationMenu/navigationMenu";
import NotificationBell from "@/components/notificationBell/notificationBell";
import { useRouter } from "next/navigation";

const Projects = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").pop()?.split("-");
  const projId = pathParts ? pathParts[0] : " ";
  const projectName = pathParts ? pathParts[1] : " ";

  return (
    <div className="flex w-screen bg-slate-50 dark:bg-slate-900 transition-all duration-200 ease-in delay-100">
      <NavigationMenu />
      <div className="grow mx-10 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-2xl"># {projectName}</span>
            <span className="text-sm font-medium">
              {" "}
              (ID: {projId.toUpperCase()})
            </span>
          </div>
          <SearchTickets></SearchTickets>
          <div className="flex items-center gap-1">
            <NotificationBell></NotificationBell>
            <DarkModeSwitch></DarkModeSwitch>
          </div>
        </div>
        <TicketsTable projId={projId}></TicketsTable>
      </div>
    </div>
  );
};

export default Projects;
