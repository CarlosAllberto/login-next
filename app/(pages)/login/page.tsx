'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'

export default function Login() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<form className="border border-zinc-800 rounded-md p-4 bg-zinc-900 flex flex-col gap-4">
				<div>
					<h1 className="text-center text-white font-semibold text-4xl">Login</h1>
				</div>
				<div>
					<input
						type="email"
						placeholder="Seu E-mail"
						className="bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="Sua senha"
						className="bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
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
