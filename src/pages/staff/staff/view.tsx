import { PageBreadcrumb } from '@/components'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ViewStaff from '@/features/staff/staff/view'

const ViewAdmin = () => {
	const { id } = useParams()
	const { t } = useTranslation()
	const items = [
		{ name: t('staff_management'), to: '' },
		{ name: t('staff'), to: '/staff-management/staff' },
		{ name: `${id}`, to: `/staff-management/staff/${id}` }
	]

	return (
		<>
			<PageBreadcrumb title={t('staff_details')} items={items} />
			<ViewStaff />
		</>
	)
}

export default ViewAdmin
