import { createSlice } from '@reduxjs/toolkit'

const SelectedProductsSlice = createSlice({
  name: 'selectedProducts',
  initialState: {
	products: []
  },
  reducers: {
	addSelectedProduct: (state, action) => {
		console.log(action)
		state.products = [
			...state.products,
			action.payload
		]
	},
	updateAllSelectedProducts: (state, action) => {
		console.log(action)
		state.products = action.payload
	},
	updateVariants: (state, action) => {
		console.log(action)
		const { productId, newVariantsArray } = action.payload

		const productIndex = state.products.findIndex(product => product.productId == productId)
		state.products[productIndex].variants = newVariantsArray
	},
	removeProductFromSelectedProducts: (state, action) => {
		console.log(action)
		const { productId } = action.payload
		state.products = state.products.filter(product => product.productId != productId)
	},
	removeVariantFromSelectedProducts: (state, action) => {
		console.log(action)
		const { productId, variantId } = action.payload

		const productIndex = state.products.findIndex(product => product.productId == productId)

		state.products[productIndex].variants = state.products[productIndex].variants.filter(variant => variant.id != variantId)
	},
	replaceProductInSelectedProducts: (state, action) => {
		console.log(action)
		const { replaceProductId, newProductsArray } = action.payload

		const replaceProductIndex = state.products.findIndex(product => product.productId == replaceProductId)
		state.products.splice(replaceProductIndex, 1, ...newProductsArray)
	},
  }
})

export default SelectedProductsSlice.reducer
export const { 
	addSelectedProduct, 
	updateAllSelectedProducts,
	updateVariants,
	removeProductFromSelectedProducts,
	removeVariantFromSelectedProducts,
	replaceProductInSelectedProducts,
} = SelectedProductsSlice.actions