import { useState } from 'react'
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'

export const useDraggableHook = (items: any) => {
	const [sortedItems, setSortedItems] = useState(items)

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	const getItemPos = (id: any) => sortedItems?.findIndex((item: any) => item?.id == id)

	const handleDragEnd = (event: any) => {
		const { active, over } = event

		if (active?.id === over?.id) return

		setSortedItems((items: any) => {
			const originalPos = getItemPos(active.id)
			const newPos = getItemPos(over?.id)

			return arrayMove(items, originalPos, newPos)
		})
	}

	return { sortedItems, sensors, handleDragEnd }
}
