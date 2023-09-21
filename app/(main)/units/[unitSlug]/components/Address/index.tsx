'use client'

import { H2, H3 } from '@/app/components/ui/Typography'
import { capitalize } from '@/lib/utils/capitalize'
import GoogleMapReact from 'google-map-react'
import { School2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import Geocode from 'react-geocode'

type Props = {
	street: string | null
	postalCode: string | null
	city: string
	voivodeship: string
	GOOGLE_MAPS_API_KEY: string
}

const Marker = ({ lat, lng, children }: { lat: number; lng: number; children?: React.ReactNode }) => (
	<div className='grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary'>
		{children ?? <School2 className='h-6 w-6 text-primary-foreground' />}
	</div>
)

const Address = ({ city, postalCode, street, voivodeship, GOOGLE_MAPS_API_KEY }: Props) => {
	const address = `${street}, ${postalCode}, ${city}, ${voivodeship}`

	const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })

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

	const defaultProps = {
		center: {
			lat: 52.22928033619117,
			lng: 21.0027036892892
		},
		zoom: 11
	}
	return (
		<section className='scroll-m-16 border-b py-6' id='address'>
			<H2 size='sm'>Nasza siedziba</H2>

			<H3 size='sm' className='mb-4 mt-4'>
				{street && `${street}, `}
				{postalCode && `${postalCode}, `}
				{city}, {capitalize(voivodeship)}
			</H3>

			<div className='h-[60vh] w-full overflow-hidden rounded-md'>
				<GoogleMapReact
					bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
					defaultCenter={defaultProps.center}
					defaultZoom={defaultProps.zoom}
					yesIWantToUseGoogleMapApiInternals
					center={{ lat: coordinates.lat, lng: coordinates.lng }}
					options={{ streetView: true, streetViewControl: true }}>
					<Marker lat={coordinates.lat} lng={coordinates.lng} />
				</GoogleMapReact>
			</div>
		</section>
	)
}

export default Address
