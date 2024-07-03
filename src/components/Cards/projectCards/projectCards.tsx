import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card className="min-w-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p># {data.project_name}</p> <Switch />
        </CardTitle>
        <CardDescription className="text-sm font-medium">
          ID: {data.project_id}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium">{data.project_description}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="secondary" className="w-full">
          Manage Project
        </Button>
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