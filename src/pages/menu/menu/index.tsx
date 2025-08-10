import { PageBreadcrumb } from '@/components'
import MenuContent from '@/features/menu/menu'
import { useTranslation } from 'react-i18next'
const Menu = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('menu_management'), to: '' },
		{ name: t('menu'), to: '/menu-management/menu' }
	]

	return (
		<>
			<PageBreadcrumb title={t('menu')} items={items} />
			<MenuContent />
		</>
	)
}

export default Menu
