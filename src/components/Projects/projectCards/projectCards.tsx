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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p># {data.project_name}</p>{" "}
        </CardTitle>
        <CardDescription className="text-sm font-medium">
          ID: {data.project_id}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium">{data.project_description}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link
          href={`/projects/${data.project_id.toLocaleLowerCase()}`}
          className="w-full"
        >
          <Button variant="secondary" className="w-full">
            View Project
          </Button>
        </Link>
        {/* <Button variant="secondary">
          <CircleAlertIcon className="w-4 text-orange-500 mr-2"></CircleAlertIcon>
          Link Telegram
        </Button>
        <Button disabled variant="secondary">
          <CircleAlertIcon className="w-4 text-orange-500 mr-2"></CircleAlertIcon>
          Link Whatsapp
        </Button> */}
      </CardFooter>
    </Card>
  );
};

export default ProjectCards;
