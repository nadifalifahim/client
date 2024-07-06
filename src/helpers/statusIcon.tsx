import React from "react";
import { TriangleAlert, CircleCheck, CircleDot, Glasses } from "lucide-react";

export const getStatusIcon = (status: String) => {
  switch (status) {
    case "open":
      return (
        <div className="flex h-full justify-center">
          <div className="flex gap-2 pl-3 pr-4 py-1 items-center bg-background dark:bg-slate-800 rounded-full text-xs text-orange-500 dark:text-slate-100 border border-orange-500">
            <TriangleAlert className="h-4 w-4" /> Open
          </div>
        </div>
      );
    case "in progress":
      return (
        <div className="flex h-full justify-center">
          <div className="flex gap-2 px-2 py-1 items-center bg-background dark:bg-slate-800 rounded-full text-xs text-pink-700 dark:text-slate-100 border border-pink-600">
            <Glasses className="h-4 w-4" /> In Progress
          </div>
        </div>
      );
    case "closed":
      return (
        <div className="flex h-full justify-center">
          <div className="flex gap-2 px-4 py-1 items-center bg-background dark:bg-slate-800 rounded-full text-xs text-slate-700 dark:text-slate-100 border ">
            <CircleCheck className="h-4 w-4" /> Closed
          </div>
        </div>
      );
    default:
      return null;
  }
};
