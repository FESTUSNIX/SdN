import UserAvatar from '@/app/components/UserAvatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/Table'
import prisma from '@/prisma/client'

type Props = {}

const AccountsList = async (props: Props) => {
	const accounts = await prisma.user.findMany({
		select: {
			id: true,
			email: true,
			name: true,
			image: true,
			role: true
		}
	})

	return (
		<div className='max-w-full overflow-x-auto'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-5'></TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead className='text-right'>Role</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{accounts.map(account => (
						<TableRow key={account.id}>
							<TableCell>
								<UserAvatar user={{ name: account.name, image: account.image }} className='h-5 w-5' />
							</TableCell>
							<TableCell>{account.name}</TableCell>
							<TableCell>{account.email}</TableCell>
							<TableCell className='text-right'>{account.role}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export default AccountsList
