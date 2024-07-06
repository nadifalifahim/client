"use client";

import withAuth from "@/components/Authentication/withAuth";
import ProjectsCreationFrom from "@/components/Settings/projectCreationForm/projectCreationForm";
import Topbar from "@/components/Topbar/topbar";
import NavigationMenu from "@/components/navigationMenu/navigationMenu";
import { Settings } from "lucide-react";

const ProjectsPage = () => {
  return (
    <div className="flex w-screen bg-slate-50 dark:bg-slate-900 transition-all duration-200 ease-in delay-100">
      <NavigationMenu />
      <div className="flex flex-col w-full">
        <Topbar icon={Settings} pageName="Create Project" />
        <ProjectsCreationFrom></ProjectsCreationFrom>
      </div>
    </div>
  );
};

export default ProjectsPage;
