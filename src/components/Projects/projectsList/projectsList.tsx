import { useEffect, useState } from "react";
import ProjectCards from "../projectCards/projectCards";

interface ProjectCard {
  project_id: string;
  project_name: string;
  project_status: "active" | "inactive"; // Assuming project_status can be 'active' or 'inactive'
  project_description: string;
  created_at: Date;
  updated_at: Date;
}

const ProjectsList = () => {
  const [cards, setCards] = useState<ProjectCard[]>([]);

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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {cards
          .filter((item) => item.project_status === "active")
          .map((card, index) => (
            <ProjectCards key={index} data={card} />
          ))}
      </div>
    </div>
  );
};

export default ProjectsList;
