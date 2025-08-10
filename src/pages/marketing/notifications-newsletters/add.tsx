import { PageBreadcrumb } from '@/components'
import AddNotificationContent from '@/features/marketing/notifications/add'
import { useTranslation } from 'react-i18next'

const NotificationsNewsletters = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('marketing_management'), to: '' },
		{ name: t('notifications_newsletters'), to: '/marketing-management/notifications' },
		{ name: t('add'), to: '' }
	]

	return (
		<>
			<PageBreadcrumb title={t('add')} items={items} />
			<AddNotificationContent />
		</>
	)
}

export default NotificationsNewsletters
