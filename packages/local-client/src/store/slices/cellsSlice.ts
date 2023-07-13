import { Cell, CellsState } from '../types/cell';
import { createSlice } from '@reduxjs/toolkit';
import {
	DeleteCellAction,
	InsertCellAfterAction,
	MoveCellAction,
	UpdateCellAction,
} from '../actions/cellAction';
import { randomId } from '../../utils/randomId';

const initialState: CellsState = {
	loading: false,
	error: null,
	order: [],
	data: {},
};

const cellsSlice = createSlice({
	initialState,
	name: 'cells',
	reducers: {
		updateCell(state, action: UpdateCellAction) {
			const { content, id } = action.payload;
			state.data[id].content = content;
		},
		deleteCell(state, action: DeleteCellAction) {
			delete state.data[action.payload.id];
			state.order = state.order.filter((id) => id !== action.payload.id);
		},
		insertCellAfter(state, action: InsertCellAfterAction) {
			const cell: Cell = {
				content: '',
				type: action.payload.type,
				id: randomId(),
			};

			state.data[cell.id] = cell;

			const foundIndex = state.order.findIndex((id) => id === action.payload.id);

			if (foundIndex < 0) {
				state.order.unshift(cell.id);
			} else {
				state.order.splice(foundIndex + 1, 0, cell.id);
			}
		},
		moveCell(state, action: MoveCellAction) {
			const { direction, id } = action.payload;
			const index = state.order.findIndex((cellId) => cellId === id);
			const targetIndex = direction === 'up' ? index - 1 : index + 1;

			if (targetIndex < 0 || targetIndex > state.order.length - 1) {
				return;
			}

			state.order[index] = state.order[targetIndex];
			state.order[targetIndex] = id;
		},
	},
});

export const cellsActions = cellsSlice.actions;
export const cellsReducer = cellsSlice.reducer;
