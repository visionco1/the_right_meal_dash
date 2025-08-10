import { PageBreadcrumb } from '@/components'
import EditPlanContent from '@/features/plans-management/plans/edit'
import { useTranslation } from 'react-i18next'

const EditPlan = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('plans_management'), to: '' },
		{ name: t('plans'), to: '/plans-management/plans' },
		{ name: t('edit'), to: '' }
	]

	return (
		<>
			<PageBreadcrumb title={t('edit plan')} items={items} />
			<EditPlanContent />
		</>
	)
}

export default EditPlan
