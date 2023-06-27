'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'

const Providers = ({ children }: { children: React.ReactNode }) => {
	const [client] = useState(new QueryClient())

	return (
		<QueryClientProvider client={client}>
			<SessionProvider>{children}</SessionProvider>
		</QueryClientProvider>
	)
}

export default Providers
