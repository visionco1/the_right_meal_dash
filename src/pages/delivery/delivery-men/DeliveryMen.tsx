import { PageBreadcrumb } from '@/components'
import Content from '@/features/delivery/delivery-men'
import { useTranslation } from 'react-i18next'

const DeliveryMen = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('delivery_management'), to: '' },
		{ name: t('delivery_men'), to: '/delivery-management/delivery-men' }
	]

	return (
		<>
			<PageBreadcrumb title={t('delivery_men')} items={items} />
			<Content />
		</>
	)
}

export default DeliveryMen
