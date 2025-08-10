import { PageBreadcrumb } from '@/components'
import Content from '@/features/settings/system-settings'
import { useTranslation } from 'react-i18next'

const SystemSettings = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('settings'), to: '' },
		{ name: t('system_settings'), to: '/settings/system-settings' }
	]

	return (
		<>
			<PageBreadcrumb title={t('system_settings')} items={items} />
			<Content />
		</>
	)
}

export default SystemSettings
