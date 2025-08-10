import { PageBreadcrumb } from '@/components'
import ViewZone from '@/features/delivery/zones/view'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ViewZonePage = () => {
	const { id } = useParams()
	const { t } = useTranslation()
	const items = [
		{ name: t('delivery_management'), to: '' },
		{ name: t('zones'), to: '/delivery-management/zones' },
		{ name: `${id}`, to: '' }
	]
	return (
		<>
			<PageBreadcrumb title={t('zone_details')} items={items} />
			<ViewZone />
		</>
	)
}

export default ViewZonePage
