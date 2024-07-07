"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
const issueCategories = [
  "OTP Related",
  "e-KYC Related",
  "Dexter Portal Related",
  "Others",
];

import { useToast } from "@/components/ui/use-toast";

import { Copy, PlusCircle, Settings } from "lucide-react";
// import { newIssueConfigHandler } from "@/app/ApiRequests/newIssueConfigHandler";

const priorityTypes = ["High", "Medium", "Low", "None"] as const;

const formSchema = z.object({
  keyword: z.string().min(2).max(50),
  issueType: z.string().min(1).max(200),
  responsiblePerson: z.string().max(30),
  priority: z.enum(priorityTypes),
});

const CategoryForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
      issueType: "",
      responsiblePerson: "",
    },
  });

  const { toast } = useToast();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // const res = await newIssueConfigHandler(
    //   "/issue-config",
    //   values.keyword,
    //   values.issueType,
    //   values.responsiblePerson,
    //   values.priority
    // );
    // if (res === 200) {
    //   toast({
    //     title: "Issue recorded successfully",
    //     description: "Date",
    //     className:
    //       "fixed bottom-5 left-[50%] z-[100] flex max-h-screen w-full translate-x-[-50%] flex-col-reverse sm:right-0 sm:flex-col md:max-w-[420px]",
    //   });
    //   setTimeout(() => {
    //     location.reload();
    //   }, 2000);
  };
  // };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="mx-2">
            New Keyword<PlusCircle className="ml-4 h-5 w-5"></PlusCircle>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Keyword Builder</DialogTitle>
            <DialogDescription>Configure New Keywords</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="max-w-md w-full flex flex-col gap-2"
              >
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="keyword"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Keyword</FormLabel>
                          <FormControl>
                            <Input
                              placeholder=""
                              type="text"
                              {...field}
                            ></Input>
                          </FormControl>
                          <FormMessage></FormMessage>
                        </FormItem>
                      );
                    }}
                  ></FormField>

                  <FormField
                    control={form.control}
                    name="issueType"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Issue Type</FormLabel>
                          <FormControl>
                            <Input
                              placeholder=""
                              type="text"
                              {...field}
                            ></Input>
                          </FormControl>
                          <FormMessage></FormMessage>
                        </FormItem>
                      );
                    }}
                  ></FormField>
                </div>
                <div className="w-full flex gap-2">
                  <FormField
                    control={form.control}
                    name="responsiblePerson"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Responsible Team</FormLabel>
                          <FormControl>
                            <Input
                              placeholder=""
                              type="text"
                              {...field}
                            ></Input>
                          </FormControl>
                          <FormMessage></FormMessage>
                        </FormItem>
                      );
                    }}
                  ></FormField>

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>Priority</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder=""></SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {priorityTypes.map((priorityType: string) => (
                                <SelectItem
                                  key={priorityType}
                                  value={priorityType}
                                >
                                  {priorityType}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage></FormMessage>
                        </FormItem>
                      );
                    }}
                  ></FormField>
                </div>
                <Button type="submit" className="w-full  mt-5 ">
                  Configure New Keyword
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryForm;
