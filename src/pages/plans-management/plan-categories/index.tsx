import { PageBreadcrumb } from '@/components'
import PlanCategoriesContent from '@/features/plans-management/plan-categories'
import { useTranslation } from 'react-i18next'

const PlanCategories = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('plans_management'), to: '' },
		{ name: t('plan_categories'), to: '/plans-management/plan-categories' }
	]

	return (
		<>
			<PageBreadcrumb title={t('plan_categories')} items={items} />
			<PlanCategoriesContent />
		</>
	)
}

export default PlanCategories
