import { format } from "date-fns";
import xlsx, { IJsonSheet } from "json-as-xlsx";
import axios from "axios";

// Fetch the attachment link based on the attachmentId
const fetchAttachmentLink = async (attachmentId: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/telegram/download-attachment`,
      { attachmentId }
    );
    return response.data.url; // Make sure the server response contains the `url` field
  } catch (error) {
    console.error("Error fetching attachment link:", error);
    return ""; // Or handle the error as needed
  }
};

export async function downloadToExcel(data: any) {
  let downloadFileName = "Ticket";

  if (data.date) {
    if (data.date.to) {
      downloadFileName = `Tickets (${format(
        new Date(data.date.from),
        "d MMMM, yyyy"
      )} - ${format(new Date(data.date.to), "d MMMM, yyyy")})`;
    } else {
      downloadFileName = `Tickets (${format(
        new Date(data.date.from),
        "d MMMM, yyyy"
      )})`;
    }
  }
  console.log(data);

  const convertToSentenceCase = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  // Fetch attachment links for each row
  const fetchAttachmentLinks = async () => {
    const rowsWithLinks = await Promise.all(
      data.data.map(async (row: any) => {
        if (row.telegram_attachment_id) {
          const link = await fetchAttachmentLink(row.telegram_attachment_id);
          return { ...row, attachment_link: link };
        }
        return { ...row, attachment_link: "" };
      })
    );
    return rowsWithLinks;
  };

  const rowsWithLinks = await fetchAttachmentLinks();

  let columns: IJsonSheet[] = [
    {
      sheet: "Tickets",
      columns: [
        { label: "Ticket ID", value: "ticket_id" },
        { label: "Platform", value: "platform" },
        { label: "Telegram Group Name", value: "telegram_chat_title" },
        { label: "Category", value: "category_name" },
        { label: "Message", value: "ticket_message" },
        {
          label: "Reported On",
          value: (row) => {
            // Check if created_at exists and is a valid date
            if (row.created_at && typeof row.created_at === "string") {
              return new Date(row.created_at).toLocaleDateString();
            } else {
              return ""; // or handle accordingly
            }
          },
        },
        {
          label: "Reporting Time",
          value: (row) => {
            // Check if created_at exists and is a valid date
            if (row.created_at && typeof row.created_at === "string") {
              return new Date(row.created_at).toLocaleTimeString();
            } else {
              return ""; // or handle accordingly
            }
          },
        },
        { label: "Reported By", value: "reported_by" },
        {
          label: "Priority",
          value: (row) => {
            return convertToSentenceCase(row.priority as string);
          },
        },
        { label: "Assigned to", value: "team_name" },
        {
          label: "Status",
          value: (row) => {
            return convertToSentenceCase(row.ticket_status as string);
          },
        },
        {
          label: "Attachment Link (Valid for 1 hour)",
          value: (row) => {
            return row.attachment_link
              ? `${row.attachment_link}`
              : "No Attachment";
          },
        },
      ],
      content: rowsWithLinks,
    },
  ];

  let settings = {
    fileName: downloadFileName,
  };

  xlsx(columns, settings);
}
