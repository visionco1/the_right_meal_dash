import { PageBreadcrumb } from '@/components'
import { useTranslation } from 'react-i18next'

const StockOrders = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('stock_orders_management'), to: '/stock-orders-management/stock-orders' },
		{ name: t('stock_orders'), to: '/stock-orders-management/stock-orders' }
	]

	return (
		<>
			<PageBreadcrumb title={t('stock_orders')} items={items} />
		</>
	)
}

export default StockOrders
