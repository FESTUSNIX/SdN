import { NextAuthOptions, getServerSession } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/prisma/client'
import { nanoid } from 'nanoid'
import { LoginValidator } from '../validators/login'
import bcrypt from 'bcryptjs'

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
			session.user.id = token.id

			return session
		},
		async jwt({ token, user, account }) {
			if (account) {
				token.accessToken = account.access_token
				token.id = user.id
			}

			return token
		}
	},
	pages: {
		signIn: '/login'
	},
	secret: process.env.JWT_SECRET
}

export const getAuthSession = () => getServerSession(authOptions)
