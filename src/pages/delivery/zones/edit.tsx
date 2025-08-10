import { PageBreadcrumb } from '@/components'
import EditZone from '@/features/delivery/zones/edit'
import { useTranslation } from 'react-i18next'

const EditZonePage = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('delivery_management'), to: '' },
		{ name: t('zones'), to: '/delivery-management/zones' },
		{ name: t('edit'), to: '' }
	]

	return (
		<>
			<PageBreadcrumb title={t('edit_zone')} items={items} />
			<EditZone />
		</>
	)
}

export default EditZonePage
