import { configureStore } from '@reduxjs/toolkit';
import { cellsReducer } from './slices/cellsSlice';
import { bundlesReducer } from './slices/bundleSlice';

export const store = configureStore({
	reducer: {
		cells: cellsReducer,
		bundles: bundlesReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
