"use client";

import TableConfiguration from "./tableConfiguration";
import ReportForm from "@/components/Buttons/reportButton/reportForm";
import ExportToExcel from "@/components/Buttons/exportToExcel/exportToExcel";
import DateFilter from "@/components/dateFilter/dateFilter";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

// Helper function to format Date objects to 'yyyy-mm-dd'
const formatDate = (date: Date | undefined) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const TicketsTable = () => {
  const [statusFilterItem, setStatusFilterItem] = useState("all");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
  });
  const [tickets, setTickets] = useState<any[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch tickets whenever the fromDate, toDate, or statusFilterItem changes
    const fetchTickets = async () => {
      const fromDate = formatDate(date?.from);
      const toDate = formatDate(date?.to);
      console.log(date);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/portal/tickets?from=${fromDate}&to=${toDate}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTickets(data);
        setError(null); // Clear any previous error

        // Apply the status filter
        filterTickets(data, statusFilterItem);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError("Failed to fetch tickets.");
      } finally {
      }
    };

    fetchTickets();
  }, [date?.from, date?.to, statusFilterItem]);

  const filterTickets = (tickets: any[], status: string) => {
    if (status === "all") {
      setFilteredTickets(tickets);
    } else {
      setFilteredTickets(
        tickets.filter((ticket) => ticket.ticket_status === status)
      );
    }
  };

  useEffect(() => {
    // Apply the status filter whenever statusFilterItem changes
    filterTickets(tickets, statusFilterItem);
  }, [statusFilterItem, tickets]);

  // Calculate counts
  const allCount = tickets.length;
  const openCount = tickets.filter(
    (ticket) => ticket.ticket_status === "open"
  ).length;
  const inProgressCount = tickets.filter(
    (ticket) => ticket.ticket_status === "in progress"
  ).length;
  const closedCount = tickets.filter(
    (ticket) => ticket.ticket_status === "closed"
  ).length;

  return (
    <div className="rounded-lg bg-white dark:bg-slate-700 mt-4">
      <div className="flex items-center mt-2 justify-between mx-4 py-4">
        <DateFilter
          date={date}
          setDate={setDate} // We are not using this prop
        />
        <div className="">
          <Button
            variant="ghost"
            className={`text-xs text-slate-600 dark:text-slate-400 hover:text-sky-400 hover:bg-background rounded-lg min-w-[130px] py-2 ${
              statusFilterItem === "all"
                ? "text-sky-400 dark:text-sky-400 border-2 border-sky-300"
                : "bg-white dark:bg-slate-700 shadow-none"
            }`}
            onClick={() => {
              setStatusFilterItem("all");
              filterTickets(tickets, "all");
            }}
          >
            All ({allCount})
          </Button>
          <Button
            variant="ghost"
            className={`text-xs text-slate-600 dark:text-slate-400 hover:text-sky-400 hover:bg-background rounded-lg min-w-[130px] py-2 ${
              statusFilterItem === "open"
                ? "text-sky-400 dark:text-sky-400 border-2 border-sky-300"
                : "bg-white dark:bg-slate-700 shadow-none"
            }`}
            onClick={() => {
              setStatusFilterItem("open");
              filterTickets(tickets, "open");
            }}
          >
            Open ({openCount})
          </Button>
          <Button
            variant="ghost"
            className={`text-xs text-slate-600 dark:text-slate-400 hover:text-sky-400 hover:bg-background rounded-lg min-w-[130px] py-2 ${
              statusFilterItem === "in progress"
                ? "text-sky-400 dark:text-sky-400 border-2 border-sky-300"
                : "bg-white dark:bg-slate-700 shadow-none"
            }`}
            onClick={() => {
              setStatusFilterItem("in progress");
              filterTickets(tickets, "in progress");
            }}
          >
            In Progress ({inProgressCount})
          </Button>
          <Button
            variant="ghost"
            className={`text-xs text-slate-600 dark:text-slate-400 hover:text-sky-400 hover:bg-background rounded-lg min-w-[130px] py-2 ${
              statusFilterItem === "closed"
                ? "text-sky-400 dark:text-sky-400 border-2 border-sky-300"
                : "bg-white dark:bg-slate-700 shadow-none"
            }`}
            onClick={() => {
              setStatusFilterItem("closed");
              filterTickets(tickets, "closed");
            }}
          >
            Closed ({closedCount})
          </Button>
        </div>

        <div className="flex items-center  gap-2">
          <ReportForm />
          <ExportToExcel data={filteredTickets} date={date}></ExportToExcel>
        </div>
      </div>

      <TableConfiguration
        tickets={filteredTickets}
        error={error}
        loading={loading}
      />
    </div>
  );
};

export default TicketsTable;
