import prisma from '@/prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { NextAuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { LoginValidator } from '../validators/login'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt'
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'jsmith@example.com' },
				password: { label: 'Password', type: 'password', placeholder: '***********' }
			},
			async authorize(credentials, req) {
				const { email, password } = LoginValidator.parse(credentials)
				const user = await prisma.user.findUnique({
					where: {
						email
					}
				})

				if (!user) return null

				const isPasswordValid = await bcrypt.compare(password, user.password)

				if (!isPasswordValid) return null

				return user
			}
		})
	],
	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id
				session.user.name = token.name
				session.user.email = token.email
				session.user.image = token.picture
				session.user.role = token.role
			}

			return session
		},
		async jwt({ token, user, account }) {
			const dbUser = await prisma.user.findFirst({
				where: {
					email: token.email ?? undefined
				}
			})

			if (!dbUser) {
				token.id = user.id
				return token
			}

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				role: dbUser.role,
				picture: dbUser.image
			}
		}
	},
	pages: {
		signIn: '/login'
	},
	secret: process.env.NEXTAUTH_SECRET
}

export const getAuthSession = () => getServerSession(authOptions)
