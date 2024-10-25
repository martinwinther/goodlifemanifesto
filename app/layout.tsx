import "../styles/globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-nosferatu-900">
        <Navbar />
        <main className="pt-16"> {children}</main>
      </body>
    </html>
  );
}
