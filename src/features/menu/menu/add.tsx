import { Card, CardBody } from '@/components/ui/card'
import MenuForm from './form'
import { useCreateMenu } from './hooks'

const AddMenuContent = () => {
	return (
		<Card>
			<CardBody>
				<MenuForm Hook={useCreateMenu} />
			</CardBody>
		</Card>
	)
}

export default AddMenuContent
