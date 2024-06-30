import { Button } from "@/components/ui/button";
import { downloadToExcel } from "@/lib/exportToExcel";
import { CloudDownload } from "lucide-react";
import React from "react";

const ExportToExcel = (data: any) => {
  return (
    <Button
      variant="outline"
      className=" text-xs "
      onClick={() => downloadToExcel(data)}
    >
      <CloudDownload className="w-4 h-4 mr-2"></CloudDownload> Export
    </Button>
  );
};

export default ExportToExcel;
