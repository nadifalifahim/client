import { useEffect, useState } from "react";
import ProjectCards from "../projectCards/projectCards";

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
    <div className="mx-auto my-auto">
      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <ProjectCards key={index} data={card} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
