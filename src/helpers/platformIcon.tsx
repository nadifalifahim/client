import React from "react";
import { MessageCircle, Send, Ticket } from "lucide-react";

export const getPlatformIcon = (platform: String) => {
  switch (platform) {
    case "Telegram":
      return (
        <div className="flex h-full justify-center">
          <div className="flex gap-2 pl-3 pr-4 py-1 items-center text-sky-500 border border-sky-500 rounded-full text-xs">
            <Send className="h-4 w-4" /> Telegram
          </div>
        </div>
      );
    case "Whatsapp":
      return (
        <div className="flex h-full justify-center">
          <div className="flex gap-2 pl-3 pr-4 py-1 items-center text-green-500 border border-green-500 rounded-full text-xs">
            <MessageCircle className="h-4 w-4" /> Whatsapp
          </div>
        </div>
      );
    case "Portal":
      return (
        <div className="flex h-full justify-center">
          <div className="flex gap-2 pl-3 pr-4 py-1 items-center text-sky-500 border border-sky-500 rounded-full text-xs">
            <Ticket className="h-4 w-4" /> Portal
          </div>
        </div>
      );
    default:
      return null;
  }
};
