"use client";
const host = process.env.NEXT_PUBLIC_HOST;

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { CircleCheck, CircleX } from "lucide-react";
import {
  getCountryFlagEmojiFromCountryCode,
  getCountryNameFromCountryCode,
  getCountryCodeFromCountryName,
  getCountryFlagEmojiFromCountryName,
  getCountryNameFromCountryFlagEmoji,
  getCountryCodeFromCountryFlagEmoji,
  getCountryFromCountryCode,
  getCountryFromCountryName,
  getCountryFromCountryFlagEmoji,
  getCountryFromCountryCodeOrName,
  getCountryFromCountryCodeOrFlagEmoji,
  getCountryFromCountryNameOrFlagEmoji,
  getCountryFromCountryCodeOrNameOrFlagEmoji,
  getCountryNameFromCountryCodeOrNameOrFlagEmoji,
  getCountryCodeFromCountryCodeOrNameOrFlagEmoji,
  getCountryFlagEmojiFromCountryCodeOrNameOrFlagEmoji,
  getCountryDialCodeFromCountryCodeOrNameOrFlagEmoji,
  countries,
  CountryInterface,
} from "country-codes-flags-phone-codes";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const loginSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8),
});

const registrationSchema = z
  .object({
    full_name: z
      .string()
      .min(2, { message: "Name must be atleast 2 characters long" })
      .max(50, { message: "Max 50 characters allowed" })
      .trim(),
    email: z.string().email().trim().toLowerCase(),
    contact_number: z
      .string()
      .min(10, { message: "Contact number must be 10 digits" })
      .max(10, { message: "Contact number must be 10 digits" })
      .trim(),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        {
          message:
            "Password must contain minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character",
        }
      )
      .max(100, { message: "Max 100 characters allowed" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const LoginHandler = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      full_name: "",
      email: "",
      contact_number: "",
      password: "",
      confirmPassword: "",
    },
  });

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const response = await axios.post(`${host}/login`, values, {
        withCredentials: true,
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json", // Ensure the content type is set
        },
      });

      toast({
        action: (
          <div className="w-full flex items-center">
            <CircleCheck className="mr-4 text-green-500" />
            <div>
              {" "}
              <span className="first-letter:capitalize text-medium">
                {response.data.message}
              </span>
            </div>
          </div>
        ),
      });
      router.push("/");
    } catch (error) {
      console.error("Login error:", (error as any)?.response.data.error);
      toast({
        action: (
          <div className="w-full flex items-center">
            <CircleX className="mr-4 text-rose-500" />
            <div>
              {" "}
              <p className="text-xs font-bold ">Login Unsuccessful</p>
              <span className="first-letter:capitalize text-medium">
                {(error as any).response.data.error}
              </span>
            </div>
          </div>
        ),
      });
    }
  };

  function onSubmit(values: z.infer<typeof registrationSchema>) {
    // const token = localStorage.getItem("token"); // Retrieve JWT token from local storage or wherever it's stored

    axios
      .post(`${host}/register`, values, {
        withCredentials: true,
      })
      .then((response) => {
        // Handle success
        router.push("/");
        // Redirect or perform any action upon successful login
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error.response.data.error);
        if (error.response && error.response.status === 400) {
          // If the error status is 400 (Bad Request), display the error message
          toast({
            title: "Error",
            description: error.response.data.error,
          });
        } else {
          // For other error statuses, display a generic error message
          toast({
            title: "Error",
            description: "An error occurred while registering the user.",
          });
        }
      });
  }

  return (
    <div>
      <div className="flex justify-center items-end min-h-[150px] text-3xl font-bold tracking-tight  sm:text-5xl pb-6 md:text-6xl text-sky-400">
        Chatbubble
      </div>
      <div className="min-h-[200px] flex items-center justify-center flex-col bg-background">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2 gap-1  mb-6 bg-background">
            <TabsTrigger
              value="login"
              className="rounded-lg text-xs bg-slate-50 min-h-10 data-[state=active]:text-sm  data-[state=active]:text-sky-400 data-[state=active]:bg-slate-50 data-[state=active]:border-2 data-[state=active]:border-sky-300 data-[state=active]:shadow-md data-[state=active]:shadow-sky-50"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="rounded-lg text-xs bg-slate-50 min-h-10 data-[state=active]:text-sm  data-[state=active]:text-sky-400 data-[state=active]:bg-slate-50 data-[state=active]:border-2 data-[state=active]:border-sky-300 data-[state=active]:shadow-md data-[state=active]:shadow-sky-50"
            >
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Form {...loginForm}>
                  <form
                    onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                    className="space-y-2"
                  >
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="email">Email</Label>
                          <FormControl>
                            <Input
                              id="email"
                              type="email"
                              placeholder="abc@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="password">Password</Label>
                          <FormControl>
                            <Input
                              id="password"
                              type="password"
                              placeholder="********"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      <Button type="submit" className="w-full mt-5">
                        Login
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Create your account for free</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    onReset={() => {
                      form.reset();
                    }}
                    className="space-y-8"
                  >
                    <div className="flex flex-col gap-4">
                      {" "}
                      <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="abc@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contact_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <div className="flex items-center">
                              {" "}
                              <Button
                                variant="secondary"
                                type="button"
                                className=" mr-1"
                              >
                                +880
                              </Button>
                              <FormControl>
                                <Input placeholder="171XXXXXXX" {...field} />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="***********"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Re-Enter Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="***********"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex gap-2">
                      {" "}
                      <Button type="submit" className="w-full">
                        Register
                      </Button>
                      <Button
                        type="reset"
                        variant="secondary"
                        className="w-full"
                      >
                        Reset
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginHandler;
