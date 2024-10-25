"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = ["core", "advanced", "expert"];

// Navbar component to display navigation links
export default function Navbar() {
  const pathname = usePathname();
  const currentCategory = pathname?.split("/")[1] || "core"; // Extract the current category from the path

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 p-4 shadow-md mb-80">
      <div className="flex justify-between items-center ">
        <ul className="flex md:mx-40 lg:mx-auto space-x-1 ">
          {categories.map((category) => (
            <li key={category}>
              <Link
                href={`/${category}`}
                className={`text-aro-200 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium ${
                  category === currentCategory ? "bg-blue-700" : ""
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
