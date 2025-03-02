"use client"
import { useEffect } from "react";

import cookies from "js-cookie";
import { useRouter } from "next/navigation"
import HomePage from "./componets/Home";
export default function Home() {
  const router = useRouter();
  const cook = cookies.get("authorized");
  useEffect(() => {

    if (!cook) {
      // router.push("/login");
    }
  }, [cook, router]);

  return (
    <>
      <HomePage />
    </>
  );
}



