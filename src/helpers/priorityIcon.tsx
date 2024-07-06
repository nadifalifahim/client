import React from "react";
import { Flame, Waves, Leaf } from "lucide-react";

export const getPriorityIcon = (status: String) => {
  switch (status) {
    case "high":
      return (
        <div className="flex h-full justify-center">
          <div className="flex gap-2 pl-3 pr-4 py-1 items-center bg-rose-500 rounded-full text-xs text-white">
            <Flame className="h-4 w-4" /> High
          </div>
        </div>
      );
    case "medium":
      return (
        <div className="flex h-full justify-center">
          <div className="flex gap-2 px-4 py-1 items-center bg-orange-500 rounded-full text-xs text-white">
            <Waves className="h-4 w-4" /> Medium
          </div>
        </div>
      );
    case "low":
      return (
        <div className="flex h-full justify-center">
          <div className="flex gap-2 px-4 py-1 items-center bg-background dark:bg-slate-800 rounded-full text-xs text-slate-700 dark:text-slate-100 border">
            <Leaf className="h-4 w-4" /> Low
          </div>
        </div>
      );
    default:
      return null;
  }
};
