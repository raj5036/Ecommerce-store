import './ProductsListColumn.css'

import { useState } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import ProductItem from '../ProductItem/ProductItem'
import ProductPickerModal from '../ProductPickerModal/ProductPickerModal'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addSelectedProduct } from '../../redux/state/SelectedProductsSlice'

const ProductsListColumn = () => {
	const [showProductPickerModal, setShowProductPickerModal] = useState(false)
	const [discountOptionsDisplay, setDiscountOptionsDisplay] = useState({})
	const [discounts, setDiscounts] = useState({})

	const selectedProducts = useSelector(state => state.selectedProducts.products)
	const dispatch = useDispatch()

    const onAddDiscountClick = (id) => () => {
        setDiscountOptionsDisplay({
            ...discountOptionsDisplay,
            [id]: true
        })
    }

	const onDiscountInputChange = (id, e) => {
		setDiscounts({
			...discounts,
			[id]: {
				...discounts[id],
				discountAmount: e.target.value
			}
		})
	}

	const onDiscountTypeChange = (id, e) => {
		setDiscounts({
			...discounts,
			[id]: {
				...discounts[id],
				discountType: e.target.value
			}
		})
	}

	const onProductPickerClick = () => {
		setShowProductPickerModal(true)
	}

	const removedCheckedKey = (array) => {
		array.forEach(item=> {
				delete item.checked
				item.variants.forEach(variant => {
					delete variant.checked
				})
			})
		return array
	}

	const onAddButtonClick = (pickedProducts) => () => {

		console.log('pickedProducts', removedCheckedKey(pickedProducts))
		removedCheckedKey(pickedProducts).forEach(product => {
			dispatch(addSelectedProduct(product))
		})
		setShowProductPickerModal(false)	
	}

	const onCloseButtonClick = () => {
		setShowProductPickerModal(false)
	}

	return (
		<div className='listContainer'>
			{showProductPickerModal && <ProductPickerModal 
				onAddButtonClick={onAddButtonClick}
				onCloseButtonClick={onCloseButtonClick}
			/>}
			<SortableContext items={selectedProducts} strategy={verticalListSortingStrategy}>
				{selectedProducts.map((product, index) => {
					return <ProductItem 
						key={index} 
						id={product.id} 
						title={product.title}
						discountOptionsDisplay={discountOptionsDisplay}
						discounts={discounts}
						onAddDiscountClick={onAddDiscountClick}
						onDiscountInputChange={onDiscountInputChange}
						onDiscountTypeChange={onDiscountTypeChange}
						onProductPickerClick={onProductPickerClick}
					/>
				})}
			</SortableContext>
		</div>
	)
}

export default ProductsListColumn