"use client";

import DarkModeSwitch from "@/components/Buttons/darkModeSwitch/darkModeSwitch";
import SearchTickets from "@/components/Buttons/searchTickets/searchTickets";
import TicketsTable from "@/components/Tables/ticketsTable/ticketsTable";
import NavigationMenu from "@/components/navigationMenu/navigationMenu";
import NotificationBell from "@/components/notificationBell/notificationBell";
import { useState } from "react";

export default function Home() {
  const [notificationCount, setNotificationCount] = useState(5);
  return (
    <div className="flex w-screen bg-slate-50 dark:bg-slate-900 transition-all duration-200 ease-in delay-100">
      <NavigationMenu />
      <div className="grow mx-10 mt-4">
        <div className="flex items-center justify-between">
          <span className="font-bold text-2xl"># Dexter Telegram</span>

          <SearchTickets></SearchTickets>
          <div className="flex items-center gap-1">
            <NotificationBell></NotificationBell>
            <DarkModeSwitch></DarkModeSwitch>
          </div>
        </div>
        <TicketsTable></TicketsTable>
      </div>
    </div>
  );
}
