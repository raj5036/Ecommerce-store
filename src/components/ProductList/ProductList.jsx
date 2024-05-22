// import { getProducts } from '../../utils/ApiClient'
import './ProductList.css'

import { useState, useEffect } from 'react'
import PickerIcon from '../../assets/svgs/pickerIcon.svg'

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
	const [discounts, setDiscounts] = useState({})

	useEffect(() => {
		// getProducts('Hat', 1)
		// 	.then(result => {
		// 		console.log(result)
		// 	})
		// 	.catch()
	}, [])

	const onDiscountInputChange = (id, e) => {
		console.log(id)
		console.log(e.target.value)
		setDiscounts({
			...discounts,
			[id]: e.target.value
		})
	}

	return (
		<div className='productListContainer'>
			<h1 className='listHeader'>Add products</h1>
			<div className='listSubHeader'>
				<div className='subHeaderItem'>Product</div>
				<div className='subHeaderItem'>Discount</div>
			</div>
			<div className='listContainer'>
				{dummyProductList.map((product, index) => (
					<div key={index} className='product'>
						<div className='productPicker'>
							<span className='pickerText'>{product.title}</span>
							<img src={PickerIcon} alt='Picker Icon' className='pickerIcon'/>
						</div>
                        <input
                            className='discountInput' 
                            type='number' 
                            onChange={e => onDiscountInputChange(product.id, e)}
                            placeholder='00'
                        />
						<div className='discountTypeDropdown'>Flat</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ProductList