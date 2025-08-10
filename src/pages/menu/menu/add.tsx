import { PageBreadcrumb } from '@/components'
import AddMenuContent from '@/features/menu/menu/add'
import { useTranslation } from 'react-i18next'

const AddMenu = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('menu_management'), to: '' },
		{ name: t('menu'), to: '/menu-management/menu' },
		{ name: t('add'), to: '/menu-management/menu/add' }
	]

	return (
		<>
			<PageBreadcrumb title={t('add')} items={items} />
			<AddMenuContent />
		</>
	)
}

export default AddMenu
