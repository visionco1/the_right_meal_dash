import { PageBreadcrumb } from '@/components'
import Content from '@/features/delivery/zones'
import { useTranslation } from 'react-i18next'

const Zones = () => {
	const { t } = useTranslation()
	const title = t('zones')
	const items = [
		{ name: t('delivery_management'), to: '' },
		{ name: title, to: '/delivery-management/zones' }
	]

	return (
		<>
			<PageBreadcrumb title={title} items={items} />
			<Content />
		</>
	)
}

export default Zones
