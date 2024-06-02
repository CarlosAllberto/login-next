import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import User from '@models/User'
import connect from '@utils/db'

const handler = NextAuth({
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID ?? '',
			clientSecret: process.env.GITHUB_SECRET ?? '',
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				await connect()
				try {
					const user = await User.findOne({ email: credentials?.email })
					if (user) {
						const isPasswordCorrect = await bcrypt.compare(
							credentials?.password || '',
							user.password,
						)
						if (isPasswordCorrect) {
							return user
						}
					}
				} catch (err: any) {
					throw new Error(err)
				}
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }: any) {
			if (account?.provider == 'credentials') {
				return true
			}

			await connect()
			try {
				const existingUser = await User.findOne({ email: user.email })
				if (!existingUser) {
					const newUser = new User({
						email: user.email,
					})

					await newUser.save()
				}
				return true
			} catch (err) {
				console.log('Error saving user', err)
				return false
			}
		},
	},
})

export { handler as GET, handler as POST }
