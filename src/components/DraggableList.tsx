import { twclass } from "@/utilities/twclass";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ItemStructure {
  id: string;
}

interface DraggableListProps<I> {
  draggableItems: Array<ItemStructure & I>;
  onItemsUpdate: (stateSorted: I[]) => void;
  getReorderedItemId?: (itemId: ItemStructure["id"]) => void;
}

export const DraggableList = <I,>({
  draggableItems,
  onItemsUpdate,
  getReorderedItemId,
  children,
}: React.PropsWithChildren<DraggableListProps<I>>) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active.id || !over?.id) return;
    if (active.id === over?.id) return;

    const oldIndex = draggableItems.findIndex((item) => item.id === active.id);
    const newIndex = draggableItems.findIndex((item) => item.id === over.id);
    if (newIndex.toString() === "-1") return;

    const newOrder = arrayMove(draggableItems, oldIndex, newIndex);
    onItemsUpdate(newOrder);
    getReorderedItemId && getReorderedItemId(active.id.toString());
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  );

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis]}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={draggableItems}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};

function SortableItem(props: React.PropsWithChildren & { id: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={twclass(
        isDragging && "outline-dashed outline-2 outline-ui-border-color",
      )}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.children}
    </div>
  );
}

DraggableList.SortableItem = SortableItem;
