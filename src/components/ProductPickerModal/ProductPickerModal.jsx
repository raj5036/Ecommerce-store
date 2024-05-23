import { IoMdClose } from 'react-icons/io'
import './ProductPickerModal.css'

const ProductPickerModal = ({ onCloseButtonClick }) => {
	return (
		<div className='modal'>
				<div className='modalContent'>
					<IoMdClose className='close' onClick={onCloseButtonClick}/>
					My content
				</div>
			</div>
	)
}

export default ProductPickerModal