import { Loading } from '@/components/ui/Loading'
import { useCreateCoupon } from './hooks'
import { Card, CardBody } from '@/components/ui/card'
import CouponsForm from './form'

const AddCouponContent = () => {
	const { createLoading, handleChange, handleSubmit, data } = useCreateCoupon()

	return (
		<Card>
			<CardBody>
				{createLoading && <Loading />}
				<CouponsForm data={data} handleSubmit={handleSubmit} handleChange={handleChange} />
			</CardBody>
		</Card>
	)
}

export default AddCouponContent
