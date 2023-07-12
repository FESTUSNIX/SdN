import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

export default function Home() {
	return (
		<div className='flex grow flex-col items-center justify-center py-24'>
			<div className='wrapper flex flex-col items-center text-center'>
				<h2 className='text-2xl font-bold sm:text-3xl md:text-4xl xl:text-5xl'>Studia dla Nauczycieli</h2>
				<h1 className='text-5xl font-black sm:text-6xl md:text-7xl xl:text-8xl'>Niedługo startujemy!</h1>
			</div>

			<div className='mt-24 flex w-full max-w-md flex-col items-center text-center'>
				<h3 className='mb-4'>Podaj swój adres email aby dowiedzieć się o starcie platformy jako pierwszy.</h3>

				<div className='wrapper flex flex-col gap-2 sm:flex-row sm:items-center'>
					<Input type='email' placeholder='Wprowadź swój adres email' className='' />
					<Button className='shrink-0 grow'>Powiadom mnie</Button>
				</div>
			</div>
		</div>
	)
}
