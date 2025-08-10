import { DndContext, closestCorners } from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { useDraggableHook } from '@/components/ui/draggable/hook'
import MealDraggableCard from './draggable-card'
import { TMealItem } from './type'

const MealDraggableWrapper = ({ items }: { items: TMealItem[] }) => {
	const { sortedItems, sensors, handleDragEnd } = useDraggableHook(items)
	return (
		<DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
			<SortableContext items={sortedItems} strategy={rectSortingStrategy}>
				{sortedItems?.map((item: any) => <MealDraggableCard id={item?.id} key={item?.id} item={item} />)}
			</SortableContext>
		</DndContext>
	)
}

export default MealDraggableWrapper
