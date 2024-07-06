// import { getKeywords } from "@/app/ApiRequests/getKeywords";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";

const CategoriesTable = () => {
  //   const [keywords] = getKeywords("/issue-config");

  return (
    <div className="flex  mt-5 ">
      <Table className="rounded-lg bg-white dark:bg-slate-700 drop-shadow-lg  backdrop-blur  min-w-full ">
        <TableHeader>
          <TableRow>
            <TableHead>Keyword</TableHead>
            <TableHead>Issue Category</TableHead>
            <TableHead>Responsible Person</TableHead>
            <TableHead className="text-center">Priority</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {keywords.map((keyword) => (
            <TableRow key={keyword.item_id}>
              <TableCell className="font-medium">{keyword.keyword}</TableCell>
              <TableCell>{keyword.issuetype}</TableCell>
              <TableCell>{keyword.responsibleperson}</TableCell>
              <TableCell className="text-center">{keyword.priority}</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 h-8 p-0">
                      <MoreHorizontal className="h-4 w-4"></MoreHorizontal>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                    //   onClick={async () => {
                    //     const response = await deleteHandler(
                    //       "/issues",
                    //       issue.issue_id
                    //     );
                    //     if (response === 200) {
                    //       if (confirm("Deleted Successfully")) {
                    //         location.reload();
                    //       }
                    //     }
                    //   }}
                    >
                      <SquarePen className="mr-2 h-4 w-4"></SquarePen>Update
                      Keyword
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600"
                      //   onClick={async () => {
                      //     const response = await deleteHandler(
                      //       "/issues",
                      //       issue.issue_id
                      //     );
                      //     if (response === 200) {
                      //       if (confirm("Deleted Successfully")) {
                      //         location.reload();
                      //       }
                      //     }
                      //   }}
                    >
                      <Trash2 className="mr-2 h-4 w-4"></Trash2>Delete Keyword
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoriesTable;
