import { PageBreadcrumb } from '@/components'
import StaffContent from '@/features/staff/staff'
import { useTranslation } from 'react-i18next'

const Staff = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('staff_management'), to: '' },
		{ name: t('staff'), to: '/staff-management/staff' }
	]

	return (
		<>
			<PageBreadcrumb title={t('staff')} items={items} />
			<StaffContent />
		</>
	)
}

export default Staff
