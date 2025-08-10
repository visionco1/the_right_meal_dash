import { PageBreadcrumb } from '@/components'
import AddPlanContent from '@/features/plans-management/plans/add'
import { useTranslation } from 'react-i18next'

const AddPlan = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('plans_management'), to: '' },
		{ name: t('plans'), to: '/plans-management/plans' },
		{ name: t('add'), to: '' }
	]

	return (
		<>
			<PageBreadcrumb title={t('add plan')} items={items} />
			<AddPlanContent />
		</>
	)
}

export default AddPlan
