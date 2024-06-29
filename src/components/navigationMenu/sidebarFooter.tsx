import { LogOut } from "lucide-react";
import React from "react";
import { SidebarFooterProps } from "@/lib/types";
import Link from "next/link";

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isExpanded }) => {
  return (
    <div className="mt-auto mb-12 mx-2">
      <ul
        className={`flex transition-all duration-300 ease-in-out ${
          isExpanded ? "items-start" : "items-center"
        }`}
      >
        <li className="w-full ">
          <Link
            href="/login"
            className="flex w-full items-center py-3 px-4 rounded-lg hover:bg-slate-100 hover:text-sky-500 dark:hover:bg-slate-800"
          >
            <span
              className={`flex-shrink-0 transition-all duration-300 ease-in-out mr-3`}
            >
              <LogOut className="w-4 h-4"></LogOut>
            </span>
            <span
              className={`transition-opacity font-medium duration-300 ease-in-out ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: isExpanded ? "0.2s" : "0s" }}
            >
              Logout
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarFooter;
