import React, { ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { ChevronDown, Loader, Send, X } from "lucide-react";
import { getStatusIcon } from "@/helpers/statusIcon";
import { getPlatformIcon } from "@/helpers/platformIcon";
import { getAttachmentButton } from "@/helpers/attachmentButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import axios from "axios";
import { getPriorityIcon } from "@/helpers/priorityIcon";

interface TicketUpdateFormProps {
  ticketID: string;
  ticketStatus: string;
  priority: string;
  platform: string;
  reportedBy: string;
  telegramChatID: number;
  telegramMessageID: number;
  message: string;
  category: string;
  attachmentId: string;
  assignedTo: string;
  telegramUserId: number;
  reportedOn: Date;
  setOpen: (open: boolean) => void; // Accept setOpen as a prop
}

const TicketUpdateForm: React.FC<TicketUpdateFormProps> = ({
  ticketID,
  ticketStatus,
  priority,
  platform,
  reportedBy,
  telegramChatID,
  telegramMessageID,
  message,
  category,
  attachmentId,
  assignedTo,
  telegramUserId,
  reportedOn,
  setOpen, // Destructure setOpen
}) => {
  const [messageInput, setMessageInput] = React.useState("");
  const [messageSendRequestActive, setMessageSendRequestActive] =
    React.useState(false);
  const [responseTicketStatus, setResponseTicketStatus] =
    React.useState("In Progress");

  const handleResponseMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
  };

  const handleSendResponse = async () => {
    setMessageSendRequestActive(true);
    try {
      // Step 1: Update the ticket status
      const updateStatusResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/portal/tickets/update-status`,
        {
          ticketId: ticketID,
          status: responseTicketStatus.toLocaleLowerCase(),
        }
      );

      console.log(updateStatusResponse);

      if (updateStatusResponse.status === 200) {
        // Step 2: Prepare the message to send
        const messageToSend = `Hello ${reportedBy},\n\nYour ticket (${ticketID}) status has been set to "${responseTicketStatus}" by the ${assignedTo} team.${
          messageInput
            ? `\n\nThe team has provided the following message: \n\n"${messageInput}"\n\nThank you.`
            : `\n\nThank you.`
        }`;

        // Step 3: Send the response message
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/telegram/reply`,
          {
            message: messageToSend, // Use messageToSend directly
            messageId: telegramMessageID,
            telegramChatId: telegramChatID,
          }
        );

        console.log("Response:", response.data);
        setMessageSendRequestActive(false);
        setOpen(false); // Close the form after sending the response
      } else {
        console.error("Failed to update the ticket status");
        setMessageSendRequestActive(false);
      }
    } catch (error) {
      console.error("Error sending POST request:", error);
      setMessageSendRequestActive(false);
    }
  };

  return (
    <div className="flex gap-8 focus:outline-none">
      <div className="flex flex-col gap-4 w-full text-xs font-medium">
        <div className="flex items-center">
          <span className="text-slate-500 min-w-[100px]">Ticket ID</span>
          <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-6 py-1">
            {ticketID}
          </span>{" "}
        </div>

        <div className="flex items-center">
          <span className="text-slate-500 min-w-[100px]">Status</span>
          <div className="flex items-center gap-2">
            <span>{getStatusIcon(ticketStatus.toLocaleLowerCase())}</span>
            {ticketStatus === "Closed" ? (
              <span className="flex items-center rounded-full bg-slate-100 dark:bg-slate-800 pl-6 pr-5 py-1 text-slate-400">
                Closed On 20 July, 2024
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-slate-500 min-w-[100px]">Priority</span>
          <span>{getPriorityIcon(priority)}</span>
        </div>

        <div className="flex items-center">
          <span className="text-slate-500 min-w-[100px]">Reported On</span>
          <span className="py-1 flex items-center">
            <div className="min-w-[100px]">
              {" "}
              {format(new Date(reportedOn), "d MMMM, yyyy")}
            </div>
            <span className="pl-2 text-slate-500">
              {format(new Date(reportedOn), "EEEE")}
            </span>
          </span>
        </div>

        <div className="flex items-center">
          <span className="text-slate-500 min-w-[100px]">Reported By</span>
          <span className="py-1 flex items-center">
            <div className="min-w-[100px]"> {reportedBy}</div>
            <span className="pl-2 text-slate-500">(ID: {telegramUserId})</span>
          </span>
        </div>

        <div className="flex items-center">
          <span className="text-slate-500 min-w-[100px]">Assigned To</span>
          <span className="py-1">{assignedTo}</span>
        </div>

        <div className="flex items-center">
          <span className="text-slate-500 min-w-[100px]">Platform</span>
          <span>{getPlatformIcon(platform)}</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs text-slate-500">Message</span>
          <div className="border rounded-lg h-[100px] w-full p-2 bg-slate-100 dark:bg-slate-800 overflow-auto">
            {message}
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-slate-500 min-w-[100px]">Attachment</span>
          <div className="flex gap-2">
            <span>{getAttachmentButton(attachmentId)}</span>
          </div>
        </div>
        <hr></hr>
        <div className="flex items-center gap-2">
          {" "}
          <Send className="w-5"></Send>
          <h1 className="text-lg font-semi-bold">Response </h1>
        </div>

        {ticketStatus !== "Closed" ? (
          <div className="flex items-center">
            <span className="text-slate-500 min-w-[100px]">Update Status</span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                <span className="flex text-orange-500 items-center rounded-full border border-orange-400 bg-white-100 dark:bg-slate-800 pl-6 pr-5 py-1">
                  {responseTicketStatus}{" "}
                  <ChevronDown className="w-4 h-4 ml-2"></ChevronDown>
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="text-xs">
                  Update Status
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {ticketStatus === "Open" ? (
                  <DropdownMenuItem
                    onClick={() => setResponseTicketStatus("In Progress")}
                    className="text-xs"
                  >
                    In Progress
                  </DropdownMenuItem>
                ) : (
                  <></>
                )}
                <DropdownMenuItem
                  onClick={() => setResponseTicketStatus("Closed")}
                  className="text-xs"
                >
                  Closed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <></>
        )}

        <div className="flex flex-col items-start gap-2">
          <span className="text-slate-500 min-w-full">Response Message</span>
          <div className="flex gap-2 min-w-full">
            <textarea
              className="min-h-[100px] min-w-full p-2 border border-orange-400 focus:outline-none focus:shadow-md focus:shadow-orange-100 text-orange-500 rounded-lg"
              value={messageInput}
              onChange={handleResponseMessageChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => setOpen(false)} // Use setOpen to close the drawer or dialog
            className="w-full"
          >
            <X className="w-4 h-4 mr-2" /> Close
          </Button>
          <Button
            type="button"
            className="w-full bg-orange-500 hover:bg-orange-600"
            onClick={() => handleSendResponse()}
          >
            {!messageSendRequestActive ? (
              <span className="flex items-center transition ease-in">
                <Send className="w-4 h-4 mr-2" /> Send Response
              </span>
            ) : (
              <span className="blink flex items-center transition ease-in">
                <Loader className="w-5 h-5 mr-2" /> Sending Response
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketUpdateForm;
