import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
	title: '404: Strona nie odnaleziona',
	description: 'Nie udało się znaleźć żądanego zasobu.'
}

export default function NotFoundDummy() {
	notFound()
}
