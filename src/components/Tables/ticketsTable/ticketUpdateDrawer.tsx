import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useMediaQuery } from "@/lib/useMediaQuery";
import { AlertCircle, CircleCheck, Ticket } from "lucide-react";
import TicketUpdateForm from "./ticketUpdateForm";

interface TicketUpdateDrawerProps {
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
}

const TicketUpdateDrawer: React.FC<TicketUpdateDrawerProps> = ({
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
}) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const getTriggerButton = () => {
    if (ticketStatus === "Closed") {
      return (
        <Button variant="outline" type="button" className="rounded-lg">
          <CircleCheck className="h-4 w-4 mr-2 text-green-500" /> Review
        </Button>
      );
    } else {
      return (
        <Button variant="outline" type="button" className="rounded-lg">
          <AlertCircle className="h-4 w-4 mr-2 text-orange-500" /> Respond
        </Button>
      );
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{getTriggerButton()}</DialogTrigger>
        <DialogContent className="sm:max-w-[500px] dark:bg-slate-900 dark:border-2 dark:border-sky-900">
          <DialogHeader>
            <DialogTitle className="my-2">
              {" "}
              <div className="flex items-center gap-2">
                {" "}
                <Ticket className="w-5"></Ticket>
                <h1 className="text-lg font-semi-bold">Ticket Information </h1>
              </div>
            </DialogTitle>
          </DialogHeader>
          <TicketUpdateForm
            ticketID={ticketID}
            ticketStatus={ticketStatus}
            priority={priority}
            platform={platform}
            reportedBy={reportedBy}
            telegramChatID={telegramChatID}
            telegramMessageID={telegramMessageID}
            message={message}
            category={category}
            attachmentId={attachmentId}
            assignedTo={assignedTo}
            telegramUserId={telegramUserId}
            reportedOn={reportedOn}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{getTriggerButton()}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Ticket Information</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you are done.
          </DrawerDescription>
        </DrawerHeader>
        <TicketUpdateForm
          ticketID={ticketID}
          ticketStatus={ticketStatus}
          priority={priority}
          platform={platform}
          reportedBy={reportedBy}
          telegramChatID={telegramChatID}
          telegramMessageID={telegramMessageID}
          message={message}
          category={category}
          attachmentId={attachmentId}
          assignedTo={assignedTo}
          telegramUserId={telegramUserId}
          reportedOn={reportedOn}
          setOpen={setOpen}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default TicketUpdateDrawer;
