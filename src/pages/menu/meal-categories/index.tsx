import { PageBreadcrumb } from '@/components'
import MealCategoriesContent from '@/features/menu/meal-categories'
import { useTranslation } from 'react-i18next'

const MealCategories = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('menu_management'), to: '' },
		{ name: t('meal_categories'), to: '/menu-management/meal-categories' }
	]

	return (
		<>
			<PageBreadcrumb title={t('meal_categories')} items={items} />
			<MealCategoriesContent />
		</>
	)
}

export default MealCategories
