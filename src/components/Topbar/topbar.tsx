import dynamic from "next/dynamic";
import { FC } from "react";
import { LucideIcon } from "lucide-react";
import NotificationBell from "../notificationBell/notificationBell";
import DarkModeSwitch from "../Buttons/darkModeSwitch/darkModeSwitch";

interface TopbarProps {
  icon: LucideIcon;
  pageName: string;
}

const Topbar: FC<TopbarProps> = ({ icon: Icon, pageName }) => {
  return (
    <div className="flex w-full items-center min-h-[70px] justify-between px-10">
      <h1 className="font-bold text-2xl flex items-center gap-2 dark:text-slate-300">
        <Icon /> {pageName}
      </h1>
      <div className="flex items-center gap-1">
        <NotificationBell />
        <DarkModeSwitch />
      </div>
    </div>
  );
};

export default Topbar;
