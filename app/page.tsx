"use client";

import { useState, useEffect } from "react";

// Define the type for a post
type Post = {
  title: string;
  category: string;
  text: string;
};

// Component to display the home page with "core" category posts
export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch posts when the component mounts
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Filter posts by the "core" category
        const corePosts = data.filter(
          (post: Post) => post.category.toLowerCase() === "core",
        );
        setPosts(corePosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Show a loading message while fetching
  if (isLoading) return <p className="text-center">Loading...</p>;

  // Display posts or a message if no posts are available
  return (
    <div className="mx-auto max-w-3xl">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.title} className="border-b py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-gray-700">{post.text}</p>
          </div>
        ))
      ) : (
        <p className="text-center">
          No posts available for the &quot;core&quot; category
        </p>
      )}
    </div>
  );
}
