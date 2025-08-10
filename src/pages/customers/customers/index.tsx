import { PageBreadcrumb } from '@/components'
import CustomersContent from '@/features/customers/customers'
import { useTranslation } from 'react-i18next'

const Customers = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('customers_management'), to: '' },
		{ name: t('customers'), to: '/customers-management/customers' }
	]
	return (
		<>
			<PageBreadcrumb title={t('customers')} items={items} />
			<CustomersContent />
		</>
	)
}

export default Customers
