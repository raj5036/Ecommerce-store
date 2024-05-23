import { useState } from 'react'
import './ProductPickerModal.css'

import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'

const ProductPickerModal = ({ onCloseButtonClick }) => {
	const [searchInput, setSearchInput] = useState()

	const allProducts = useSelector(state => state.allProducts.products)

	return (
		<div className='modal'>
				<div className='modalContent'>
					<IoMdClose className='close' onClick={onCloseButtonClick}/>
					<div className='modalHeader'>Add Products</div>
					<input 
						type="text" 
						name="search" 
						placeholder="Search.." 
						className='searchInput'
						value={searchInput}
						onChange={e => setSearchInput(e.target.value)}
					/>
					
					<div className='productsListContainer'>
						{/* {JSON.stringify(allProducts)} */}
						{allProducts.map((product, index) => {
							return (
								<div key={'product-list' + index} className='productContainer'>
									{console.log(product)}
									<input
										type='checkbox'
										className='checkbox'
										name='checkbox'
										onChange={e => console.log(e.target.checked)}
									/>
									<img 
										src={product.image.src} 
										alt={`product-image-${index}`}
										className='productImage'
									/>
									<div>
										{product.title}
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
	)
}

export default ProductPickerModal