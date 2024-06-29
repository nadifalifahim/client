import { Button } from "@/components/ui/button";
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
  AlertCircle,
  Circle,
  CircleCheck,
  Flame,
  Image,
  Leaf,
  Waves,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const TableConfiguration = () => {
  const getStatusIcon = (status: String) => {
    switch (status) {
      case "High":
        return (
          <div className="flex h-full justify-center">
            <div className="flex gap-2 pl-3 pr-4 py-1 items-center bg-rose-500 rounded-full text-xs text-white">
              <Flame className="h-4 w-4" /> High
            </div>
          </div>
        );
      case "Medium":
        return (
          <div className="flex h-full justify-center">
            <div className="flex gap-2 px-4 py-1 items-center bg-orange-500 rounded-full text-xs text-white">
              <Waves className="h-4 w-4" /> Medium
            </div>
          </div>
        );
      case "Low":
        return (
          <div className="flex h-full justify-center">
            <div className="flex gap-2 px-4 py-1 items-center bg-background dark:bg-slate-800 rounded-full text-xs text-slate-700 dark:text-slate-100 border">
              <Leaf className="h-4 w-4" /> Low
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
            <TableHead className="text-center">#Ticket ID</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Reported on</TableHead>
            <TableHead className="text-center">Priority</TableHead>
            <TableHead className="text-center">Assigned to</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Attachment</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-center">
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>OTP Issue</TableCell>
            <TableCell>20 July, 2024</TableCell>
            <TableCell>{getStatusIcon("Low")}</TableCell>
            <TableCell>Sales Ops</TableCell>
            <TableCell>Open</TableCell>
            <TableCell>
              <Button
                variant="outline"
                type="button"
                className="rounded-lg dark:bg-slate-800"
              >
                <Image className="h-4 w-4 mr-2 text-slate-500"></Image> View
              </Button>
            </TableCell>
            <TableCell className="max-w-[100px]">
              <Button variant="outline" type="button" className="rounded-lg">
                <AlertCircle className="h-4 w-4 mr-2 text-orange-500"></AlertCircle>{" "}
                Respond
              </Button>
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>OTP Issue</TableCell>
            <TableCell>20 July, 2024</TableCell>
            <TableCell>{getStatusIcon("High")}</TableCell>
            <TableCell>Sales Ops</TableCell>
            <TableCell>Open</TableCell>
            <TableCell>
              <Button
                variant="outline"
                type="button"
                disabled
                className="rounded-lg"
              >
                <Image className="h-4 w-4 mr-2 text-slate-500"></Image> View
              </Button>
            </TableCell>
            <TableCell className="max-w-[100px]">
              <Button variant="outline" type="button" className="rounded-lg">
                <CircleCheck className="h-4 w-4 mr-2 text-green-500"></CircleCheck>{" "}
                Review
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TableConfiguration;
