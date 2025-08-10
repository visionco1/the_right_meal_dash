import { DndContext, closestCorners } from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import DraggableCard from './card'
import { useDraggableHook } from './hook'
import MealCard from '@/features/menu/menu/meal-card'

const Draggable = ({ children, items }: { children?: any; items: any }) => {
	const { sortedItems, sensors, handleDragEnd } = useDraggableHook(items)

	return (
		<DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
			<SortableContext items={sortedItems} strategy={rectSortingStrategy}>
				{sortedItems?.map((item: any) => (
					<DraggableCard key={item?.id} id={item?.id}>
						<MealCard key={item?.id} item={item} />
						{children}
					</DraggableCard>
				))}
			</SortableContext>
		</DndContext>
	)
}
export default Draggable
