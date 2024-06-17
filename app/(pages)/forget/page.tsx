'use client'

import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

export default function Login() {
	const router = useRouter()

	const isValidEmail = (email: string) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
		return emailRegex.test(email)
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		const email = e.target[0].value

    if (!isValidEmail(email)) {
			toast.error('Email is invalid')
			return
		}

		router.replace('/new-password')
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<form
				className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4 w-4/12"
				onSubmit={handleSubmit}
			>
				<div>
					<h1 className="text-center text-white font-semibold text-4xl mb-5">Esqueci a senha</h1>
					<p className="text-white/50">
						Enviaremos uma mensagem para o seu E-mail contendo o link para redefinir sua senha.
					</p>
				</div>
				<div>
					<input
						type="email"
						placeholder="Seu E-mail"
						className="bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white w-full"
						name="email"
					/>
				</div>
				<div>
					<button className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full">Enviar</button>
				</div>
				<Toaster position='top-right' />
			</form>
		</main>
	)
}
