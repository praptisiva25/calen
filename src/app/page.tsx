"use client"; // This is important to ensure the component is treated as a client-side component

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { userId, isLoaded } = useAuth(); // Correct client-side auth hook
  const router = useRouter();

  useEffect(() => {
    // Redirect if the user is authenticated and data is loaded
    if (isLoaded && userId != null) {
      router.push("/events"); // Trigger redirection after rendering
    }
  }, [isLoaded, userId, router]); // Dependency array ensures it runs when auth state is loaded or userId changes

  if (!isLoaded) {
    return <div>Loading...</div>; // Loading state while auth data is being fetched
  }

  return (
    <div className="text-center container my-4 mx-auto">
      <h1 className="text-3xl mb-4">Home Page</h1>
      <div className="flex gap-2 justify-center">
        <Button asChild>
          <SignInButton />
        </Button>
        <Button asChild>
          <SignUpButton />
        </Button>
        <UserButton />
      </div>
    </div>
  );
}
