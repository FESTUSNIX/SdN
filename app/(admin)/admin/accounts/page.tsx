import { H1 } from '@/app/components/ui/Typography'
import AccountsList from './components/AccountsList'
import NewAccountBtn from './components/NewAccountBtn'

const AccountsPage = () => {
	return (
		<div className='wrapper flex min-h-screen flex-1 flex-col pt-12'>
			<H1 size='sm' className='mb-6'>
				Manage accounts
			</H1>

			<div className='py-4'>
				<div className='mb-6'>
					<div className='ml-auto w-max'>
						<NewAccountBtn />
					</div>
				</div>

				<AccountsList />
			</div>
		</div>
	)
}

export default AccountsPage
