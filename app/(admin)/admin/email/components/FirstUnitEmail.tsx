import { Major, Qualification, Unit } from '@prisma/client'
import {
	Body,
	Container,
	Font,
	Head,
	Hr,
	Html,
	Img,
	Preview,
	Row,
	Section,
	Tailwind,
	Text
} from '@react-email/components'
import * as React from 'react'

type Props = {
	majors: (Major & { qualifications: Pick<Qualification, 'name'>[] })[]
	unit: Unit
}

export const FirstUnitEmail = ({ majors, unit }: Props) => {
	return (
		<Tailwind config={tailwindConfig}>
			<Html>
				<Head>
					<Font
						fontFamily='Outfit'
						fallbackFontFamily='Arial'
						webFont={{
							url: 'https://fonts.gstatic.com/s/outfit/v11/QGYvz_MVcBeNP4NJuktqQ4E.woff2',
							format: 'woff2'
						}}
						fontWeight={400}
						fontStyle='normal'
					/>
					<style>{`
							ul {
								padding-left: 1.625em;
							}
							li {
								margin-top: 0.125rem;
								margin-bottom: 0.125rem;
								padding-left: 0.375em;
							}
							h2 {
								scroll-margin: 80px,
								padding-bottom: 8px,
								font-size: 24px,
								line-height: 32px,
								font-weight: 500
							}
							

					`}</style>
				</Head>

				<Preview>Hello this is preview text</Preview>

				<Body className='bg-background text-foreground' style={{ fontFamily: `Outfit, sans-serif` }}>
					<Section>
						<Container>
							<Section style={{ backgroundColor: '#3361cc' }}>
								<Img
									src={
										'https://hdwhiwewvgvllyhftczq.supabase.co/storage/v1/object/public/share/wordmark-horizontal-white@512.png'
									}
									width='500'
									height='500'
									style={{ margin: 'auto', width: '250px', maxWidth: '100%', padding: '32px 16px', height: 'auto' }}
									alt='Studia dla Nauczycieli'
								/>
							</Section>
							<Section className='mt-8'>
								<Row>
									<h1 className='scroll-m-20 text-3xl font-semibold tracking-tight'>Lorem ipsum dolor</h1>
									<h2 style={h2}>
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ab ex culpa est earum repellendus.
									</h2>
									<Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, ut.</Text>
									<Text>
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, dignissimos. Ipsam, et? Vel
										iusto, animi ex magnam recusandae culpa pariatur!
									</Text>
								</Row>
							</Section>

							<Hr />

							<Section className='tw-prose prose'>
								<h2 style={{ ...h2, margin: '16px 0' }}>Unit data</h2>

								<ul className='list-disc'>
									{Object.entries(unit).map(([key, value]) => (
										<li key={key}>
											<span>{key}: </span>
											<span>{value?.toString()}</span>
										</li>
									))}
								</ul>

								<Text>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, dignissimos. Ipsam, et? Vel iusto,
									animi ex magnam recusandae culpa pariatur!
								</Text>
							</Section>

							<Hr />

							<Section>
								<h2 style={{ ...h2, margin: '16px 0' }}>Majors</h2>

								<div className='mt-6 grid'>
									<table className={'block max-w-full border-collapse overflow-x-auto'}>
										<thead>
											<Tr>
												{['Nazwa kierunku', 'Uprawnienia'].map((key, i) => (
													<th
														key={i}
														style={{
															borderWidth: '1px',
															borderStyle: 'solid',
															borderColor: '#e5e5e5',
															borderCollapse: 'collapse',
															padding: '16px 8px',
															textAlign: 'start'
														}}>
														<Text style={{ margin: '0', padding: '0' }}>{key}</Text>
													</th>
												))}
											</Tr>
										</thead>

										<tbody>
											{majors.map((item, i) => (
												<Tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f5f5f5' : '#ffffff' }}>
													<Td key={i}>
														<Text style={{ margin: '0', padding: '0' }}>{item.name}</Text>
													</Td>
													<Td key={i}>
														<Text style={{ margin: '0', padding: '0' }}>
															{item.qualifications.map((qualification, i, items) => (
																<span key={i}>
																	{qualification.name} {i !== items.length - 1 && ','}
																</span>
															))}
														</Text>
													</Td>
												</Tr>
											))}
										</tbody>
									</table>
								</div>
							</Section>
						</Container>
					</Section>
				</Body>
			</Html>
		</Tailwind>
	)
}

export default FirstUnitEmail

const Td = ({
	children,
	className,
	style
}: {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
}) => {
	return (
		<td
			className={className}
			style={{
				...style,
				borderWidth: '1px',
				borderStyle: 'solid',
				borderColor: '#e5e5e5',
				borderCollapse: 'collapse',
				padding: '16px 8px',
				textAlign: 'start',
				minWidth: '200px'
			}}>
			{children}
		</td>
	)
}
const Tr = ({
	children,
	className,
	style
}: {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
}) => {
	return (
		<tr
			className={className}
			style={{
				...style,
				borderWidth: '1px',
				borderStyle: 'solid',
				borderColor: '#e5e5e5',
				borderCollapse: 'collapse'
			}}>
			{children}
		</tr>
	)
}

const h2 = {
	scrollMargin: '80px',
	paddingBottom: '8px',
	fontSize: '24px',
	lineHeight: '32px',
	fontWeight: 500
}

const tailwindConfig = {
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						ul: {
							marginTop: 0,
							marginBottom: 0,
							listStyleType: 'none',
							'> li': {
								marginTop: '0.125rem',
								marginBottom: '0.125rem',
								'&::before': {
									content: "'•'",
									marginRight: '0.375rem',
									color: 'inherit'
								}
							}
						}
					}
				}
			},
			colors: {
				border: 'hsl(0 0% 89.8%)',
				input: 'hsl(0 0% 89.8%)',
				ring: 'hsl(0 0% 63.9%)',
				background: 'hsl(0 0% 100%)',
				foreground: 'hsl( 0 0% 3.9%)',
				primary: {
					DEFAULT: 'hsl(222 60% 50%)',
					foreground: 'hsl(222 100% 97.5%)'
				},
				secondary: {
					DEFAULT: 'hsl(0 0% 96.1%)',
					foreground: 'hsl(0 0% 96.1%)'
				},
				destructive: {
					DEFAULT: 'hsl(0 84.2% 60.2%)',
					foreground: 'hsl(0 0% 98%)'
				},
				muted: {
					DEFAULT: 'hsl(0 0% 96.1%)',
					foreground: 'hsl(0 0% 45.1%)'
				}
			},
			borderRadius: {
				lg: '0.5rem',
				md: 'calc(0.5rem - 2px)',
				sm: 'calc(0.5rem - 4px)'
			}
		}
	}
}
