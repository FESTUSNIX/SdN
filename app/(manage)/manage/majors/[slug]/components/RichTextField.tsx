import EditorOutput from '@/app/components/EditorOutput'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/app/components/ui/Dialog'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { type Prisma } from '@prisma/client'

type Props = {
	content: Prisma.JsonValue
	name: string
}

const RichTextField = ({ content, name }: Props) => {
	if (!(typeof content === 'object' && content?.length)) return <div>Brak danych</div>

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className='mt-4 cursor-pointer'>
					<span className='sr-only'>Kliknij aby przeczytać</span>
					<div className='relative max-h-32 overflow-hidden rounded-md border px-3 py-2'>
						<div className='pointer-events-none origin-top-left scale-75 select-none' aria-hidden>
							<EditorOutput content={content} />
						</div>
						<div className='absolute bottom-0 h-3/4 w-full bg-gradient-to-t from-background from-5% via-background/80 to-background/0' />
					</div>
				</div>
			</DialogTrigger>
			<DialogContent className='flex h-full flex-col gap-0 p-0 sm:max-h-[calc(100vh-8rem)] md:!max-w-[700px] lg:!max-w-[900px]'>
				<DialogHeader className='border-b p-6 pb-4'>
					<DialogTitle>{name}</DialogTitle>
				</DialogHeader>

				<ScrollArea className='max-h-full grow px-6'>
					<EditorOutput content={content} />
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}

export default RichTextField
