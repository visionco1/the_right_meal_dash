import { PageBreadcrumb } from '@/components'
import CouponsContent from '@/features/marketing/coupons'
import { useTranslation } from 'react-i18next'

const Coupons = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('marketing_management'), to: '' },
		{ name: t('coupons'), to: '/marketing-management/coupons' }
	]
	return (
		<>
			<PageBreadcrumb title={t('coupons')} items={items} />
			<CouponsContent />
		</>
	)
}

export default Coupons
