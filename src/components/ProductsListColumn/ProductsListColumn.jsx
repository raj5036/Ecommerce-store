import './ProductsListColumn.css'

import { useState, useEffect } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import ProductItem from '../ProductItem/ProductItem'
import ProductPickerModal from '../ProductPickerModal/ProductPickerModal'

const ProductsListColumn = ({products}) => {
	const [showProductPickerModal, setShowProductPickerModal] = useState(false)
	const [discountOptionsDisplay, setDiscountOptionsDisplay] = useState({})
	const [discounts, setDiscounts] = useState({})

	// useEffect(() => {
	// 	getProducts('Hat', 1)
	// 		.then(result => {
	// 			console.log(result)
	// 		})
	// 		.catch()
	// }, [])
	useEffect(() => {
		if (!products.length) {
			products.push({
				id: '',
				title: '',
				variants: [],
				image: null
			})
		}
	}, [products])

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

	const onCloseButtonClick = () => {
		setShowProductPickerModal(false)
	}

	return (
		<div className='listContainer'>
			{showProductPickerModal && <ProductPickerModal onCloseButtonClick={onCloseButtonClick}/>}
			<SortableContext items={products} strategy={verticalListSortingStrategy}>
				{products.map((product, index) => {
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