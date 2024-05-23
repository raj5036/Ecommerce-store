import { createSlice } from '@reduxjs/toolkit'

const SelectedProductsSlice = createSlice({
  name: 'selectedProducts',
  initialState: {
	selectedProducts: []
  },
  reducers: {
	addProduct: (state, action) => {
		console.log(action)
		state.selectedProducts = [
			...state.selectedProducts,
			action.payload
		]
	}
  }
})

export default SelectedProductsSlice.reducer
export const { addProduct } = SelectedProductsSlice.actions