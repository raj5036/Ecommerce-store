import './Product.css'

import React from 'react'
import PickerIcon from '../../assets/svgs/pickerIcon.svg'
import DragIcon from '../../assets/svgs/dragIcon.svg'

const Product = ({
	id, 
	title, 
	variants, 
	image,
	discountOptionsDisplay,
	onAddDiscountClick,
	onDiscountInputChange
}) => {
	return (
		<div className='product'>
			<div className='dragPickerContainer'>
			<img src={DragIcon} alt='Drag Icon' className='dragIcon'/>
			<span>{`${1}.`}</span>
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
				/>
				<div className='discountTypeDropdown'>Flat</div>
			</React.Fragment>)}
		</div>
	)
}

export default Product