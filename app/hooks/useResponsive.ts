'use client'

import { useMediaQuery } from 'react-responsive'

const breakpoints: { [key: string]: number } = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	xxl: 1536
}

const useResponsive = () => {
	const isXS = useMediaQuery({ maxWidth: breakpoints.sm })
	const isSM = useMediaQuery({ minWidth: breakpoints.sm })
	const isMD = useMediaQuery({ minWidth: breakpoints.md })
	const isLG = useMediaQuery({ minWidth: breakpoints.lg })
	const isXL = useMediaQuery({ minWidth: breakpoints.xl })
	const is2XL = useMediaQuery({ minWidth: breakpoints.xxl })

	return { isXS, isSM, isMD, isLG, isXL, is2XL }
}

export default useResponsive
