import { getServerSession } from 'next-auth'
import Image from 'next/image'
import ButtonLogout from './buttonLogout'
import { redirect } from 'next/navigation'

export default async function Home() {
	const session = await getServerSession()

	if(!session) redirect('/login')

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="border border-zinc-800 rounded-md p-4 bg-zinc-900 flex flex-col gap-4">
				<div className="flex justify-center">
					<Image
						src={session?.user?.image ?? ''}
						alt="avatar"
						width={80}
						height={80}
						className="rounded-full"
					/>
				</div>
				<h1 className="text-center text-white font-normal text-2xl">
					Bem vindo <span className="font-semibold">{session?.user?.name}</span>
				</h1>
				<ButtonLogout />
			</div>
		</main>
	)
}
