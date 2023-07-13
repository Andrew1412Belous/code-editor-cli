import { configureStore } from '@reduxjs/toolkit';
import { cellsReducer } from './slices/cellsSlice';
import { bundlesReducer } from './slices/bundleSlice';
import { persistMiddleware } from './middlewares/persist-middleware';

export const store = configureStore({
	reducer: {
		cells: cellsReducer,
		bundles: bundlesReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
