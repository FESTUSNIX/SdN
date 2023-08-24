import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { cn } from '@/lib/utils/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

const AdminWrapper = ({ children, className }: Props) => {
	return <ScrollArea className={cn('max-h-screen w-full flex-1 md:px-6', className)}>{children}</ScrollArea>
}

export default AdminWrapper
