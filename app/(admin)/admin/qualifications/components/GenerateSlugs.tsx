'use client'

import { Button } from '@/app/components/ui/Button'
import axios from 'axios'
import slugify from 'react-slugify'

type Props = {
	qualifications: any
}

const GenerateSlugs = ({ qualifications }: Props) => {
	return (
		<Button
			onClick={async () => {
				qualifications.map(async (q: any) => {
					const slug = slugify(q.name, { delimiter: '_' })

					const update = await axios.patch('/api/qualifications/generate-slugs', { id: q.id, slug: slug })

				})
			}}>
			Generate slugs
		</Button>
	)
}

export default GenerateSlugs
