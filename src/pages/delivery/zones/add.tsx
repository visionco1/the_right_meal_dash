import { PageBreadcrumb } from '@/components'
import AddZone from '@/features/delivery/zones/add'
import { useTranslation } from 'react-i18next'

const AddZonePage = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('delivery_management'), to: '' },
		{ name: t('zones'), to: '/delivery-management/zones' },
		{ name: t('add'), to: '' }
	]

	return (
		<>
			<PageBreadcrumb title={t('add_zone')} items={items} />
			<AddZone />
		</>
	)
}

export default AddZonePage
