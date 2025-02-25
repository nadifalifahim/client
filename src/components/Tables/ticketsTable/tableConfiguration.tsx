import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getStatusIcon } from "../../../helpers/statusIcon";
import TicketUpdateDrawer from "./ticketUpdateDrawer";
import { getAttachmentButton } from "@/helpers/attachmentButton";
import { format } from "date-fns";
import { getPriorityIcon } from "@/helpers/priorityIcon";

interface TableConfigurationProps {
  tickets: any[];
  error: string | null;
  loading: boolean;
}

const TableConfiguration = ({
  tickets,
  error,
  loading,
}: TableConfigurationProps) => {
  console.log(tickets);
  return (
    <div className="rounded-lg bg-white dark:bg-slate-700 drop-shadow-lg  backdrop-blur ">
      <Table>
        <TableCaption>
          <div className="pb-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                  <PaginationLink href="#">2</PaginationLink>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </TableCaption>
        <TableHeader className="bg-white dark:bg-slate-800">
          <TableRow className="text-xs">
            <TableHead className="text-center  w-[200px]">#Ticket ID</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Reported on</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Message</TableHead>
            <TableHead className="text-center">Priority</TableHead>
            <TableHead className="text-center">Attachment</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
                No tickets found
              </TableCell>
            </TableRow>
          ) : (
            tickets.map((ticket) => (
              <TableRow key={ticket.ticket_id} className="text-center">
                <TableCell className=" w-[200px]">{ticket.ticket_id}</TableCell>
                <TableCell>{ticket.category_name}</TableCell>
                <TableCell className=" w-[180px]">
                  {format(new Date(ticket.created_at), "d MMMM, yyyy")}
                </TableCell>
                <TableCell className=" w-[180px]">
                  {getStatusIcon(ticket.ticket_status)}
                </TableCell>
                <TableCell>
                  {ticket.ticket_message.length > 200
                    ? `${ticket.ticket_message.slice(0, 200)}...`
                    : ticket.ticket_message}
                </TableCell>
                <TableCell className=" w-[180px]">
                  {getPriorityIcon(ticket.priority)}
                </TableCell>
                <TableCell className=" w-[150px]">
                  {getAttachmentButton(ticket.telegram_attachment_id)}
                </TableCell>
                <TableCell className="max-w-[100px]">
                  <TicketUpdateDrawer
                    ticketID={ticket.ticket_id}
                    ticketStatus={
                      ticket.ticket_status.charAt(0).toUpperCase() +
                      ticket.ticket_status.slice(1).toLowerCase()
                    }
                    priority={ticket.priority}
                    platform={ticket.platform}
                    reportedBy={ticket.reported_by}
                    telegramChatID={ticket.telegram_chat_id}
                    telegramMessageID={ticket.telegram_message_id}
                    message={ticket.ticket_message}
                    category={ticket.category_name}
                    attachmentId={ticket.telegram_attachment_id}
                    assignedTo={ticket.team_name}
                    telegramUserId={ticket.telegram_user_id}
                    reportedOn={ticket.created_at}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableConfiguration;
