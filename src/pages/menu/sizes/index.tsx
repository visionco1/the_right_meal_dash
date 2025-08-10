import { PageBreadcrumb } from '@/components'
import SizesContent from '@/features/menu/sizes'
import { useTranslation } from 'react-i18next'

const Sizes = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('menu_management'), to: '' },
		{ name: t('sizes'), to: '/menu-management/sizes' }
	]

	return (
		<>
			<PageBreadcrumb title={t('sizes')} items={items} />
			<SizesContent />
		</>
	)
}

export default Sizes
