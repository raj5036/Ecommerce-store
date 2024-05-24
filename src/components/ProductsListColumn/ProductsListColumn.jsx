import './ProductsListColumn.css'

import { useState } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import ProductItem from '../ProductItem/ProductItem'
import ProductPickerModal from '../ProductPickerModal/ProductPickerModal'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addSelectedProduct, removeProductFromSelectedProducts, replaceProductInSelectedProducts } from '../../redux/state/SelectedProductsSlice'

const ProductsListColumn = () => {
	const [showProductPickerModal, setShowProductPickerModal] = useState(false)
	const [discountOptionsDisplay, setDiscountOptionsDisplay] = useState({})
	const [discounts, setDiscounts] = useState({})
	const [disableProductItemDrag, setDisableProductItemDrag] = useState(false)
	const [clickedProductId, setClickedProductId] = useState(null)

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

	const onProductPickerClick = (productId) => () => {
		setShowProductPickerModal(true)
		setClickedProductId(productId)
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
		pickedProducts = removedCheckedKey(pickedProducts)

		//Remove empty ProductItem
		dispatch(removeProductFromSelectedProducts({
			productId: Number.MIN_SAFE_INTEGER
		}))

		if (clickedProductId == Number.MIN_SAFE_INTEGER) {
			// Adding a new productItem
			pickedProducts.forEach(({id, ...otherAttrs}) => {
				dispatch(addSelectedProduct({
					id: Math.random(),
					productId: id,
					...otherAttrs
				}))
			})
		} else {
			// Replacing old ProductItem with new Once
			dispatch(replaceProductInSelectedProducts({
				replaceProductId: clickedProductId,
				newProductsArray: pickedProducts.map(({id, ...otherAttrs}) => {
					return {
						id: Math.random(),
						productId: id,
						...otherAttrs
					}
				})
			}))
		}
		
		
		

		// Close modal
		setShowProductPickerModal(false)	
	}

	const onCloseButtonClick = () => {
		setShowProductPickerModal(false)
		setClickedProductId(null)
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
						onlyOneProductInList={selectedProducts.length == 1}
					/>
				})}
			</SortableContext>
		</div>
	)
}

export default ProductsListColumn