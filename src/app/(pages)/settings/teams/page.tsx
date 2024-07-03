"use client";
import Topbar from "@/components/Topbar/topbar";
import NavigationMenu from "@/components/navigationMenu/navigationMenu";
import { Settings } from "lucide-react";

const TeamsPage = () => {
  return (
    <div className="flex w-screen bg-slate-50 dark:bg-slate-900 transition-all duration-200 ease-in delay-100">
      <NavigationMenu />
      <div className="flex flex-col  w-full items-center ">
        <Topbar icon={Settings} pageName="Manage Teams" />
      </div>
    </div>
  );
};

export default TeamsPage;
