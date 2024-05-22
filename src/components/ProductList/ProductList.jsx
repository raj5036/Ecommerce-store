import './ProductList.css'

const ProductList = () => {
	return (
		<div className='productListContainer'>
			<h1 className='listHeader'>Add products</h1>
			<div className='listSubHeader'>
				<div className='subHeaderItem'>Product</div>
				<div className='subHeaderItem'>Discount</div>
			</div>
		</div>
	)
}

export default ProductList