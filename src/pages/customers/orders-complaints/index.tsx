import { PageBreadcrumb } from '@/components'
import ComplaintsContent from '@/features/customers/complaints'
import { useTranslation } from 'react-i18next'

const OrdersComplaints = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('customers_management'), to: '' },
		{ name: t('orders_complaints'), to: '/customers-management/orders-complaints' }
	]
	return (
		<>
			<PageBreadcrumb title={t('orders_complaints')} items={items} />
			<ComplaintsContent />
		</>
	)
}

export default OrdersComplaints
