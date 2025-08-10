import { PageBreadcrumb } from '@/components'
import SubscriptionPlansContent from '@/features/plans-management/plans'
import { useTranslation } from 'react-i18next'

const SubscriptionsPlans = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('plans_management'), to: '' },
		{ name: t('plans'), to: '/plans-management/plans' }
	]

	return (
		<>
			<PageBreadcrumb title={t('plans')} items={items} />
			<SubscriptionPlansContent />
		</>
	)
}

export default SubscriptionsPlans
