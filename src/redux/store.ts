import { modalsReducer } from './slices/modals.slice';
import { suppliersReducer } from './slices/suppliers.slice';
import { invoicesReducer } from './slices/invoices.slice';
import { searchReducer } from './slices/search.slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		searchReducer,
		invoicesReducer,
		suppliersReducer,
		modalsReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
