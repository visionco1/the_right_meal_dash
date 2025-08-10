import { Card, CardBody } from '@/components/ui/card'
import ZoneForm from './form'
import { useUpdateZone } from './hooks'

const EditZone = () => {
	return (
		<Card>
			<CardBody>
				<ZoneForm Hook={useUpdateZone} />
			</CardBody>
		</Card>
	)
}

export default EditZone
