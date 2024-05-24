import { configureStore } from "@reduxjs/toolkit"
import { persistStore } from 'redux-persist'
import AllProductsReducer from './state/AllProductsSlice'
import SelectedProductsReducer from "./state/SelectedProductsSlice";

export const Store = configureStore({
	reducer: {
		selectedProducts: SelectedProductsReducer,
		allProducts: AllProductsReducer,
	}
})

export const persistor = persistStore(Store)