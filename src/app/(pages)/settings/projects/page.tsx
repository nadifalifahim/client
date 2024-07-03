"use client";
import CreateNewCard from "@/components/Cards/createNew/createNew";
import ProjectCards from "@/components/Cards/projectCards/projectCards";
import Topbar from "@/components/Topbar/topbar";
import NavigationMenu from "@/components/navigationMenu/navigationMenu";
import { Settings } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

const ProjectsPage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/portal/projects`
        );
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };
    console.log(cards);
    fetchCards();
  }, []);

  return (
    <div className="flex w-screen bg-slate-50 dark:bg-slate-900 transition-all duration-200 ease-in delay-100">
      <NavigationMenu />
      <div className="flex flex-col w-full ">
        <Topbar icon={Settings} pageName="Manage Projects" />
        <div className="flex pl-10 gap-4 flex-wrap ">
          <CreateNewCard></CreateNewCard>
          {cards.map((card, index) => (
            <ProjectCards key={index} data={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
