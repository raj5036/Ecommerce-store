import { useState } from 'react'
import './ProductPickerModal.css'

import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const ProductPickerModal = ({ onCloseButtonClick }) => {
	const allProducts = useSelector(state => state.allProducts.products)
	const [searchInput, setSearchInput] = useState('')
	const [filteredResults, setFilteredResults] = useState([])
	const [selectedProducts, setSelectedProducts] = useState([])

	useEffect(() => {
		const temp = allProducts.map(product => ({
			...product,
			checked: false,
			variants: product.variants.map(variant => ({
				...variant,
				checked: true
			}))
		}))
		setFilteredResults(temp)
	}, [])

	useEffect(() => {
		if (!searchInput.length) {
			setFilteredResults(allProducts)
			return;
		}
		setFilteredResults(filteredResults.filter(product => product.title.toLowerCase().includes(searchInput.toLowerCase())))
	}, [searchInput])

	const onProductSelectChange = (productId, checked) => {
		let updatedFilteredResult = filteredResults.slice() //Make a copy of filteredResults
		
		// Update the checkboxes
		filteredResults.forEach((product, index) => {
			if (product.id == productId) {
				updatedFilteredResult[index] = {
					...updatedFilteredResult[index],
					checked
				}

				updatedFilteredResult[index].variants = updatedFilteredResult[index].variants.map(variant => ({
					...variant,
					checked
				}))
			}
		})

		setFilteredResults(updatedFilteredResult)

		// update the 'selectedProducts' state
		setSelectedProducts(updatedFilteredResult.filter(product => product.checked))
	}

	const onProductVariantSelectChange = (productId, variantId, checked) => {
		console.log('productId', productId)
		console.log('variantId', variantId)
		console.log(checked)
	}

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
						{!filteredResults.length && <div className='noResults'>No results found</div>}
						{filteredResults.map((product, index) => {
							return (
								<div key={'product-list' + index} className='productContainer'>
									<div className='mainProduct'>
										<input
											type='checkbox'
											className='checkbox'
											name='checkbox'
											checked={product.checked || false}
											onChange={e => onProductSelectChange(product.id, e.target.checked)}
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
									{product.variants.length && (<div className='variantsContainer'>
										{product.variants.map((variant, index) => {
											return (
												<div key={'variant' + index} className='variant'>
													<input
														type='checkbox'
														className='checkbox'
														checked={variant.checked || false}
														onChange={e => onProductVariantSelectChange(
															product.id, 
															variant.id, 
															e.target.checked
														)}
													/>
													<div>
														{variant.title}
													</div>
												</div>
											)
										})}
									</div>)}
								</div>
							)
						})}
					</div>

					<div className='modalFooter'>
						<div>{selectedProducts.length + ' products selected'}</div>
						<div className='buttons'>
							<button className='button cancelButton'>Cancel</button>
							<button 
								className='button addButton'
								disabled={selectedProducts.length ? false : true}
							>Add</button>
						</div>
					</div>
				</div>
			</div>
	)
}

export default ProductPickerModal