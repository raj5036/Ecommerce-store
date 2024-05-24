import { configureStore } from "@reduxjs/toolkit"
import AllProductsReducer from './state/AllProductsSlice'
import SelectedProductsReducer from "./state/SelectedProductsSlice";

export const Store = configureStore({
	reducer: {
		selectedProducts: SelectedProductsReducer,
		allProducts: AllProductsReducer,
	}
})