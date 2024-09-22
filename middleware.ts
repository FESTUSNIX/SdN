import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
	async function middleware(req) {
		const pathname = req.nextUrl.pathname
		const role = req.nextauth.token?.role

		if (pathname.startsWith('/admin') && role !== 'ADMIN') {
			return NextResponse.redirect(new URL('/login', req.url))
		}

		if (pathname.startsWith('/manage') && role !== 'UNIT') {
			return NextResponse.redirect(new URL('/login', req.url))
		}

		if (['/manage', '/manage/'].includes(pathname)) {
			return NextResponse.rewrite(new URL('/manage/unit', req.url))
		}
	},
	{
		callbacks: {
			authorized: ({ token }) => ['ADMIN', 'UNIT'].includes(token?.role || '')
		}
	}
)

export const config = {
	matcher: ['/admin/:path*', '/manage/:path*']
}
