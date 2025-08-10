import { PageBreadcrumb } from '@/components'
import Content from '@/features/settings/states'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ViewCountry = () => {
	const { id: countryId } = useParams()
	const { t } = useTranslation()
	const items = [
		{ name: t('settings'), to: '' },
		{ name: t('countries'), to: '/settings/countries' },
		{ name: `${countryId}`, to: `/settings/countries/${countryId}` }
	]

	return (
		<>
			<PageBreadcrumb title={t('states')} items={items} />
			<Content />
		</>
	)
}

export default ViewCountry
