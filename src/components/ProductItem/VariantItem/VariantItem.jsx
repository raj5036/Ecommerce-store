import './VariantItem.css'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import DragIcon from '../../../assets/svgs/dragIcon.svg'
import CrossIcon from '../../../assets/svgs/crossIcon.svg'

const VariantItem = ({
	id,
	// productId,
	title,
	// price,
	onDeleteVariant,
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
		<img 
			src={CrossIcon} 
			alt='Cross Icon' 
			className='crossIcon' 
			onClick={onDeleteVariant(id)}
		/>
	</div>)
}

export default VariantItem