import { useEffect, useState } from "react";
import CreateNewCard from "@/components/Cards/createNew/createNew";
import ProjectCards from "@/components/Cards/projectCards/projectCards";

const ProjectsList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/portal/projects`
        );
        const data = await response.json();
        console.log(data);
        setCards(data);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };
    console.log(cards);
    fetchCards();
  }, []);

  return (
    <div className="flex pl-10 gap-4 flex-wrap ">
      <CreateNewCard></CreateNewCard>
      {cards.map((card, index) => (
        <ProjectCards key={index} data={card} />
      ))}
    </div>
  );
};

export default ProjectsList;
