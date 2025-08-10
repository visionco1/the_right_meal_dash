import { useCreateMeal } from './hooks'
import { Loading } from '@/components/ui/Loading'
import { Card, CardBody } from '@/components/ui/card'
import MealForm from './form'

const AddMealContent = () => {
	const { handleChange, data, handleSubmit, createLoading } = useCreateMeal()

	return (
		<Card>
			<CardBody>
				{createLoading && <Loading />}
				<MealForm data={data} handleSubmit={handleSubmit} handleChange={handleChange} />
			</CardBody>
		</Card>
	)
}

export default AddMealContent
