// import { IssuesSchema } from "@/app/page";
// import xlsx, { IJsonSheet } from "json-as-xlsx";

// export function downloadToExcel(data: IssuesSchema[]) {
//   let columns: IJsonSheet[] = [
//     {
//       sheet: "Issues",
//       columns: [
//         { label: "Issue ID", value: "issue_id" },
//         { label: "Category", value: "issue_category" },
//         { label: "Description", value: "issue_text" },
//         {
//           label: "Reporting Date",
//           value: (row) => {
//             // Check if created_at exists and is a valid date
//             if (row.created_at && typeof row.created_at === "string") {
//               return new Date(row.created_at).toLocaleDateString();
//             } else {
//               return ""; // or handle accordingly
//             }
//           },
//         },
//         {
//           label: "Reporting Time",
//           value: (row) => {
//             // Check if created_at exists and is a valid date
//             if (row.created_at && typeof row.created_at === "string") {
//               return new Date(row.created_at).toLocaleTimeString();
//             } else {
//               return ""; // or handle accordingly
//             }
//           },
//         },
//         { label: "Reported By", value: "reporter_name" },
//         { label: "Reporter Number", value: "reporter_number" },
//         { label: "Priority", value: "priority" },
//         { label: "Assigned to", value: "assigned_to" },
//         { label: "Status", value: "issue_status" },
//       ],
//       content: data,
//     },
//   ];

//   let settings = {
//     fileName: "Issue List",
//   };

//   xlsx(columns, settings);
// }
