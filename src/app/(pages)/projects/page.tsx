"use client";

import withAuth from "@/components/Authentication/withAuth";
import DarkModeSwitch from "@/components/Buttons/darkModeSwitch/darkModeSwitch";
import SearchTickets from "@/components/Buttons/searchTickets/searchTickets";
import NavigationMenu from "@/components/navigationMenu/navigationMenu";
import NotificationBell from "@/components/notificationBell/notificationBell";
import ProjectsList from "@/components/Projects/projectsList/projectsList";

const Projects = () => {
  return (
    <div className="flex w-screen bg-slate-50 dark:bg-slate-900 transition-all duration-200 ease-in delay-100">
      <NavigationMenu />
      <div className="grow mx-10 mt-4">
        <div className="flex items-center justify-between">
          <span className="font-bold text-2xl"># Projects</span>

          <SearchTickets></SearchTickets>
          <div className="flex items-center gap-1">
            <NotificationBell></NotificationBell>
            <DarkModeSwitch></DarkModeSwitch>
          </div>
        </div>
        <div className="mt-10">
          <ProjectsList></ProjectsList>
        </div>
      </div>
    </div>
  );
};

export default Projects;
