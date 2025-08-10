import { Loading } from '@/components/ui/Loading'
import PlanForm from './form'
import { useCreateSubscriptionPlan } from './hooks'
import { Card, CardBody } from '@/components/ui/card'

const AddPlanContent = () => {
	const { createLoading, handleSubmit, handleChange, data } = useCreateSubscriptionPlan()
	return (
		<Card>
			<CardBody>
				{createLoading && <Loading />}
				<PlanForm data={data} handleSubmit={handleSubmit} handleChange={handleChange} />
			</CardBody>
		</Card>
	)
}

export default AddPlanContent
