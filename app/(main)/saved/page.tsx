import { H1 } from '@/app/components/ui/Typography'
import { Metadata } from 'next'
import { SavedMajors } from './components/SavedMajors'

type Props = {}

export const metadata: Metadata = {
	title: 'Zapisane',
	robots: {
		index: false,
		follow: false
	}
}

const SavedMajorsPage = async (props: Props) => {
	return (
		<main className='wrapper py-12'>
			<H1>Zapisane kierunki</H1>

			<section className='my-8'>
				<SavedMajors />
			</section>
		</main>
	)
}

export default SavedMajorsPage
