import { PageBreadcrumb } from '@/components'
import OrdersContent from '@/features/customers/orders'
import { useTranslation } from 'react-i18next'

const Orders = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('customers_management'), to: '' },
		{ name: t('orders'), to: '/customers-management/orders' }
	]

	return (
		<>
			<PageBreadcrumb title={t('orders')} items={items} />
			<OrdersContent />
		</>
	)
}

export default Orders
