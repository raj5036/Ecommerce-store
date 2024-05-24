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
		
		removedCheckedKey(pickedProducts).forEach(product => {
			dispatch(addSelectedProduct(product))
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
						variants={product.variants}
						discountOptionsDisplay={discountOptionsDisplay}
						discounts={discounts}
						onAddDiscountClick={onAddDiscountClick}
						onDiscountInputChange={onDiscountInputChange}
						onDiscountTypeChange={onDiscountTypeChange}
						onProductPickerClick={onProductPickerClick}
						onDeleteProduct={onDeleteProduct}
					/>
				})}
			</SortableContext>
		</div>
	)
}

export default ProductsListColumn