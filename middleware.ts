import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
	function middleware(req) {
		if (req.nextUrl.pathname.startsWith('/admin') && req.nextauth.token?.role !== 'ADMIN') {
			return NextResponse.redirect(new URL('/login', req.url))
		}

		if (req.nextUrl.pathname.startsWith('/manage') && req.nextauth.token?.role !== 'UNIT') {
			return NextResponse.redirect(new URL('/login', req.url))
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
