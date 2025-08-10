import { useUpdateMenu } from './hooks'
import { Card, CardBody } from '@/components/ui/card'
import MenuForm from './form'

const EditMenuContent = () => {
	return (
		<Card>
			<CardBody>
				<MenuForm Hook={useUpdateMenu} />
			</CardBody>
		</Card>
	)
}

export default EditMenuContent
