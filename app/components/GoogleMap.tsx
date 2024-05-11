'use client'

import { cn } from '@/lib/utils/utils'
import GoogleMapReact from 'google-maps-react-markers'
import { School2Icon } from 'lucide-react'
import { Skeleton } from './ui/skeleton'

type Props = {
	API_KEY: string | undefined
	MAP_ID?: string
	lat: number
	lng: number
	zoom?: number
	className?: string
	marker?: 'default' | 'unit'
}

const Marker = ({ type = 'default' }: { lat: number; lng: number; type?: 'default' | 'unit' }) => (
	<div className='absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2'>
		{type === 'unit' ? (
			<div className='grid size-10 place-items-center rounded-full bg-primary'>
				<School2Icon className='size-6 text-primary-foreground' />
			</div>
		) : (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='32'
				height='32'
				viewBox='0 0 24 24'
				fill='none'
				stroke='#d83231'
				strokeWidth='1'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='size-10 -translate-y-1/2 text-primary'>
				<path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' fill='#ff4444' />
				<circle cx='12' cy='10' r='3' fill='#580000' stroke='#ff4444' />
			</svg>
		)}
	</div>
)

export const GoogleMap = ({ API_KEY, MAP_ID, lat, lng, zoom = 10, className, marker }: Props) => {
	const defaultProps = {
		center: { lat, lng },
		zoom: zoom
	}

	if (!API_KEY) return null

	return (
		<div className={cn('h-full w-full', className)}>
			<GoogleMapReact
				apiKey={API_KEY}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
				options={{
					disableDefaultUI: true,
					mapId: MAP_ID
				}}
				loadingContent={<Skeleton className='h-full w-full' />}
				externalApiParams={{
					region: 'PL',
					language: 'pl'
				}}>
				<Marker lat={lat} lng={lng} type={marker} />
			</GoogleMapReact>
		</div>
	)
}
