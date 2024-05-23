import './VariantItem.css'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import DragIcon from '../../../assets/svgs/dragIcon.svg'

const VariantItem = ({
	id,
	// productId,
	title,
	// price
}) => {
	const { 
		attributes, 
		listeners, 
		setNodeRef, 
		transform, 
		transition,
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
		<img src={DragIcon} alt='Drag Icon' className='dragIcon'/>
		<div className='variantTitle'>{title}</div>
	</div>)
}

export default VariantItem