import { PageBreadcrumb } from '@/components'
import ViewMenuContent from '@/features/menu/menu/view'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ViewMenu = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('menu_management'), to: '' },
		{ name: 'Menu', to: '/menu-management/menu' },
		{ name: 'View', to: '' }
	]
	const { id } = useParams()
	return (
		<>
			<PageBreadcrumb title={t('menu_details')} items={items} />
			<ViewMenuContent />
		</>
	)
}

export default ViewMenu
