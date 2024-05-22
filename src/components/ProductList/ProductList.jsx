import './ProductList.css'

import { useState } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Product from '../Product/Product'

const dummyProductList = [
    {
        "id": 77,
        "title": "Fog Linen Chambray Towel - Beige Stripe",
        "variants": [
            {
                "id": 1,
                "product_id": 77,
                "title": "XS / Silver",
                "price": "49"
            },
            {
                "id": 2,
                "product_id": 77,
                "title": "S / Silver",
                "price": "49"
            },
            {
                "id": 3,
                "product_id": 77,
                "title": "M / Silver",
                "price": "49"
            }
        ],
        "image": {
            "id": 266,
            "product_id": 77,
            "src": "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1"
        }
    },
    {
        "id": 80,
        "title": "Orbit Terrarium - Large",
        "variants": [
            {
                "id": 64,
                "product_id": 80,
                "title": "Default Title",
                "price": "109"
            }
        ],
        "image": {
            "id": 272,
            "product_id": 80,
            "src": "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1"
        }
    }
]

const ProductList = () => {
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
		console.log(id)
		console.log(e.target.value)
		setDiscounts({
			...discounts,
			[id]: e.target.value
		})
	}

	return (
        <div className='listContainer column' id='productList'> 
            <SortableContext 
                items={dummyProductList}
                strategy={verticalListSortingStrategy}
            >
                {dummyProductList.map((product, index) => {
                    return (
                        <Product 
                            key={product.id}
                            index={index}
                            id={product.id}
                            title={product.title}
                            variants={product.variants}
                            image={product.image}
                            discountOptionsDisplay={discountOptionsDisplay}
                            onAddDiscountClick={onAddDiscountClick}
                            onDiscountInputChange={onDiscountInputChange}
                        />
                    )
                })}
            </SortableContext>
        </div>
	)
}

export default ProductList