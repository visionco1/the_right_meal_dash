import { PageBreadcrumb } from '@/components'
import AddBranchContent from '@/features/settings/branches/add'
import { useTranslation } from 'react-i18next'
const AddBranch = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('settings'), to: '' },
		{ name: t('branches'), to: '/settings/branches' },
		{ name: t('add'), to: '' }
	]

	return (
		<>
			<PageBreadcrumb title={t('add_branch')} items={items} />
			<AddBranchContent />
		</>
	)
}

export default AddBranch
