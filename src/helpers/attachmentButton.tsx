import React from "react";
import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";

export const getAttachmentButton = (attachmentLink: String) => {
  return attachmentLink ? (
    <Button
      variant="outline"
      type="button"
      className="rounded-lg dark:bg-slate-800"
    >
      <Image className="h-4 w-4 mr-2 text-slate-500" /> View
    </Button>
  ) : (
    <Button variant="outline" type="button" disabled className="rounded-lg">
      <Image className="h-4 w-4 mr-2 text-slate-500" /> View
    </Button>
  );
};
