'use client'

import { signOut } from 'next-auth/react'

export default async function ButtonLogout() {
	return (
		<button
			className="border border-red-500 text-red-500 ps-5 pe-5 pt-2 pb-2 rounded-md"
			onClick={() => signOut()}
		>
			Logout
		</button>
	)
}
