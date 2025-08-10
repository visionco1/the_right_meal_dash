import { PageBreadcrumb } from '@/components'
import EditNutritionContent from '@/features/menu/nutrition-facts/edit'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const EditNutritionFacts = () => {
	const { id } = useParams()
	const { t } = useTranslation()
	const items = [
		{ name: t('menu_management'), to: '' },
		{ name: t('nutrition_facts'), to: '/menu-management/nutrition-facts' },
		{ name: `${id}`, to: '' }
	]
	return (
		<>
			<PageBreadcrumb title={t('edit')} items={items} />
			<EditNutritionContent />
		</>
	)
}

export default EditNutritionFacts
