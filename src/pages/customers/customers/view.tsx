import { PageBreadcrumb } from '@/components'
import ViewContent from '@/features/customers/customers/view'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const CustomerHealth = () => {
	const { id } = useParams()
	const { t } = useTranslation()
	const items = [
		{ name: t('customers_management'), to: '/customers-management/customers' },
		{ name: t('customers_health'), to: `/customers-management/customers/${id}` }
	]
	return (
		<>
			<PageBreadcrumb title={t('customers_health')} items={items} />
			<ViewContent />
		</>
	)
}

export default CustomerHealth
