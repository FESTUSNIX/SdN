'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'

const Providers = ({ children }: { children: React.ReactNode }) => {
	const [client] = useState(new QueryClient())

	return (
		<ThemeProvider attribute='class'>
			<QueryClientProvider client={client}>
				<SessionProvider>{children}</SessionProvider>
			</QueryClientProvider>
		</ThemeProvider>
	)
}

export default Providers
