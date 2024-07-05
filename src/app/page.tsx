// pages/redirect.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/protected`,
          {},
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          router.push("/projects");
        } else {
          router.push(`/login`);
          return;
        }
      } catch (error) {
        console.error("Authentication error:", error);
        router.push(`/login`);
        return;
      }
    };

    authenticateUser();
  }, [router]);

  return null;
};

export default RedirectPage;
