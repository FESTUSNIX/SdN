'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/Card'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/app/components/ui/chart'
import { statistics as StatisticsType } from '@prisma/client'
import { format } from 'date-fns'
import React from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

type Props = {
	statistics: StatisticsType[]
}

export const DashboardChart = ({ statistics }: Props) => {
	const chartData: { date: string; majors: number; units: number }[] = statistics.map(stat => ({
		date: format(stat.date, 'yyyy-MM-dd'),
		majors: stat.majors_count,
		units: stat.units_count
	}))

	console.log(format(statistics[0].date, 'yyyy-MM-dd'))

	const chartConfig = {
		views: {
			label: 'Amount'
		},
		majors: {
			label: 'Majors',
			color: 'hsl(var(--chart-1))'
		},
		units: {
			label: 'Units',
			color: 'hsl(var(--chart-2))'
		}
	} satisfies ChartConfig

	const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>('majors')
	const total = React.useMemo(
		() => ({
			majors: chartData.reduce((acc, curr) => acc + curr.majors, 0),
			units: chartData.reduce((acc, curr) => acc + curr.units, 0)
		}),
		[]
	)

	return (
		<Card>
			<CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
				<div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
					<CardTitle>Last 30 days statistics</CardTitle>
					<CardDescription>Showing total major and unit amounts from the last month</CardDescription>
				</div>
				<div className='flex'>
					{['majors', 'units'].map(key => {
						const chart = key as keyof typeof chartConfig
						return (
							<button
								key={chart}
								data-active={activeChart === chart}
								className='flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
								onClick={() => setActiveChart(chart)}>
								<span className='text-xs text-muted-foreground'>{chartConfig[chart].label}</span>
								<span className='text-lg font-bold leading-none sm:text-3xl'>
									{total[key as keyof typeof total].toLocaleString()}
								</span>
							</button>
						)
					})}
				</div>
			</CardHeader>
			<CardContent className='px-2 sm:p-6'>
				<ChartContainer config={chartConfig} className='aspect-auto h-[250px] w-full'>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12
						}}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='date'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={value => {
								const date = new Date(value)
								return date.toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric'
								})
							}}
						/>
						<YAxis axisLine={false} tickLine={false} tickMargin={8} />
						<ChartTooltip
							content={
								<ChartTooltipContent
									className='w-[150px]'
									nameKey='views'
									labelFormatter={value => {
										return new Date(value).toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric',
											year: 'numeric'
										})
									}}
								/>
							}
						/>
						<Line
							dataKey={activeChart}
							type='linear'
							stroke={`var(--color-${activeChart})`}
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
