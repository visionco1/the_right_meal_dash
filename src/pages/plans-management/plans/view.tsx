import { PageBreadcrumb } from '@/components'
import ViewPlanContent from '@/features/plans-management/plans/view'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ViewPlan = () => {
	const { t } = useTranslation()
	const { id } = useParams()
	const items = [
		{ name: t('plans_management'), to: '' },
		{ name: t('plans'), to: '/plans-management/plans' },
		{ name: `${id}`, to: '' }
	]

	return (
		<>
			<PageBreadcrumb title={t('plan_details')} items={items} />
			<ViewPlanContent />
		</>
	)
}

export default ViewPlan
