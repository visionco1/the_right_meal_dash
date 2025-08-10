import { PageBreadcrumb } from '@/components'
import UpdateRoleContent from '@/features/staff/roles/update'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const UpdateRole = () => {
	const { id } = useParams()
	const { t } = useTranslation()
	const items = [
		{ name: t('staff_management'), to: '' },
		{ name: t('roles'), to: '/staff-management/roles' },
		{ name: `${id}`, to: `/staff-management/roles/${id}` }
	]

	return (
		<>
			<PageBreadcrumb title={t('edit')} items={items} />
			<UpdateRoleContent />
		</>
	)
}

export default UpdateRole
