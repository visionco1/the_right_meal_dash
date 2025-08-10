import { PageBreadcrumb } from '@/components'
import MealsContent from '@/features/menu/meal'
import { useTranslation } from 'react-i18next'

const Meals = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('menu_management'), to: '' },
		{ name: t('meals'), to: '/menu-management/meals' }
	]

	return (
		<>
			<PageBreadcrumb title={t('meals')} items={items} />
			<MealsContent />
		</>
	)
}

export default Meals
