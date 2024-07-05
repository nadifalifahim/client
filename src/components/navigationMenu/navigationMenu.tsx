"use client";

import React, { useState } from "react";
import SidebarHeader from "./sidebarHeader";
import SidebarFooter from "./sidebarFooter";
import SidebarLinks from "./sidebarLinks";

const NavigationMenu = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`flex ${
        isExpanded ? "w-64" : "w-20"
      } h-screen bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-sm transition-all duration-300 ease-in`}
    >
      <div className="mt-4 relative flex flex-col w-full">
        <SidebarHeader isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <SidebarLinks isExpanded={isExpanded}></SidebarLinks>
        <SidebarFooter isExpanded={isExpanded}></SidebarFooter>
      </div>
    </div>
  );
};

export default NavigationMenu;
