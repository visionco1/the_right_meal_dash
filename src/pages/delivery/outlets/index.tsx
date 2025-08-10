import { useTranslation } from 'react-i18next'
import { PageBreadcrumb } from '@/components'
import Outlets from '@/features/delivery/outlets'

const QualityControlPage = () => {
	const { t } = useTranslation()
	const title = t('outlets')
	const items = [
		{ name: t('delivery_management'), to: '' },
		{ name: title, to: '/delivery-management/outlets' }
	]

	return (
		<>
			<PageBreadcrumb title={title} items={items} />
			<Outlets />
		</>
	)
}

export default QualityControlPage
