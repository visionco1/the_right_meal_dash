import { PageBreadcrumb } from '@/components'
import EditMenuContent from '@/features/menu/menu/edit'
import { useTranslation } from 'react-i18next'

const EditMenu = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('menu_management'), to: '' },
		{ name: t('menu'), to: '/menu-management/menu' },
		{ name: t('edit'), to: '' }
	]

	return (
		<>
			<PageBreadcrumb title={t('edit')} items={items} />
			<EditMenuContent />
		</>
	)
}

export default EditMenu
