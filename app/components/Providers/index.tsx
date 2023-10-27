'use client'

import GlobalDialog from '@/app/(admin)/admin/components/GlobalDialog'
import GlobalSheet from '@/app/(admin)/admin/components/GlobalSheet'
import { GlobalModalProvider } from '@/app/(admin)/admin/context/GlobalModalContext'
import { GlobalSheetProvider } from '@/app/(admin)/admin/context/GlobalSheetContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'

const Providers = ({ children }: { children: React.ReactNode }) => {
	const [client] = useState(new QueryClient())

	return (
		<ThemeProvider attribute='class'>
			<QueryClientProvider client={client}>
				<SessionProvider>
					<GlobalModalProvider>
						<GlobalSheetProvider>
							{children}
							<GlobalSheet />
							<GlobalDialog />
						</GlobalSheetProvider>
					</GlobalModalProvider>
				</SessionProvider>
			</QueryClientProvider>
		</ThemeProvider>
	)
}

export default Providers
