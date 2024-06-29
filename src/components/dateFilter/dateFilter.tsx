"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { Dispatch, useState } from "react";

interface DatePickerProps {
  className?: React.HTMLAttributes<HTMLDivElement>;
  date: DateRange | undefined;
  setDate: Dispatch<React.SetStateAction<DateRange | undefined>>;
}

const DateFilter = () => {
  const [date, setDate] = useState<DateRange>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start items-center text-left font-medium text-xs",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 mb-0.5 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Filter by date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          initialFocus
          numberOfMonths={1}
          disabled={{
            after: new Date(),
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateFilter;
