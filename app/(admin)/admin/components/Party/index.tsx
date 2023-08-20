'use client'

import { Button } from '@/app/components/ui/Button'
import { PartyPopper } from 'lucide-react'
import React, { useState } from 'react'
import ConfettiEl from 'react-confetti'

type Props = {}

const Party = (props: Props) => {
	const [isParty, setIsParty] = useState(false)

	return (
		<div>
			<Button onClick={() => setIsParty(prev => !prev)} size={'icon'} variant={'outline'}>
				<PartyPopper className='h-5 w-5 text-muted-foreground' />
			</Button>

			{isParty && (
				<>
					<div className='rainbow-bg pointer-events-none fixed inset-0 z-50 opacity-25'></div>
					<div className='pointer-events-none fixed inset-0'>
						<ConfettiEl />
					</div>
				</>
			)}
		</div>
	)
}

export default Party
