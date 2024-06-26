import { createSlice } from '@reduxjs/toolkit'

const AllProductsSlice = createSlice({
  name: 'allProducts',
  initialState: {
	products: []
  },
  reducers: {
	addProduct: (state, action) => {
		console.log(action)
		state.products = [
			...state.products,
			action.payload
		]
	},
	setProducts: (state, action) => {
		console.log(action)
		state.products = action.payload
	}
  }
})

export default AllProductsSlice.reducer
export const { addProduct, setProducts } = AllProductsSlice.actions