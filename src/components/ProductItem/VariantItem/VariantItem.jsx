import { useSortable } from '@dnd-kit/sortable'
import './VariantItem.css'
import { CSS } from '@dnd-kit/utilities'

const VariantItem = ({
	id,
	// productId,
	title,
	price
}) => {
	const { 
		attributes, 
		listeners, 
		setNodeRef, 
		transform, 
		transition,
		index
	} =
    useSortable({ id })

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	}

	return (<div 
		ref={setNodeRef}
		style={style}
		{...attributes}
		{...listeners}
		className='variantItem'
	>
		<div>{index}</div>
		<div>{title}</div>
		<div>{price}</div>
	</div>)
}

export default VariantItem