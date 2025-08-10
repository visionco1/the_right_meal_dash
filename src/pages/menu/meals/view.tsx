import { PageBreadcrumb } from '@/components'
import ViewMealContent from '@/features/menu/meal/view'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ViewMeal = () => {
	const { t } = useTranslation()
	const { id } = useParams()
	const items = [
		{ name: t('menu_management'), to: '' },
		{ name: t('meals'), to: '/menu-management/meals' },
		{ name: `${id}`, to: '' }
	]
	return (
		<>
			<PageBreadcrumb title={t('meal_details')} items={items} />
			<ViewMealContent />
		</>
	)
}

export default ViewMeal
