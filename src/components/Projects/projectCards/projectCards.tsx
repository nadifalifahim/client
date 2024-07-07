import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Folder } from "lucide-react";

interface CardData {
  project_id: string;
  project_name: string;
  project_description: string;
  created_at: Date;
  updated_at: Date;
}

interface ProjectCardProps {
  data: CardData;
}
const ProjectCards: FC<ProjectCardProps> = ({ data }) => {
  return (
    <Link
      href={`/projects/${data.project_id.toLocaleLowerCase()}-${
        data.project_name
      }`}
      className="w-full"
    >
      <Card className="flex justify-between shadow-md hover:drop-shadow-lg transition group">
        <div className="flex items-center justify-center w-1/3">
          <div className="flex items-center justify-center rounded-full bg-slate-100 w-[100px] h-[100px] group-hover:bg-sky-400 transition">
            <Folder className="w-10 h-10 text-slate-300 group-hover:text-white transition" />
          </div>
        </div>
        <div>
          <CardHeader className="pl-0">
            <CardTitle className="flex items-center justify-between group-hover:text-sky-400 transition">
              <p># {data.project_name}</p>{" "}
            </CardTitle>
            <CardDescription className="text-sm font-medium">
              ID: {data.project_id}
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <p className="text-sm font-medium">{data.project_description}</p>
          </CardContent>
          <CardFooter className="flex gap-2 pl-0">
            <Button variant="secondary" className="w-full">
              View Project
            </Button>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};

export default ProjectCards;
