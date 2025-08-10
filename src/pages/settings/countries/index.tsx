import { PageBreadcrumb } from '@/components'
import Content from '@/features/settings/countries'
import { useTranslation } from 'react-i18next'

const Countries = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('settings'), to: '' },
		{ name: t('countries'), to: '/settings/countries' }
	]

	return (
		<>
			<PageBreadcrumb title={t('countries')} items={items} />
			<Content />
		</>
	)
}

export default Countries
