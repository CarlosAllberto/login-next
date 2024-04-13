import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'

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
			async authorize(credentials, req) {
				let email = credentials?.email
				let password = credentials?.password

				if (email !== 'teste@gmail.com' || password !== '123') {
					return null
				}

				let user = { id: '1', name: 'Carlos Alberto', email, image: '/avatar.svg' }

				if (user) {
					return user
				} else {
					return null
				}
			},
		}),
	],
})

export { handler as GET, handler as POST }
