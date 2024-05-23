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
	}
  }
})

export default SelectedProductsSlice.reducer
export const { 
	addSelectedProduct, 
	updateAllSelectedProducts 
} = SelectedProductsSlice.actions