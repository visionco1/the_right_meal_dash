import { PageBreadcrumb } from '@/components'
import AddMealContent from '@/features/menu/meal/add'
import { useTranslation } from 'react-i18next'

const AddMeal = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('menu_management'), to: '' },
		{ name: t('meals'), to: '/menu-management/meals' },
		{ name: t('add'), to: '' }
	]

	return (
		<>
			<PageBreadcrumb title={t('add')} items={items} />
			<AddMealContent />
		</>
	)
}

export default AddMeal
