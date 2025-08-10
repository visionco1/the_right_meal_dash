import { PageBreadcrumb } from '@/components'
import RolesContent from '@/features/staff/permissions'
import { useTranslation } from 'react-i18next'

const RolesPermissions = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('staff_management'), to: '' },
		{ name: t('roles'), to: '/staff-management/roles' }
	]
	return (
		<>
			<PageBreadcrumb title={t('roles')} items={items} />
			<RolesContent />
		</>
	)
}

export default RolesPermissions
