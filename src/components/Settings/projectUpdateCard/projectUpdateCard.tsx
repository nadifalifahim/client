import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectData {
  project_id: string;
  project_name: string;
  project_description: string;
  project_status: string;
  created_at: string; // Dates as strings
  updated_at: string;
}

interface ProjectUpdateCardProps {
  projectData: ProjectData;
}

const ProjectUpdateCard = ({ projectData }: ProjectUpdateCardProps) => {
  return (
    <Card className="max-w-[600px] shadow-md hover:shadow-lg transition mt-10">
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center border border-dashed rounded-lg p-4">
          <p className="text-sm font-bold min-w-[120px]">Project ID</p>
          <p className="text-sm">{projectData.project_id}</p>
        </div>
        <div className="flex items-center border border-dashed rounded-lg p-4">
          <p className="text-sm font-bold min-w-[120px]">Project Name</p>
          <p className="text-sm">Project ID</p>
        </div>

        <div className="flex items-center border border-dashed rounded-lg p-4">
          <p className="text-sm font-bold min-w-[120px]">Created at</p>
          <p className="text-sm">Project ID</p>
        </div>

        <div className="flex items-center border border-dashed rounded-lg p-4">
          <p className="text-sm font-bold min-w-[120px]">Status</p>
          <p className="text-sm">Project ID</p>
        </div>

        <div className="flex flex-col items-start border border-dashed rounded-lg p-4">
          <p className="text-sm font-bold min-w-[120px]">Description</p>
          <p className="text-sm mt-4">Project ID</p>
        </div>
      </CardContent>
    </Card>
  );
};
export default ProjectUpdateCard;
