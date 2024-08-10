'use client'

import { GoogleMap } from '@/app/components/GoogleMap'
import { H2, H3 } from '@/app/components/ui/Typography'
import { capitalize } from '@/lib/utils'
import { useEffect, useState } from 'react'
import Geocode from 'react-geocode'

type Props = {
	street: string | null
	postalCode: string | null
	city: string
	voivodeship: string
	GOOGLE_MAPS_API_KEY: string
}

const Address = ({ city, postalCode, street, voivodeship, GOOGLE_MAPS_API_KEY }: Props) => {
	const address = `${street}, ${postalCode}, ${city}, ${voivodeship}`

	const defaultProps = {
		center: {
			lat: 52.22928033619117,
			lng: 21.0027036892892
		},
		zoom: 11
	}

	const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>(defaultProps.center)

	useEffect(() => {
		Geocode.setApiKey(GOOGLE_MAPS_API_KEY)

		Geocode.setLanguage('pl')
		Geocode.setRegion('pl')
		Geocode.setLocationType('ROOFTOP')

		Geocode.fromAddress(address).then(
			response => {
				const { lat, lng } = response.results[0].geometry.location
				setCoordinates({ lat, lng })
			},
			error => {
				console.error(error)
			}
		)
	}, [address, GOOGLE_MAPS_API_KEY])

	return (
		<section className='scroll-m-16 border-b py-6' id='address'>
			<H2 size='sm'>Nasza siedziba</H2>

			<H3 size='sm' className='mb-4 mt-4'>
				{street && `${street}, `}
				{postalCode && `${postalCode}, `}
				{city}, {capitalize(voivodeship)}
			</H3>

			<div className='h-[60vh] w-full overflow-hidden rounded-md'>
				<GoogleMap
					API_KEY={GOOGLE_MAPS_API_KEY}
					lat={coordinates.lat}
					lng={coordinates.lng}
					zoom={defaultProps.zoom}
					marker='unit'
				/>
			</div>
		</section>
	)
}

export default Address
