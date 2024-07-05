"use client";

import { LogOut } from "lucide-react";
import React from "react";
import { SidebarFooterProps } from "@/lib/types";
import Link from "next/link";
import { Button } from "../ui/button";
import axios from "axios";

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isExpanded }) => {
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("full_name");

    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/sign-out`,
        {},
        {
          withCredentials: true,
        }
      )
      .then(() => {
        window.location.href = "/login"; // Redirect to the login page after sign-out
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="mt-auto mb-12 mx-2">
      <ul
        className={`flex transition-all duration-300 ease-in-out ${
          isExpanded ? "items-start" : "items-center"
        }`}
      >
        <li className="w-full">
          <Button
            variant="ghost"
            className="flex py-8  w-full items-center justify-start px-4 rounded-lg hover:bg-slate-100 hover:text-sky-500 dark:hover:bg-slate-800"
            onClick={handleLogout}
          >
            <span
              className={`flex-shrink-0 transition-all duration-300 ease-in-out mr-3`}
            >
              <LogOut className="w-4 h-4" />
            </span>
            <span
              className={`transition-opacity font-medium duration-300 ease-in-out ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: isExpanded ? "0.2s" : "0s" }}
            >
              Logout
            </span>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarFooter;
