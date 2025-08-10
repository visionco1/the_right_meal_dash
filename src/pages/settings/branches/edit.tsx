import { PageBreadcrumb } from '@/components'
import EditBranchContent from '@/features/settings/branches/edit'
import { useTranslation } from 'react-i18next'

const EditBranch = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('settings'), to: '' },
		{ name: t('branches'), to: '/settings/branches' },
		{ name: t('edit'), to: '' }
	]

	return (
		<>
			<PageBreadcrumb title={t('edit_branch')} items={items} />
			<EditBranchContent />
		</>
	)
}

export default EditBranch
