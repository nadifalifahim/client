import React from "react";
import { SidebarHeaderProps } from "@/lib/types";
import { ChevronLeft, Menu, Ticket } from "lucide-react";

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isExpanded,
  toggleSidebar,
}) => {
  return (
    <div
      className={`flex items-center ${
        isExpanded ? "justify-between mx-4" : "justify-center "
      }`}
    >
      {" "}
      <div
        className={`transition-all duration-300 delay-100 ease-in ${
          isExpanded ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
        }`}
      >
        {isExpanded && (
          <h1 className="font-bold text-xl flex items-center gap-2 text-sky-400 dark:text-sky-400">
            <Ticket className="w-5 h-5"></Ticket>Chatbubble.io
          </h1>
        )}
      </div>
      <button
        className={`bg-slate-100 dark:bg-slate-900 rounded-full p-2  transition-all duration-300 ease-in ${
          isExpanded ? "place-self-end" : "place-self-center"
        }`}
        onClick={toggleSidebar}
      >
        {isExpanded ? (
          <ChevronLeft className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default SidebarHeader;
