'use client'

import { Button } from '@/app/components/ui/Button'
import React, { useState } from 'react'
import ConfettiEl from 'react-confetti'

type Props = {}

const Confetti = (props: Props) => {
	const [isExploding, setIsExploding] = useState(false)

	return (
		<div>
			<Button onClick={() => setIsExploding(true)}>Impreza</Button>

			<div className='pointer-events-none fixed inset-0'>{isExploding && <ConfettiEl />}</div>
		</div>
	)
}

export default Confetti
