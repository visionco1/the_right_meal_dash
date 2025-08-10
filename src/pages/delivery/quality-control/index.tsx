import { useTranslation } from 'react-i18next'
import { PageBreadcrumb } from '@/components'
import QualityControl from '@/features/delivery/quality-control'

const QualityControlPage = () => {
	const { t } = useTranslation()
	const title = t('quality control')
	const items = [
		{ name: t('delivery_management'), to: '' },
		{ name: title, to: '/delivery-management/quality-control' }
	]

	return (
		<>
			<PageBreadcrumb title={title} items={items} />
			<QualityControl />
		</>
	)
}

export default QualityControlPage
