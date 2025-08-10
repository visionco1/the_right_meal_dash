import { PageBreadcrumb } from '@/components'

const Wallet = () => {
	const items = [
		{ name: 'Wallet Management', to: '/wallet-management/wallet' },
		{ name: 'wallet', to: '/wallet-management/wallet' }
	]

	return (
		<>
			<PageBreadcrumb title="Wallet Management" items={items} />
			<div className="flex flex-col gap-6">
				<div className="card p-5"></div>
			</div>
		</>
	)
}

export default Wallet
