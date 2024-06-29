"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const DarkModeSwitch = () => {
  const { setTheme } = useTheme();
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Initialize darkMode state from localStorage
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme === "dark";
    }
    return false;
  });

  // Check localStorage for the theme setting when the component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
      setTheme(savedTheme);
    }
  }, [setTheme]);

  // Update theme and localStorage whenever darkMode changes
  useEffect(() => {
    const newTheme = darkMode ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }, [darkMode, setTheme]);

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      >
        {darkMode ? (
          <Moon className=" h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        ) : (
          <Sun className=" h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        )}

        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};

export default DarkModeSwitch;
