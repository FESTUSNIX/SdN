import { H1, H2 } from '../components/elements/Typography'
import UnitForm from './components/modules/UnitForm'

export default function AdminPage() {
	return (
		<main className='flex min-h-screen flex-col items-center wrapper pt-12'>
			<H1 className='mb-24'>Admin Panel</H1>

			<section className='w-full mb-12'>
				<H2>Add unit</H2>

				<p>Name</p>
				<p>Logo</p>
				<p>isPublic</p>
				<p>nip?</p>
				<p>regon?</p>
				<p>unitType - uczelnia / placówka doskonalenia nauczycieli / inna</p>
				<p>website?</p>
				<p>address - UnitAddress (street, postalCode, cityId, unitId)</p>
			</section>
			<UnitForm />
		</main>
	)
}
