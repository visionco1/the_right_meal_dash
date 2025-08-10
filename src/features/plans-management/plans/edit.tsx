import { useUpdateSubscriptionPlan } from './hooks'
import { Card, CardBody } from '@/components/ui/card'
import PlanForm from './form'
import { Loading } from '@/components/ui/Loading'

const EditPlanContent = () => {
	const { updateLoading, handleSubmit, handleChange, data, showLoading, showResponse } = useUpdateSubscriptionPlan()
	return (
		<Card>
			<CardBody>
				{(updateLoading || showLoading) && <Loading />}
				<PlanForm showLoading={showLoading} showResponse={showResponse} data={data} handleSubmit={handleSubmit} handleChange={handleChange} />
			</CardBody>
		</Card>
	)
}

export default EditPlanContent
