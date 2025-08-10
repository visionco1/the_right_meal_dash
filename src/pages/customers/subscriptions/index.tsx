import { PageBreadcrumb } from '@/components'
import SubscriptionsContent from '@/features/customers/subscriptions'
import { useTranslation } from 'react-i18next'

const Subscriptions = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('customers_management'), to: '' },
		{ name: t('subscriptions'), to: '/customers-management/subscriptions' }
	]

	return (
		<>
			<PageBreadcrumb title={t('subscriptions')} items={items} />
			<SubscriptionsContent />
		</>
	)
}

export default Subscriptions
