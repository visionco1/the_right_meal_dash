import { PageBreadcrumb } from '@/components'
import ViewRoleContent from '@/features/staff/roles/view'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ViewRole = () => {
	const { id } = useParams()
	const { t } = useTranslation()
	const items = [
		{ name: t('staff_management'), to: '' },
		{ name: t('roles'), to: '/staff-management/roles' },
		{ name: `${id}`, to: `/staff-management/roles/${id}` }
	]

	return (
		<>
			<PageBreadcrumb title={t('role_details')} items={items} />
			<ViewRoleContent />
		</>
	)
}

export default ViewRole
