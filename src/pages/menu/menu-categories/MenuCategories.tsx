import { PageBreadcrumb } from '@/components'
import { useTranslation } from 'react-i18next'

const MenuCategories = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('menu_management'), to: '' },
		{ name: t('menu_categories'), to: '/menu-management/menu-categories' }
	]
	return (
		<>
			<PageBreadcrumb title={t('menu_categories')} items={items} />
		</>
	)
}

export default MenuCategories
