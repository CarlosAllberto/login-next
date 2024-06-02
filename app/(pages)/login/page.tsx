'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
	const router = useRouter()

	const inputChange = (e: any) => {
		let { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const [error, setError] = useState('')

	const { email, password } = formData

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		let result = await signIn('credentials', {
			email,
			password,
			redirect: false,
		})

		if (result?.error) {
			return setError('E-mail ou senha invalidos')
		}

		router.replace('/')
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<form
				className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4"
				onSubmit={handleSubmit}
			>
				<div>
					<h1 className="text-center text-white font-semibold text-4xl">Login</h1>
				</div>
				{error ? (
					<div className="bg-red-300 rounded-md border border-red-800 p-2">
						<p className="text-red-800">{error}</p>
					</div>
				) : null}
				<div>
					<input
						type="email"
						placeholder="Seu E-mail"
						className="bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
						name="email"
						onChange={inputChange}
						value={email}
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="Sua senha"
						className="bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
						name="password"
						onChange={inputChange}
						value={password}
					/>
				</div>
				<div>
					<button className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full">Login</button>
				</div>
				<div>
					<p className="text-white text-center">ou</p>
				</div>
				<div className="flex justify-center gap-4">
					<Image
						src="/google.png"
						alt="google"
						width={40}
						height={40}
						className="cursor-pointer rounded-full"
						onClick={() => signIn('google', { callbackUrl: '/' })}
					/>
					<Image
						src="/facebook.png"
						alt="facebook"
						width={40}
						height={40}
						className="cursor-pointer rounded-full"
						onClick={() => signIn('facebook', { callbackUrl: '/' })}
					/>
					<Image
						src="/github.png"
						alt="github"
						width={40}
						height={40}
						className="cursor-pointer rounded-full"
						onClick={() => signIn('github', { callbackUrl: '/' })}
					/>
				</div>
			</form>
		</main>
	)
}
