import { PageBreadcrumb } from '@/components'
import Content from '@/features/settings/cities'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ViewState = () => {
	const { id: country_id, state_id } = useParams()
	const { t } = useTranslation()
	const items = [
		{ name: t('settings'), to: '' },
		{ name: t('countries'), to: '/settings/countries' },
		{ name: `${country_id}`, to: `/settings/countries/${country_id}` },
		{ name: `${state_id}`, to: `/settings/countries/${country_id}/state/${state_id}` }
	]

	return (
		<>
			<PageBreadcrumb title={t('cities')} items={items} />
			<Content />
		</>
	)
}

export default ViewState
