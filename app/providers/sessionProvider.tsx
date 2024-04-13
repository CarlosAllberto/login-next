'use client'

import { SessionProvider } from 'next-auth/react'

export default function NextAuthSessionProvider({ children }: { children: any }) {
	return <SessionProvider>{children}</SessionProvider>
}
