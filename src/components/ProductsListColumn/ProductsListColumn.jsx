import './ProductsListColumn.css'

import { useState } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import ProductItem from '../ProductItem/ProductItem'
import ProductPickerModal from '../ProductPickerModal/ProductPickerModal'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addSelectedProduct, removeProductFromSelectedProducts } from '../../redux/state/SelectedProductsSlice'

const ProductsListColumn = () => {
	const [showProductPickerModal, setShowProductPickerModal] = useState(false)
	const [discountOptionsDisplay, setDiscountOptionsDisplay] = useState({})
	const [discounts, setDiscounts] = useState({})
	const [disableProductItemDrag, setDisableProductItemDrag] = useState(false)

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
		//Remove empty ProductItem
		dispatch(removeProductFromSelectedProducts({
			productId: Number.MIN_SAFE_INTEGER
		}))
		
		const length = selectedProducts.length
		removedCheckedKey(pickedProducts).forEach(({id, ...otherAttrs}) => {
			dispatch(addSelectedProduct({
				id: length,
				productId: id,
				...otherAttrs
			}))
		})

		// Close modal
		setShowProductPickerModal(false)	
	}

	const onCloseButtonClick = () => {
		setShowProductPickerModal(false)
	}

	const onDeleteProduct = (productId) => () => {
		console.log('productId', productId)
		dispatch(removeProductFromSelectedProducts({ productId }))
	}

	const setProductItemDraggability = (value) => {
		setDisableProductItemDrag(value)
	}

	return (
		<div className='listContainer'>
			{showProductPickerModal && <ProductPickerModal 
				onAddButtonClick={onAddButtonClick}
				onCloseButtonClick={onCloseButtonClick}
			/>}
			<SortableContext 
				items={selectedProducts} 
				strategy={verticalListSortingStrategy} 
				disabled={disableProductItemDrag}
			>
				{selectedProducts.map((product, index) => {
					return <ProductItem 
						key={index} 
						id={product.id}
						productId={product.productId} 
						title={product.title}
						variants={product.variants}
						discountOptionsDisplay={discountOptionsDisplay}
						discounts={discounts}
						onAddDiscountClick={onAddDiscountClick}
						onDiscountInputChange={onDiscountInputChange}
						onDiscountTypeChange={onDiscountTypeChange}
						onProductPickerClick={onProductPickerClick}
						onDeleteProduct={onDeleteProduct}
						setProductItemDraggability={setProductItemDraggability}
					/>
				})}
			</SortableContext>
		</div>
	)
}

export default ProductsListColumn