'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'

export default function Home() {
	const { data: session, status } = useSession()
	const [error, setError] = useState('')
	const router = useRouter()

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

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="border border-zinc-800 rounded-md p-4 bg-zinc-900 flex flex-col gap-4">
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
					Bem vindo <span className="font-semibold">{session?.user?.name}</span>
				</h1>
				<button
					className="border border-red-500 text-red-500 ps-5 pe-5 pt-2 pb-2 rounded-md"
					onClick={() => signOut()}
				>
					Logout
				</button>
				<button
					className="border border-gray-500 text-gray-500 ps-5 pe-5 pt-2 pb-2 rounded-md"
					onClick={() => deleteAccount()}
				>
					Delete account
				</button>
			</div>
		</main>
	)
}
