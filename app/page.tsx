"use client";

import { redirect } from "next/navigation";

// Component to display the home page with "core" category posts
export default function HomePage() {
  redirect("/core");
}
