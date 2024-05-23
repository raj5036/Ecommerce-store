import './AddProductButton.css'

const AddProductButton = ({
	onAddProduct
}) => {
	return (
		<button 
			className='addProductButton'
			onClick={onAddProduct}
		>
			Add Product
		</button>
	)
}

export default AddProductButton