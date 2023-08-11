'use client'

import React from 'react'
import { CopyToClipboard, type Props as CopyProps } from 'react-copy-to-clipboard'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/Tooltip'

type Props = CopyProps & { tooltipContent?: React.ReactNode }

const CopyWithTooltip = ({ children, text, onCopy, options, tooltipContent }: Props) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<CopyToClipboard
						text={text}
						onCopy={(text, result) => {
							onCopy && onCopy(text, result)
						}}
						options={options}>
						{children}
					</CopyToClipboard>
				</TooltipTrigger>
				<TooltipContent>{tooltipContent ?? 'Kopiuj'}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default CopyWithTooltip
