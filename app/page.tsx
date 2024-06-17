'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'

export default function Home() {
	const router = useRouter()
	const { data: session, update, status } = useSession()
	const [error, setError] = useState('')
	const [formData, setFormData]: any = useState({
		name: '',
		role: '',
	})

	useEffect(() => {
		let get = async () => {
			try {
				const res = await fetch(`/api/get/${session?.user?.email}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				if (res.status === 200) {
					let data = await res.json()
					setFormData(data)
				}
			} catch (error) {
				setError('Error, try again')
				console.log(error)
			}
		}

		if (status === 'authenticated') get()
	}, [status])

	useEffect(() => {
		console.log(formData.name)
	}, [formData])

	const inputChange = (e: any) => {
		let { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const deleteAccount = async () => {
		let email = session?.user?.email
		let confirm = window.prompt(`Para excluir a conta digite \"${email}\". Isso é irreversivel`)
		if (confirm == email) {
			try {
				const res = await fetch(`/api/delete/${email}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				if (res.status === 200) {
					setError('')
					alert('Conta deletada')
					router.push('/login')
				}
			} catch (error) {
				setError('Error, try again')
				console.log(error)
			}
		} else {
			alert('Configuração abortada')
		}
	}

	const updatePerfil = async () => {
		try {
			let name = formData.name

			const res = await fetch(`/api/update/${session?.user?.email}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
				}),
			})
			if (res.status === 200) {
				update({ name: name })
				setError('')
				alert('Pefil atualizado')
			}
		} catch (error) {
			setError('Error, try again')
			console.log(error)
		}
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4">
				<div className="flex justify-center">
					<Image
						src={session?.user?.image || '/avatar.svg'}
						alt="avatar"
						width={80}
						height={80}
						className="rounded-full"
					/>
				</div>
				{error ? (
					<div className="bg-red-300 rounded-md border border-red-800 p-2">
						<p className="text-red-800">{error}</p>
					</div>
				) : null}
				<h1 className="text-center text-white font-normal text-2xl">
					Bem vindo{' '}
					<span className="font-semibold">
						{session?.user?.name} {formData.role === 'admin' ? '(admin)' : null}
					</span>
				</h1>
				{formData.name ? (
					<div>
						<input
							type="text"
							placeholder="Seu Nome"
							id="name"
							name="name"
							value={formData.name}
							onChange={inputChange}
							className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md text-white"
						/>
					</div>
				) : null}
				<div>
					<button
						className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full"
						onClick={() => updatePerfil()}
					>
						Salvar alterações
					</button>
				</div>
				<div>
					<p className="text-white text-center">ou</p>
				</div>
				<div className="flex justify-end gap-2">
					<button
						className="border border-gray-500 text-gray-500 ps-5 pe-5 pt-2 pb-2 rounded-md"
						onClick={() => deleteAccount()}
					>
						Delete account
					</button>
					<button
						className="border border-red-500 text-red-500 ps-5 pe-5 pt-2 pb-2 rounded-md"
						onClick={() => signOut()}
					>
						Logout
					</button>
				</div>
			</div>
		</main>
	)
}
