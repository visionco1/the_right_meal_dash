import { PageBreadcrumb } from '@/components'
import AddCouponContent from '@/features/marketing/coupons/add'
import { useTranslation } from 'react-i18next'

const AddCoupon = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('marketing_management'), to: '' },
		{ name: t('coupons'), to: '/marketing-management/coupons' },
		{ name: t('add'), to: '' }
	]
	return (
		<>
			<PageBreadcrumb title={t('add')} items={items} />
			<AddCouponContent />
		</>
	)
}

export default AddCoupon
