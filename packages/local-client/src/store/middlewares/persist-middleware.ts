import { Action, Dispatch, Middleware } from 'redux';
import { saveCells } from '../thunks/cellsThunks';
import { RootState } from '../store';

export const persistMiddleware: Middleware = ({
	dispatch,
	getState,
}: {
	dispatch: Dispatch<Action>;
	getState: () => RootState;
}) => {
	let timer: any;

	return (next: (action: Action) => void) => {
		return (action: Action) => {
			next(action);

			if (
				[
					'cells/insertCellAfter',
					'cells/moveCell',
					'cells/updateCell',
					'cells/deleteCell',
				].includes(action.type)
			) {
				if (timer) {
					clearTimeout(timer);
				}

				timer = setTimeout(() => {
					saveCells(getState().cells)(dispatch, getState, false);
				}, 250);
			}
		};
	};
};
