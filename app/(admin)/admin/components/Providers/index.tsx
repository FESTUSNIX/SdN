'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'
import { GlobalModalProvider } from '../../context/GlobalModalContext'
import { GlobalSheetProvider } from '../../context/GlobalSheetContext'
import GlobalDialog from '../GlobalDialog'
import GlobalSheet from '../GlobalSheet'

const Providers = ({ children }: { children: React.ReactNode }) => {
	const [client] = useState(new QueryClient())

	return (
		<QueryClientProvider client={client}>
			<SessionProvider>
				<GlobalModalProvider>
					<GlobalSheetProvider>
						{children}
						<GlobalDialog />
						<GlobalSheet />
					</GlobalSheetProvider>
				</GlobalModalProvider>
			</SessionProvider>
		</QueryClientProvider>
	)
}

export default Providers
