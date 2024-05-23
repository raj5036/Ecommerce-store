import { configureStore } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import {thunk} from 'redux-thunk';
import SelectedProductsReducer from "./state/SelectedProductsSlice";

const persistConfig = {
  key: 'root',
  storage,
}

export const Store = configureStore({
	reducer: {
		selectedProducts: persistReducer(persistConfig, SelectedProductsReducer),
		middleware: [thunk]
	}
})

export const persistor = persistStore(Store)