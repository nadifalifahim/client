"use client";
import DarkModeSwitch from "@/components/Buttons/darkModeSwitch/darkModeSwitch";
import { SettingsCard } from "@/components/Settings/settingCard/settingsCard";
import NavigationMenu from "@/components/navigationMenu/navigationMenu";
import NotificationBell from "@/components/notificationBell/notificationBell";
import { User2, Users, Ticket, Tag, Settings } from "lucide-react";
import { useState } from "react";

const SettingsPage = () => {
  const settingsItems = [
    { label: "Manage Account", link: "/settings/profile", Icon: User2 },
    { label: "Manage Teams", link: "/settings/teams", Icon: Users },
    { label: "Manage Projects", link: "/settings/projects", Icon: Ticket },
    { label: "Manage Categories", link: "/settings/categories", Icon: Tag },
    {
      label: "Manage Preferences",
      link: "/settings/preferences",
      Icon: Settings,
    },
  ];

  return (
    <div className="flex w-screen bg-slate-50 dark:bg-slate-900 transition-all duration-200 ease-in delay-100">
      <NavigationMenu />
      <div className="flex flex-col  w-full items-center ">
        <div className="flex w-full items-center min-h-[70px] justify-between px-10">
          <h1 className="font-bold text-2xl flex items-center gap-2">
            <Settings></Settings> Configuration
          </h1>
          <div className="flex items-center gap-1">
            <NotificationBell></NotificationBell>
            <DarkModeSwitch></DarkModeSwitch>
          </div>
        </div>
        <div className="flex w-full h-full justify-center items-center gap-6">
          {settingsItems.map((item, index) => (
            <SettingsCard
              key={index}
              label={item.label}
              link={item.link}
              Icon={item.Icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
