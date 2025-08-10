import { useUpdateMeal } from './hooks'
import { Loading } from '@/components/ui/Loading'
import { Card, CardBody } from '@/components/ui/card'
import MealForm from './form'

const EditMealContent = () => {
	const { handleChange, data, handleSubmit, updateLoading, showLoading, showResponse } = useUpdateMeal()

	return (
		<Card>
			<CardBody>
				{(updateLoading || showLoading) && <Loading />}
				<MealForm showLoading={showLoading} is_update data={data} handleSubmit={handleSubmit} handleChange={handleChange} showResponse={showResponse} />
			</CardBody>
		</Card>
	)
}

export default EditMealContent
