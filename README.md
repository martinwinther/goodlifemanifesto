# Markdown Blog with Next.js 14 and Tailwind CSS

## Overview

This project is a simple blog website built with Next.js 14 using the App Router. It displays posts from Markdown files, with a navigation bar for filtering posts by category. The site uses Tailwind CSS for styling and TypeScript for type safety.

## Project Structure

```arduino
.
├── app
│   ├── api
│   │   └── posts
│   │       └── route.ts
│   ├── [category]
│   │   └── page.tsx
│   ├── components
│   │   └── Navbar.tsx
│   ├── layout.tsx
│   └── page.tsx
├── posts
│   ├── example-post.md
│   └── another-post.md
├── public
├── styles
│   └── globals.css
├── tailwind.config.js
└── tsconfig.json
```

## How It Works

### **1. Markdown Files**

- **Location**: `posts/` directory.
- **Format**: Each Markdown file contains a YAML front matter section with `title` and `category`, followed by the Markdown content.
- **Example**:

  ```markdown
  ---
  title: 'Example Post'
  category: 'core'
  ---

  This is the content of the example post.
  ```

### **2. API Route**

- **File**: `app/api/posts/route.ts`.
- **Function**: Fetches and returns data from Markdown files.
- **Process**:
  1. Reads Markdown files from the `posts/` directory.
  2. Parses front matter and content using `gray-matter`.
  3. Returns the data as JSON.

### **3. Layout and Styling**

- **File**: `app/layout.tsx`.
- **Purpose**: Provides a consistent layout for all pages.
- **Features**:

  - Imports global styles from `styles/globals.css`.
  - Renders a fixed navigation bar at the top.
  - Adds padding to the main content area to prevent overlap with the navbar.

- **File**: `styles/globals.css`.
- **Contains**:
  - Tailwind CSS directives (`@tailwind base; @tailwind components; @tailwind utilities;`).
  - Global styles and resets.

### **4. Navigation Bar**

- **File**: `app/components/Navbar.tsx`.
- **Function**: Displays links to filter posts by category.
- **Features**:
  - Highlights the active category based on the current URL.
  - Uses `usePathname` from `next/navigation` to determine the active category.

### **5. Pages**

- **File**: `app/page.tsx`.
- **Purpose**: Displays posts from the "core" category on the homepage.
- **Functionality**:

  1. Fetches posts from the API route.
  2. Filters posts to show only those in the "core" category.

- **File**: `app/[category]/page.tsx`.
- **Purpose**: Displays posts for a specific category.
- **Functionality**:
  1. Fetches all posts from the API route.
  2. Filters posts based on the URL category.
  3. Implements a toggle feature to show/hide post content.

### **6. Client-Side Rendering**

- **Usage**: `"use client"` directive in client-side components like `Navbar.tsx` and `[category]/page.tsx` to enable React hooks and client-side logic.

## Development Setup

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies**:

   ```bash
   cd <project-directory>
   npm install
   # or
   yarn install
   ```

3. **Run the Development Server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open the Application**: Visit `http://localhost:3000` in your browser.

## Notes

- **Markdown Parsing**: Uses `gray-matter` for extracting metadata and content from Markdown files.
- **File Handling**: Uses Node.js `fs` module to read files, so it’s important that the `posts/` directory is present and contains valid Markdown files.
- **Tailwind CSS**: Custom styles are applied via Tailwind CSS classes. Adjust the `globals.css` and Tailwind configuration as needed for additional styling.

## Future Improvements

- Add authentication and user management.
- Implement pagination for posts.
- Add search functionality.
