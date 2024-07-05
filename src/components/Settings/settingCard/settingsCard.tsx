import Link from "next/link";
import React from "react";

interface SettingsCardProps {
  label: string;
  link: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// SettingsCard component
export const SettingsCard: React.FC<SettingsCardProps> = ({
  label,
  link,
  Icon,
}) => {
  return (
    <Link href={link}>
      <div className="text-sm hover:text-lg text-slate-400 hover:text-sky-400 flex flex-col justify-center items-center px-4 bg-white dark:bg-slate-800 h-[200px] min-w-[200px] hover:min-w-[300px] rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out text-center">
        <Icon className="mb-6 mt-2 h-7 w-7" />
        <span className="font-medium transition-all ">{label}</span>
      </div>
    </Link>
  );
};
