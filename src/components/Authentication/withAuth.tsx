"use client";

import { ComponentType, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  const ComponentWithAuth = (props: P) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      fetch("/api/check-auth", {
        method: "POST",
        credentials: "include", // Include cookies in the request
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.authenticated) {
            setIsLoading(false); // Authentication successful, stop loading
          } else {
            router.push(`/login`);
          }
        })
        .catch((error) => {
          console.error("Authentication error:", error);
          router.push(`/login`);
        });
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
