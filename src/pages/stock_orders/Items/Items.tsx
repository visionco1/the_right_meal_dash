import { PageBreadcrumb } from '@/components'
import { useTranslation } from 'react-i18next'

const Items = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('stock_orders_management'), to: '/stock-orders-management/stock-orders' },
		{ name: t('items'), to: '/stock-orders-management/items' }
	]

	return (
		<>
			<PageBreadcrumb title={t('items')} items={items} />
		</>
	)
}

export default Items
