import { PageBreadcrumb } from '@/components'
import ViewOrderContent from '@/features/customers/orders/view'
import { useTranslation } from 'react-i18next'

const ViewOrder = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('customers_management'), to: '' },
		{ name: t('orders'), to: '/customers-management/orders' },
		{ name: t('order_details'), to: '' }
	]

	return (
		<>
			<PageBreadcrumb title={t('order_details')} items={items} />
			<ViewOrderContent />
		</>
	)
}

export default ViewOrder
