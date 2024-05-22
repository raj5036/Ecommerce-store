import './ProductItem.css'

import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

const ProductItem = ({id, title}) => {
	const { 
		attributes, 
		listeners, 
		setNodeRef, 
		transform, 
		transition 
	} =
    useSortable({ id })

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className='k'
		>
			hu
			{id} - {title}
		</div>
	)
}

export default ProductItem