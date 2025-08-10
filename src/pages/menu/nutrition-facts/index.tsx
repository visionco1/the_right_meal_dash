import { PageBreadcrumb } from '@/components'
import NutritionFactsContent from '@/features/menu/nutrition-facts'
import { useTranslation } from 'react-i18next'

const NutritionFacts = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('menu_management'), to: '' },
		{ name: t('nutrition_facts'), to: '/menu-management/nutrition-facts' }
	]
	return (
		<>
			<PageBreadcrumb title={t('nutrition_facts')} items={items} />
			<NutritionFactsContent />
		</>
	)
}

export default NutritionFacts
