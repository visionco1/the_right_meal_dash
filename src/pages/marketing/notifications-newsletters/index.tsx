import { PageBreadcrumb } from '@/components'
import NotificationsContent from '@/features/marketing/notifications'
import { useTranslation } from 'react-i18next'

const NotificationsNewsletters = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('marketing_management'), to: '' },
		{ name: t('notifications_newsletters'), to: '/marketing-management/notifications' }
	]

	return (
		<>
			<PageBreadcrumb title={t('notifications_newsletters')} items={items} />
			<NotificationsContent />
		</>
	)
}

export default NotificationsNewsletters
