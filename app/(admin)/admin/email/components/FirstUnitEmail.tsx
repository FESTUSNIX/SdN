import { Major } from '@prisma/client'
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

type MAJOR_KEYS = keyof Major

export const FirstUnitEmail = ({ majors }: { majors: Major[] }) => {
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
							li::before {
								content: attr(data-bullet);
								margin-right: 0.375rem;
								color: inherit;
							}

					`}</style>
				</Head>

				<Preview>Hello this is preview text</Preview>

				<Body className='bg-background text-foreground' style={{ fontFamily: `Outfit, sans-serif` }}>
					<Section>
						<Container>
							<Section className='bg-primary'>
								<Img
									src={'/wordmark-horizontal-white@512.png'}
									width='300'
									height='300'
									className='mx-auto h-auto w-[250px] max-w-full py-8'
									alt='Studia dla Nauczycieli'
								/>
							</Section>
							<Section className='mt-8'>
								<Row>
									<h1 className='scroll-m-20 text-3xl font-semibold tracking-tight'>Lorem ipsum dolor</h1>
									<h2 className={h2}>
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
								<h2 className={'mb-4 mt-4' + h2}>Unit data</h2>

								<ul className='prose'>
									{['name', 'email', 'phone', 'isPublic', 'website', 'unitType', 'logo', 'nip', 'regon'].map(
										(key, i) => (
											<li key={i} data-bullet='•'>
												<span>{key}</span>
											</li>
										)
									)}
								</ul>

								<Text>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, dignissimos. Ipsam, et? Vel iusto,
									animi ex magnam recusandae culpa pariatur!
								</Text>
							</Section>

							<Hr />

							<Section className=''>
								<h2 className={'mb-4 mt-4 ' + h2}>Majors</h2>

								<div className='mt-6 grid'>
									<table className={'block max-w-full border-collapse overflow-x-auto'}>
										<thead>
											<Tr>
												{Object.keys(majors[0]).map((key: any, i) => (
													<th key={i} className={'px-4 py-2 text-start ' + tableBorder}>
														<Text className='m-0 p-0'>{key}</Text>
													</th>
												))}
											</Tr>
										</thead>

										<tbody>
											{majors.map((item, i) => (
												<Tr key={i} className={i % 2 === 0 ? 'bg-muted' : ''}>
													{/* <>{console.log(Object.keys(item))}</> */}
													{Object.keys(item).map((key, i) => (
														<Td key={i}>
															<Text className='m-0 p-0'>{JSON.stringify(item[key as MAJOR_KEYS])}</Text>
														</Td>
													))}
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

const Td = ({ children, className }: { children: React.ReactNode; className?: string }) => {
	return <td className={td + ' ' + className}>{children}</td>
}
const Tr = ({ children, className }: { children: React.ReactNode; className?: string }) => {
	return <tr className={tr + ' ' + className}>{children}</tr>
}

const td = 'border border-solid border-border border-collapse px-4 py-2 text-start min-w-[200px]'
const tr = 'border border-solid border-border border-collapse'

const tableBorder = 'border border-solid border-border border-collapse'

const h2 = 'text-2xl font-medium scroll-m-20 pb-2 tracking-tight transition-colors first:mt-0'

const xd = (
	<div className='before-[xd] my-[0.125rem] before:mr-[0.375rem] before:text-inherit before:content-[xd]'></div>
)

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
