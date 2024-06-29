import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { SidebarLinksProps } from "@/lib/types";
import {
  BarChartBig,
  ChevronDown,
  ChevronUp,
  Settings,
  Zap,
} from "lucide-react";

import { NavItem } from "@/lib/types";
import { usePathname } from "next/navigation";

const SidebarLinks: React.FC<SidebarLinksProps> = ({ isExpanded }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const currentPath = usePathname();

  const navItems: NavItem[] = [
    {
      icon: BarChartBig,
      label: "Overview",
      link: "/dashboard",
      subMenu: [
        // { label: "Overview", link: "/dashboard/overview" },
        // { label: "Reports", link: "/dashboard/reports" },
      ],
    },
    {
      icon: Zap,
      label: "Projects",
      link: "/projects",
      subMenu: [
        { label: "All Projects", link: "/projects/all" },
        { label: "Dexter Telegram", link: "/projects/my-projects" },
        { label: "Biponon Telegram", link: "/projects/archived" },
      ],
    },
    {
      icon: Settings,
      label: "Settings",
      link: "/settings",
      subMenu: [
        { label: "Manage Account", link: "/settings/profile" },
        { label: "Manage Teams", link: "/settings/teams" },
        { label: "Manage Projects", link: "/settings/projects" },
        { label: "Manage Categories", link: "/settings/categories" },
        { label: "Manage Preferences", link: "/settings/preferences" },
      ],
    },
  ];

  const handleItemClick = (label: string) => {
    setActiveItem((prev) => (prev === label ? null : label));
  };

  useEffect(() => {
    const currentNavItem = navItems.find(
      (item) =>
        currentPath === item.link ||
        (item.subMenu &&
          item.subMenu.some((subItem) => currentPath === subItem.link))
    );
    if (currentNavItem) {
      setActiveItem(currentNavItem.label);
    } else {
      setActiveItem(null);
    }
  }, [currentPath]);

  return (
    <nav className="mt-4 mx-2">
      <ul
        className={`flex flex-col gap-2 transition-all duration-300 ease-in ${
          isExpanded ? "items-start" : "items-center"
        }`}
      >
        {navItems.map(({ icon: Icon, label, link, subMenu }) => (
          <React.Fragment key={label}>
            <li
              className={`flex w-full items-center justify-between px-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-sky-500 cursor-pointer  ${
                currentPath === link ||
                (subMenu &&
                  subMenu.some((subItem) => currentPath === subItem.link))
                  ? "bg-slate-50 dark:bg-slate-700 text-sky-500"
                  : ""
              }`}
            >
              <Link href={link}>
                <span className="flex items-center w-full ">
                  <span className="flex-shrink-0 mr-3">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span
                    className={`transition-opacity py-5 duration-300 font-medium ease-in ${
                      isExpanded ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: isExpanded ? "0.2s" : "0s" }}
                  >
                    {label}
                  </span>
                </span>
              </Link>
              {subMenu.length > 0 ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className={`grow py-7 transition-opacity duration-300 ease-in hover:text-sky-500 ${
                    isExpanded ? "opacity-100" : "opacity-0"
                  } `}
                  style={{ transitionDelay: isExpanded ? "0.2s" : "0s" }}
                  onClick={() => handleItemClick(label)}
                >
                  {activeItem === label ? (
                    <ChevronUp className="ml-auto mr-2"></ChevronUp>
                  ) : (
                    <ChevronDown className="ml-auto mr-2"></ChevronDown>
                  )}
                </Button>
              ) : (
                <Link className="grow py-7" href={link}>
                  <span></span>
                </Link>
              )}
            </li>
            {activeItem === label && isExpanded && (
              <ul className="px-4 w-full flex flex-col gap-1">
                {subMenu?.map((subItem) => (
                  <Link href={subItem.link}>
                    <li
                      key={subItem.label}
                      className={`py-2 px-4 rounded-lg hover:bg-slate-100 hover:text-sky-500 font-medium dark:hover:bg-slate-800 ${
                        currentPath === subItem.link
                          ? "bg-slate-50 dark:bg-slate-700 text-sky-500"
                          : ""
                      }`}
                    >
                      <span>{subItem.label}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarLinks;
