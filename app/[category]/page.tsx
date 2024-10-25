"use client";

import { useState, useEffect } from "react";

// Define the type for a post
type Post = {
  title: string;
  category: string;
  text: string;
};

// Component to display posts for a specific category
export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch posts when the component mounts or category changes
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Check if data is an array and filter by category
        if (Array.isArray(data)) {
          const filteredPosts = data.filter(
            (post: Post) => post.category.toLowerCase() === params.category,
          );
          setPosts(filteredPosts);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [params.category]);

  // Show a loading message while fetching
  if (isLoading)
    return <p className="text-center text-dracula-200">Loading...</p>;

  // Display posts or a message if no posts are available
  return (
    <div className="p-4 md:mx-40 lg:mx-auto max-w-3xl">
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostToggle key={post.title} title={post.title} text={post.text} />
        ))
      ) : (
        <p className="text-center">No posts available for this category</p>
      )}
    </div>
  );
}

// Component to toggle visibility of post content
function PostToggle({ title, text }: { title: string; text: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pb-4">
      <div className="border-b-2 border-s-2 px-4 pb-4 border-gray-600">
        <h2
          className="text-xl font-semibold cursor-pointer hover:text-gray-600 transition-colors duration-300 text-nosferatu-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
        </h2>
        {isOpen && <p className="mt-2 text-dracula-200">{text}</p>}
      </div>
    </div>
  );
}
