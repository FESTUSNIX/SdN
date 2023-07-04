'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'
import { GlobalSheetProvider } from '../../context/GlobalSheetContext'

const Providers = ({ children }: { children: React.ReactNode }) => {
	const [client] = useState(new QueryClient())

	return (
		<QueryClientProvider client={client}>
			<SessionProvider>
				<GlobalSheetProvider>{children}</GlobalSheetProvider>
			</SessionProvider>
		</QueryClientProvider>
	)
}

export default Providers
