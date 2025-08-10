import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const DraggableCard = ({ id, children }: any) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

	const style = {
		transition,
		transform: CSS.Transform.toString(transform)
	}

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners} className="draggable-card">
			{children}
		</div>
	)
}

export default DraggableCard
