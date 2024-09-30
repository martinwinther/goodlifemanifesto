import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

// Handler for GET requests to fetch all posts
export async function GET() {
	try {
		// Read all files from the posts directory
		const fileNames = fs.readdirSync(postsDirectory)
		const allPostsData = fileNames.map((fileName) => {
			const fullPath = path.join(postsDirectory, fileName)
			const fileContents = fs.readFileSync(fullPath, 'utf8')
			const { data, content } = matter(fileContents)

			// Return the post data including title, category, and text
			return {
				title: data.title,
				category: data.category,
				text: content,
			}
		})

		// Return the posts data as JSON response
		return NextResponse.json(allPostsData)
	} catch (error) {
		console.error('Error reading posts:', error)
		return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 })
	}
}
