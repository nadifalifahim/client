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

interface TicketsTableProps {
  projId: string;
}

// Define the type for category counts
interface CategoryCount {
  [key: string]: number;
}

// Define the type for sorted categories
interface SortedCategory {
  category_name: string;
  count: number;
}

const TicketsTable: React.FC<TicketsTableProps> = ({ projId }) => {
  const [statusFilterItem, setStatusFilterItem] = useState("all");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
  });
  const [tickets, setTickets] = useState<any[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortedCategories, setSortedCategories] = useState([]);

  useEffect(() => {
    // Fetch tickets whenever the fromDate, toDate, or statusFilterItem changes
    const fetchTickets = async () => {
      const fromDate = formatDate(date?.from);
      const toDate = formatDate(date?.to);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/portal/tickets?from=${fromDate}&to=${toDate}&projectID=${projId}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTickets(data);
        setError(null); // Clear any previous error
        console.log(tickets);
        // Step 1: Count occurrences of each category
        const categoryCount: CategoryCount = data.reduce((acc, ticket) => {
          acc[ticket.category_name] = (acc[ticket.category_name] || 0) + 1;
          return acc;
        }, {} as CategoryCount);

        // Step 2: Convert to an array and sort in descending order
        const sorted: SortedCategory[] = Object.entries(categoryCount)
          .map(([category, count]) => ({ category_name: category, count }))
          .sort((a, b) => b.count - a.count);

        setSortedCategories(sorted); // ✅ Set state
        console.log("Sorted Categories:", sorted);
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

  const [filterApplied, setFilterApplied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategoryClick = (category) => {
    if (filterApplied && selectedCategory === category) {
      // If the same category is clicked again, remove the filter
      setFilterApplied(false);
      setSelectedCategory(null);
      setFilteredTickets(tickets);
    } else {
      // Apply the filter
      setFilterApplied(true);
      setSelectedCategory(category);
      setFilteredTickets(
        tickets.filter((ticket) => ticket.category_name === category)
      );
    }
  };

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
      <div className="mx-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {sortedCategories.map(({ category_name, count }) => (
            <div
              onClick={() => handleCategoryClick(category_name)}
              key={category_name}
              className="shadow-sm rounded-lg p-6 border border-gray-200 text-center transition-transform transform hover:scale-105 hover:shadow-md"
            >
              <p className="text-5xl font-bold ">{count}</p>
              <h2 className="text-lg text-gray-500 mt-2">{category_name}s</h2>
            </div>
          ))}
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
