import { useCreateZone } from './hooks'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setRectangleCoords } from '@/redux/slices/delivery/zones'
import { Card, CardBody } from '@/components/ui/card'
import ZoneForm from './form'

const AddZone = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(setRectangleCoords([]))
	}, [])

	return (
		<Card>
			<CardBody>
				<ZoneForm Hook={useCreateZone} />
			</CardBody>
		</Card>
	)
}

export default AddZone
