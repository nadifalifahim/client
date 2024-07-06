"use client";
import withAuth from "@/components/Authentication/withAuth";
import { SettingsCard } from "@/components/Settings/settingCard/settingsCard";
import Topbar from "@/components/Topbar/topbar";
import NavigationMenu from "@/components/navigationMenu/navigationMenu";
import { User2, Users, Ticket, Tag, Settings } from "lucide-react";

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
      <div className="flex flex-col w-full items-center ">
        <Topbar icon={Settings} pageName="Configuration" />
        <div className="flex w-full h-full justify-center items-center gap-6 flex-wrap">
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
