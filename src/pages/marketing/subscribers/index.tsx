import { PageBreadcrumb } from '@/components'
import SubscribersContent from '@/features/marketing/subscribers'
import { useTranslation } from 'react-i18next'

const Subscribers = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('marketing_management'), to: '' },
		{ name: t('subscribers'), to: '/marketing-management/subscribers' }
	]
	return (
		<>
			<PageBreadcrumb title={t('subscribers')} items={items} />
			<SubscribersContent />
		</>
	)
}

export default Subscribers
