import { Loading } from '@/components/ui/Loading'
import { useUpdateCoupon } from './hooks'
import { Card, CardBody } from '@/components/ui/card'
import CouponsForm from './form'

const EditCouponContent = () => {
	const { updateLoading, handleChange, showLoading, data, handleSubmit } = useUpdateCoupon()

	return (
		<Card>
			<CardBody>
				{(updateLoading || showLoading) && <Loading />}
				<CouponsForm data={data} handleSubmit={handleSubmit} handleChange={handleChange} />
			</CardBody>
		</Card>
	)
}

export default EditCouponContent
