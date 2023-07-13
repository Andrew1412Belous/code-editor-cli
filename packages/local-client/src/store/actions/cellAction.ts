import { CellTypes } from '../types/cell';

export type Direction = 'up' | 'down';
export interface MoveCellAction {
	type: string;
	payload: {
		id: string;
		direction: Direction;
	};
}

export interface DeleteCellAction {
	type: string;
	payload: {
		id: string;
	};
}

export interface InsertCellAfterAction {
	type: string;
	payload: {
		id: string | null;
		type: CellTypes;
	};
}

export interface UpdateCellAction {
	type: string;
	payload: {
		id: string;
		content: string;
	};
}
