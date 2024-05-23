import './AddProductButton.css'

const AddProductButton = ({
	onAddProduct
}) => {
	return (
		<button 
			onClick={onAddProduct}
			className='addProductButton'
		>Add Product</button>
	)
}

export default AddProductButton