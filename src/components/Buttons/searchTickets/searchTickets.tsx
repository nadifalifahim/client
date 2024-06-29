"use client";

import { CommandIcon, SearchIcon } from "lucide-react";
import { useState, ChangeEvent, useEffect, useRef } from "react";

const SearchTickets = () => {
  const [query, setQuery] = useState("");
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [isAltPressed, setIsAltPressed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setIsCtrlPressed(true);
      } else if (event.key.toLowerCase() === "alt") {
        setIsAltPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setIsCtrlPressed(false);
      } else if (event.key.toLowerCase() === "alt") {
        setIsAltPressed(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    // Focus the input when both Control and Fn are pressed together
    if (isCtrlPressed && isAltPressed && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCtrlPressed, isAltPressed]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // Implement your search logic here if needed
  };
  return (
    <div className="relative flex items-center ">
      <div className="relative flex items-center">
        <SearchIcon className="h-3 w-3 text-gray-500 absolute ml-2" />
        <input
          ref={inputRef}
          type="search"
          placeholder="Search Tickets"
          value={query}
          onChange={handleInputChange}
          className="min-w-[300px] font-medium pl-6 pr-4 py-2 bg-slate-100 dark:bg-slate-950 dark:border-slate-800 text-xs border-2 border-slate-100 rounded-md focus:outline-none focus:border-slate-300 dark:focus:border-slate-600 focus:shadow-md"
        />
        <div className="flex items-center absolute inset-y-0 right-0 pr-2">
          <div className="flex items-center bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 rounded-md p-1">
            <CommandIcon className="h-3 w-3 mr-1"></CommandIcon>
            <span className="text-xs">Alt</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTickets;
