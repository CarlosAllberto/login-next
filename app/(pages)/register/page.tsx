'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
// toast

export default function Register() {
	const [error, setError] = useState('')
	const router = useRouter()

	const isValidEmail = (email: string) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
		return emailRegex.test(email)
	}
	const handleSubmit = async (e: any) => {
		e.preventDefault()
		const name = e.target[0].value
		const email = e.target[1].value
		const password = e.target[2].value
		const confirmPassword = e.target[3].value

		if (!name || name.length < 8) {
			setError('Name is invalid')
			return
		}

		if (!isValidEmail(email)) {
			setError('Email is invalid')
			return
		}

		if (!password || password.length < 8) {
			setError('Password is invalid')
			return
		}

		if (confirmPassword !== password) {
			setError('Passwords are not equal')
			return
		}

		try {
			const res = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			})
			if (res.status === 400) {
				setError('The email already in use')
			}
			if (res.status === 200) {
				setError('')
				router.push('/login')
			}
		} catch (error) {
			setError('Error, try again')
			console.log(error)
		}
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
						type="text"
						placeholder="Seu Nome"
						id="name"
						name="name"
						className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
					/>
				</div>
				<div>
					<input
						type="email"
						placeholder="Seu E-mail"
						id="email"
						name="email"
						className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="Sua senha"
						id="password"
						name="password"
						className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="Confirme sua senha"
						id="confirm-password"
						name="confirm-password"
						className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
					/>
				</div>
				<div className="flex items-center">
					<input
						type="checkbox"
						id="remember-me"
						name="remember-me"
						className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
					/>
					<label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-white">
						Accept our terms and privacy policy
					</label>
				</div>
				<div>
					<button className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full">Register</button>
				</div>
			</form>
		</main>
	)
}
