"use client";
import withAuth from "@/components/Authentication/withAuth";
import NavigationMenu from "@/components/navigationMenu/navigationMenu";

const Dashboard = () => {
  return (
    <div className="flex w-screen bg-slate-50 dark:bg-slate-900 transition-all duration-200 ease-in delay-100">
      <NavigationMenu />
    </div>
  );
};

export default withAuth(Dashboard);
