import { PageBreadcrumb } from '@/components'
import AllergensContent from '@/features/menu/allergens'
import { useTranslation } from 'react-i18next'

const Allergens = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('menu_management'), to: '' },
		{ name: t('allergens'), to: '/menu-management/allergens' }
	]

	return (
		<>
			<PageBreadcrumb title={t('allergens')} items={items} />
			<AllergensContent />
		</>
	)
}

export default Allergens
