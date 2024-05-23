import './ProductItem.css'

import React from 'react'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import DragIcon from '../../assets/svgs/dragIcon.svg'
import PickerIcon from '../../assets/svgs/pickerIcon.svg'

const ProductItem = ({
	id, 
	title,
	discountOptionsDisplay,
	discounts,
	onDiscountInputChange,
	onAddDiscountClick,
}) => {
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
			className='product'
		>
			<div className='dragPickerContainer'>
			<img src={DragIcon} alt='Drag Icon' className='dragIcon'/>
			<span>{`${id}.`}</span>
			<div className='productPicker'>
				<span className='pickerText'>{title}</span>
				<img src={PickerIcon} alt='Picker Icon' className='pickerIcon'/>
			</div>
		</div>
		{!discountOptionsDisplay[id] 
			? (<button 
					className='addDiscountButton'
					onClick={onAddDiscountClick(id)}
				>
						Add Discount
				</button>) 
			: (<React.Fragment>
				<input
					className='discountInput' 
					type='number' 
					onChange={e => onDiscountInputChange(id, e)}
					placeholder='00'
					value={discounts[id]}
				/>
				<div className='discountTypeDropdown'>Flat</div>
			</React.Fragment>)}
		</div>
	)
}

export default ProductItem