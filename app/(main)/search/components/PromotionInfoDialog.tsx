import { Button } from '@/app/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/app/components/ui/dialog'
import { Separator } from '@/app/components/ui/separator'
import { CircleHelpIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {}

export const PromotionInfoDialog = (props: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size={'iconSm'} variant={'ghost'} className='text-muted-foreground'>
					<CircleHelpIcon className='size-5' />
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-xl'>
				<DialogHeader>
					<DialogTitle>Informacje o promocji kierunków</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>

				<div className='tw-prose'>
					<p>
						Kierunki promowane to kierunki, które wyświetlane są na początku listy wyników wyszukiwania. Są one
						wyróżnione, ponieważ uczelnia wykupiła promocję oferty.
					</p>

					<p className='!mb-1'>Wyświetlamy Ci tę reklamę na podstawie:</p>
					<ul>
						<li>Zastosowanych filtrów</li>
						<li>Wpisanych haseł w wyszukiwarce</li>
					</ul>

					<Separator className='mt-6' />

					<p className='!mb-0'>
						Chcesz wyróżnić swoje kierunki? <Link href='/pricing'>Sprawdź naszą ofertę</Link>
					</p>
				</div>
			</DialogContent>
		</Dialog>
	)
}
