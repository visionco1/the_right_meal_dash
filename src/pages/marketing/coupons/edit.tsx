import { PageBreadcrumb } from '@/components'
import EditCouponContent from '@/features/marketing/coupons/edit'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const EditCoupon = () => {
	const { t } = useTranslation()
	const { id } = useParams()
	const items = [
		{ name: t('marketing_management'), to: '' },
		{ name: t('coupons'), to: '/marketing-management/coupons' },
		{ name: `${id}`, to: '' }
	]
	return (
		<>
			<PageBreadcrumb title={t('edit')} items={items} />
			<EditCouponContent />
		</>
	)
}

export default EditCoupon
