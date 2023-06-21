const dotenvExpand = require('dotenv-expand')

dotenvExpand.expand({ parsed: { ...process.env } })

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'picsum.photos'
			},
			{
				hostname: 'hdwhiwewvgvllyhftczq.supabase.co'
			}
		]
	}
}

module.exports = nextConfig
