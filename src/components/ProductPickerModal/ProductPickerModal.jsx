import { useState } from 'react'
import './ProductPickerModal.css'

import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const ProductPickerModal = ({ onCloseButtonClick, onAddButtonClick }) => {
	const allProducts = useSelector(state => state.allProducts.products)
	const [searchInput, setSearchInput] = useState('')
	const [filteredResults, setFilteredResults] = useState([])
	const [selectedProducts, setSelectedProducts] = useState([])

	useEffect(() => {
		let filteredProducts
		if (!searchInput.length) {
			filteredProducts = allProducts
		} else {
			filteredProducts = allProducts.filter(product => product.title.toLowerCase().includes(searchInput.toLowerCase()))
		}
		setFilteredResults(getFilteredResult(filteredProducts))
	}, [searchInput])

	const difference = (array1, array2) => { 
		return array1.filter(obj1 => !array2.some(obj2 => obj1.id === obj2.id)
	)}
	
	const getFilteredResult = (filteredProducts) => {
		return filteredProducts.map((product, pi) => {
			const productId = product.id
			const selectedIndex = selectedProducts.findIndex(selectedProduct=> selectedProduct.id == productId)
			if (selectedIndex != -1) {
				const selectedProduct = selectedProducts[selectedIndex]
				const selectedVariants = selectedProduct.variants
				const allVariants = filteredProducts[pi].variants
				
				const updatedVariants = [
					...selectedVariants,
					...difference(allVariants, selectedVariants)
				]
				return {
					...selectedProduct,
					variants: updatedVariants
				}
			}
			return {...product}
		})
	}

	const onProductSelectChange = (productId, checked) => {
		let updatedFilteredResult = filteredResults.slice() //Make a copy of filteredResults
		
		// Update the checkboxes
		updatedFilteredResult.forEach((product, index) => {
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
		const productIndex = filteredResults.findIndex(product => product.id == productId)
		const variantIndex = filteredResults[productIndex].variants.findIndex(variant => variant.id == variantId)

		setFilteredResults(prevFilteredResults => {
			const updatedProducts = [...prevFilteredResults] //Create a deep copy of Products
			const updatedVariants = [...updatedProducts[productIndex].variants] //Create a deep copy of Variants

			updatedVariants[variantIndex] = {
				...updatedVariants[variantIndex],
				checked
			}

			updatedProducts[productIndex] = {
				...updatedProducts[productIndex],
				variants: updatedVariants
			}

			const someVariantsChecked = updatedProducts[productIndex].variants.some(variant => variant.checked)
			if (someVariantsChecked) {
				updatedProducts[productIndex] = {
					...updatedProducts[productIndex],
					checked: true
				}
			}

			const allVariantsUnChecked = updatedProducts[productIndex].variants.every(variant => !variant.checked)
			if (allVariantsUnChecked) {
				updatedProducts[productIndex] = {
					...updatedProducts[productIndex],
					checked: false
				}
			}

			// update the 'selectedProducts' state
			setSelectedProducts(updatedProducts.map(product => {
				if (product.id === productId) {
					const filteredVariants = product.variants.filter(variant => variant.checked);
					return { ...product, variants: filteredVariants };
				}
				return product;
			}).filter(product => product.checked))

			return updatedProducts
		})
		
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
							<button 
								className='button cancelButton'
								onClick={onCloseButtonClick}
							>Cancel</button>
							<button 
								className='button addButton'
								disabled={selectedProducts.length ? false : true}
								onClick={onAddButtonClick(selectedProducts)}
							>Add</button>
						</div>
					</div>
				</div>
			</div>
	)
}

export default ProductPickerModal