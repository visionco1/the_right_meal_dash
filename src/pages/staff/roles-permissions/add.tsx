import { PageBreadcrumb } from '@/components'
import AddRoleContent from '@/features/staff/roles/add'
import { useTranslation } from 'react-i18next'

const AddRole = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('staff_management'), to: '' },
		{ name: t('roles'), to: '/staff-management/roles' },
		{ name: t('add'), to: '/staff-management/roles/add' }
	]

	return (
		<>
			<PageBreadcrumb title={t('add')} items={items} />
			<AddRoleContent />
		</>
	)
}

export default AddRole
