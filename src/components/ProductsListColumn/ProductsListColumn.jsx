import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import './ProductsListColumn.css'
import ProductItem from '../ProductItem/ProductItem'

const ProductsListColumn = ({products}) => {
	return (
		<div>
			<SortableContext items={products} strategy={verticalListSortingStrategy}>
				{products.map((product, index) => {
					return <ProductItem key={index} id={product.id} title={product.title}/>
				})}
			</SortableContext>
		</div>
	)
}

export default ProductsListColumn