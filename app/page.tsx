'use client'

import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'

export default function Home() {
	const { data: session, status } = useSession()

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="border border-zinc-800 rounded-md p-4 bg-zinc-900 flex flex-col gap-4">
				<div className="flex justify-center">
					<Image
						src={session?.user?.image || ''}
						alt="avatar"
						width={80}
						height={80}
						className="rounded-full"
					/>
				</div>
				<h1 className="text-center text-white font-normal text-2xl">
					Bem vindo <span className="font-semibold">{session?.user?.name}</span>
				</h1>
				<button
					className="border border-red-500 text-red-500 ps-5 pe-5 pt-2 pb-2 rounded-md"
					onClick={() => signOut()}
				>
					Logout
				</button>
			</div>
		</main>
	)
}
