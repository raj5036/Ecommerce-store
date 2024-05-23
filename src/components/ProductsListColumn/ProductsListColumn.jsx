import './ProductsListColumn.css'

import { useState } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import ProductItem from '../ProductItem/ProductItem'

const ProductsListColumn = ({products}) => {
	const [discountOptionsDisplay, setDiscountOptionsDisplay] = useState({})
	const [discounts, setDiscounts] = useState({})

	// useEffect(() => {
	// 	getProducts('Hat', 1)
	// 		.then(result => {
	// 			console.log(result)
	// 		})
	// 		.catch()
	// }, [])

    const onAddDiscountClick = (id) => () => {
        setDiscountOptionsDisplay({
            ...discountOptionsDisplay,
            [id]: true
        })
    }

	const onDiscountInputChange = (id, e) => {
		setDiscounts({
			...discounts,
			[id]: e.target.value
		})
	}
	return (
		<div className='listContainer'>
			<SortableContext items={products} strategy={verticalListSortingStrategy}>
				{products.map((product, index) => {
					return <ProductItem 
						key={index} 
						id={product.id} 
						title={product.title}
						discountOptionsDisplay={discountOptionsDisplay}
						discounts={discounts}
						onDiscountInputChange={onDiscountInputChange}
						onAddDiscountClick={onAddDiscountClick}
					/>
				})}
			</SortableContext>
		</div>
	)
}

export default ProductsListColumn