import '../styles/globals.css' // Import global styles for the application
import Navbar from './components/Navbar'

// Root layout component that wraps around all pages
export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<Navbar /> {/* Render the Navbar at the top */}
				<main className="pt-16">
					{' '}
					{/* Add padding to account for the fixed navbar */}
					{children} {/* Render page content */}
				</main>
			</body>
		</html>
	)
}
