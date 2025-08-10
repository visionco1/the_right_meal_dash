import { PageBreadcrumb } from '@/components'
import BannersContent from '@/features/marketing/banners'
import { useTranslation } from 'react-i18next'

const Banners = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('marketing_management'), to: '' },
		{ name: 'Banners', to: '/marketing-management/banners' }
	]
	return (
		<>
			<PageBreadcrumb title="Banners" items={items} />
			<BannersContent />
		</>
	)
}

export default Banners
