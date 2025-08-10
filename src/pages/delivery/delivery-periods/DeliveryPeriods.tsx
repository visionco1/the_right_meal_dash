import { PageBreadcrumb } from '@/components'
import Content from '@/features/delivery/delivery-periods'
import { useTranslation } from 'react-i18next'

const DeliveryPeriods = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('delivery_management'), to: '' },
		{ name: t('delivery_periods'), to: '/delivery-management/delivery-periods' }
	]

	return (
		<>
			<PageBreadcrumb title={t('delivery_periods')} items={items} />
			<Content />
		</>
	)
}

export default DeliveryPeriods
