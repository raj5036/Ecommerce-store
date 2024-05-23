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
					
					{allProducts.map((product, index) => {

					})}
				</div>
			</div>
	)
}

export default ProductPickerModal