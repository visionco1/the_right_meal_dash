import { PageBreadcrumb } from '@/components'
import Content from '@/features/settings/branches'
import { useTranslation } from 'react-i18next'
const Branches = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('settings'), to: '' },
		{ name: t('branches'), to: '/settings/branches' }
	]

	return (
		<>
			<PageBreadcrumb title={t('branches')} items={items} />
			<Content />
		</>
	)
}

export default Branches
