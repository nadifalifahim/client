import TableConfiguration from "./tableConfiguration";
import ReportForm from "@/components/Buttons/reportButton/reportForm";
import ExportToExcel from "@/components/Buttons/exportToExcel/exportToExcel";
import DateFilter from "@/components/dateFilter/dateFilter";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const TicketsTable = () => {
  const [statusFilterItem, setStatusFilterItem] = useState("all");

  return (
    <div className="rounded-lg bg-white dark:bg-slate-700 mt-4">
      <div className="flex items-center mt-2 justify-between mx-4 py-4">
        <DateFilter></DateFilter>
        <div className="">
          <Button
            variant="ghost"
            className={`text-xs text-slate-600 dark:text-slate-400 hover:text-sky-400 hover:bg-background rounded-lg min-w-[130px] py-2 ${
              statusFilterItem === "all"
                ? "text-sky-400 dark:text-sky-400 border-2 border-sky-300"
                : "bg-white dark:bg-slate-700 shadow-none"
            }`}
            onClick={() => setStatusFilterItem("all")}
          >
            All (20)
          </Button>
          <Button
            variant="ghost"
            className={`text-xs text-slate-600 dark:text-slate-400 hover:text-sky-400 hover:bg-background rounded-lg min-w-[130px] py-2 ${
              statusFilterItem === "open"
                ? "text-sky-400 dark:text-sky-400 border-2 border-sky-300"
                : "bg-white dark:bg-slate-700 shadow-none"
            }`}
            onClick={() => setStatusFilterItem("open")}
          >
            Open (10)
          </Button>
          <Button
            variant="ghost"
            className={`text-xs text-slate-600 dark:text-slate-400 hover:text-sky-400 hover:bg-background rounded-lg min-w-[130px] py-2 ${
              statusFilterItem === "in progress"
                ? "text-sky-400 dark:text-sky-400 border-2 border-sky-300"
                : "bg-white dark:bg-slate-700 shadow-none"
            }`}
            onClick={() => setStatusFilterItem("in progress")}
          >
            In Progress (5)
          </Button>
          <Button
            variant="ghost"
            className={`text-xs text-slate-600 dark:text-slate-400 hover:text-sky-400 hover:bg-background rounded-lg min-w-[130px] py-2 ${
              statusFilterItem === "closed"
                ? "text-sky-400 dark:text-sky-400 border-2 border-sky-300"
                : "bg-white dark:bg-slate-700 shadow-none"
            }`}
            onClick={() => setStatusFilterItem("closed")}
          >
            Closed (5)
          </Button>
        </div>

        <div className="flex items-center  gap-2">
          <ReportForm />
          <ExportToExcel></ExportToExcel>
        </div>
      </div>

      <TableConfiguration />
    </div>
  );
};

export default TicketsTable;
