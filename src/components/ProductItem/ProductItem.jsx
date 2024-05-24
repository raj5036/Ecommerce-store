import './ProductItem.css'

import React, {useState} from 'react'
import { CSS } from '@dnd-kit/utilities'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { closestCorners, DndContext, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import DragIcon from '../../assets/svgs/dragIcon.svg'
import PickerIcon from '../../assets/svgs/pickerIcon.svg'
import UpArrow from '../../assets/svgs/upPointer.svg'
import DownArrow from '../../assets/svgs/downPointer.svg'
import CrossIcon from '../../assets/svgs/crossIcon.svg'
import VariantItem from './VariantItem/VariantItem'
import { useDispatch } from 'react-redux'
import { removeVariantFromSelectedProducts, updateVariants } from '../../redux/state/SelectedProductsSlice'

const ProductItem = ({
	id, 
	productId,
	title,
	variants,
	discountOptionsDisplay,
	discounts,
	onAddDiscountClick,
	onDiscountInputChange,
	onDiscountTypeChange,
	onProductPickerClick,
	onDeleteProduct,
	setProductItemDraggability,
}) => {
	const dispatch = useDispatch()
	const { 
		attributes, 
		listeners, 
		setNodeRef, 
		transform, 
		transition,
		index
	} =
    useSortable({ id })


	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				delay: 350,
			}
		}),
		useSensor(MouseSensor, {
			activationConstraint: {
				delay: 900,
				distance: 8,
			}
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 900,
			}
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	const getVariantIndex = (id) => {
		return variants.findIndex(variant => variant.id == id)
	}

	const handleDragStart = () => {
		console.log('handleDragStart')
		setProductItemDraggability(true)
	}

	const handleDragEnd = (event) => {
		console.log('handleDragEnd')
		setProductItemDraggability(false)
		
		const { active, over } = event;

		if (active.id === over.id) return;

		const originalPos = getVariantIndex(active.id)
		const newPos = getVariantIndex(over.id)

		const newVariantsArray = arrayMove(variants, originalPos, newPos)
		dispatch(updateVariants({productId, newVariantsArray}))
	}

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	}

	const discountTypes = ['% Off', 'Flat']

	const [showVariant, setShowVariant] = useState(false)

	const onShowVariant = () => {
		setShowVariant(!showVariant)
	}

	const onDeleteVariant = (variantId) => () => {
		console.log('variantId', variantId)
		dispatch(removeVariantFromSelectedProducts({
			productId: productId,
			variantId
		}))
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className='productItemContainer'
		>
			<div className='product'>
				<div className='dragPickerContainer'>
					<img src={DragIcon} alt='Drag Icon' className='dragIcon'/>
					<span>{`${index + 1}.`}</span>
					<div className='productPicker' onClick={onProductPickerClick}>
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
						value={(discounts[id] && discounts[id].discountAmount) || ''}
					/>
					<select 
						className='discountTypeDropdown' 
						value={(discounts[id] && discounts[id].discountType) || discountTypes[0]}
						onChange={e => onDiscountTypeChange(id, e)} 
					>
						{discountTypes.map((option, index) => {
							return <option key={'discountOptions-' + index}>{option}</option>
						})}
					</select>
				</React.Fragment>)}
				<div className='variantOptions' onClick={onShowVariant}>
					{showVariant ? (<>
						<img src={UpArrow} alt='up arrow' className='arrowIcon'/>
						Hide variants</>)
					: <>
						<img src={DownArrow} alt='down arrow' className='arrowIcon'/>
						Show variants
					</>}
				</div>
				<img src={CrossIcon} alt='Cross Icon' className='crossIcon' onClick={onDeleteProduct(id)}/>
			</div>
			{/* Show variants */}
			{
				showVariant && variants.length > 0 && 
				<div className='variantsListContainer'>
					<DndContext collisionDetection={closestCorners} sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
						<SortableContext items={variants} strategy={verticalListSortingStrategy}>
							{variants.map((variant, index)=> {
								return <VariantItem
									key={'variantItem' + index}
									id={variant.id}
									productId={variant.productId}
									title={variant.title}
									price={variant.price}
									onDeleteVariant={onDeleteVariant}
								/>
							})}
						</SortableContext>
					</DndContext>
				</div>
			}
		</div>
	)
}

export default ProductItem