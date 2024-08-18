import { ScrollArea } from '@/app/components/ui/scroll-area'
import { cn } from '@/lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

const AdminWrapper = ({ children, className }: Props) => {
	return <ScrollArea className={cn('max-h-screen w-full flex-1 md:px-6', className)}>{children}</ScrollArea>
}

export default AdminWrapper
