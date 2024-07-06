import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleAlertIcon, PlusCircle } from "lucide-react";
import Link from "next/link";

const CreateNewCard = () => {
  return (
    <Card className="min-w-[400px]">
      <Link href="/settings/projects/new">
        <CardContent className="flex flex-col items-center h-full place-content-center gap-4">
          <PlusCircle className="mt-5 w-20 h-20 text-slate-400"></PlusCircle>
          <p className="text-xl font-medium text-slate-400">
            Create New Project
          </p>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CreateNewCard;
