import { PageBreadcrumb } from '@/components'
import EditMealContent from '@/features/menu/meal/edit'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const EditMeal = () => {
	const { id } = useParams()
	const { t } = useTranslation()
	const items = [
		{ name: t('menu_management'), to: '' },
		{ name: t('meals'), to: '/menu-management/meals' },
		{ name: `${id}`, to: '' }
	]
	return (
		<>
			<PageBreadcrumb title={t('edit')} items={items} />
			<EditMealContent />
		</>
	)
}

export default EditMeal
