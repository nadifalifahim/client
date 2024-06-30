import React from "react";
import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export const getAttachmentButton = (attachmentLink: String) => {
  const downloadAttachment = async (attachmentId: String) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/telegram/download-attachment`,
        {
          attachmentId,
        }
      );

      if (response.data.url) {
        // Redirect to the file URL
        window.location.href = response.data.url;
      } else {
        console.error("Failed to get file URL from server");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return attachmentLink ? (
    <Button
      variant="outline"
      type="button"
      className="rounded-lg dark:bg-slate-800"
      onClick={() => {
        downloadAttachment(attachmentLink);
      }}
    >
      <Image className="h-4 w-4 mr-2 text-slate-500" /> View
    </Button>
  ) : (
    <Button variant="outline" type="button" disabled className="rounded-lg">
      <Image className="h-4 w-4 mr-2 text-slate-500" /> View
    </Button>
  );
};
