import { createSlice } from '@reduxjs/toolkit'

const AllProductsSlice = createSlice({
  name: 'allProducts',
  initialState: {
	allProducts: []
  },
  reducers: {
	addProduct: (state, action) => {
		console.log(action)
		state.allProducts = [
			...state.allProducts,
			action.payload
		]
	}
  }
})

export default AllProductsSlice.reducer
export const { addProduct } = AllProductsSlice.actions