import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import MealCard from './meal-card'
import { TMealItem } from './type'

const MealDraggableCard = ({ id, item }: { id: string | number; item: TMealItem }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

	const style = {
		transition,
		transform: CSS.Transform.toString(transform)
	}

	return (
		<div ref={setNodeRef} style={style} className="draggable-card">
			<MealCard key={id} item={item} dragHandleProps={{ ...attributes, ...listeners }} />
		</div>
	)
}

export default MealDraggableCard
