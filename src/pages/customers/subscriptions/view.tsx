import { PageBreadcrumb } from '@/components'
import ViewSubscriptionContent from '@/features/customers/subscriptions/view'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
const ViewSubscription = () => {
	const { id } = useParams()
	const { t } = useTranslation()
	const items = [
		{ name: t('customers_management'), to: '' },
		{ name: t('subscriptions'), to: '/customers-management/subscriptions' },
		{ name: `${id}`, to: '' }
	]

	return (
		<>
			<PageBreadcrumb title={t('subscription_details')} items={items} />
			<ViewSubscriptionContent />
		</>
	)
}

export default ViewSubscription
