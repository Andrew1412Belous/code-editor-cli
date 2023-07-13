import axios from 'axios';
import { Cell, CellsState } from '../types/cell';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCells = createAsyncThunk('fetchCells', async () => {
	try {
		const { data }: { data: Cell[] } = await axios.get('/cells');

		if (data) {
			return {
				cells: data,
			};
		}
	} catch (err) {
		if (err instanceof Error) {
			return {
				error: err.message,
			};
		}
	}
});

export const saveCells = createAsyncThunk('saveCells', async (payload: CellsState) => {
	const { data, order } = payload;

	const cells = order.map((id) => data[id]);

	try {
		const result = await axios.post('/cells', { cells });

		if (result) {
			return result.status;
		}
	} catch (err) {
		if (err instanceof Error) {
			return {
				error: err.message,
			};
		}
	}
});
