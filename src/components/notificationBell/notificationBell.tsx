"use client";

import { BellIcon as LucideBellIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const NotificationBell = () => {
  const [notificationCount, setNotificationCount] = useState(5);
  const [previousCount, setPreviousCount] = useState(notificationCount);
  const [isJiggling, setIsJiggling] = useState(false);

  useEffect(() => {
    if (notificationCount > previousCount) {
      setIsJiggling(true);
      setTimeout(() => setIsJiggling(false), 300); // Duration of the animation
    }
    setPreviousCount(notificationCount);
  }, [notificationCount, previousCount]);

  const isCountHigh = notificationCount >= 10;
  return (
    <Button variant="ghost" size="icon" className="flex items-center">
      <div className={`relative inline-block  ${isJiggling ? "jiggle" : ""}`}>
        <LucideBellIcon className={`h-5 w-5`} />
        {notificationCount > 0 && (
          <div
            className={`absolute bottom-2 left-2 flex items-center justify-center ${
              isCountHigh ? "h-5 w-5 text-xs" : "h-4 w-4 text-xs"
            } bg-red-500 text-white rounded-full `}
          >
            {notificationCount}
          </div>
        )}
      </div>
    </Button>
  );
};

export default NotificationBell;
