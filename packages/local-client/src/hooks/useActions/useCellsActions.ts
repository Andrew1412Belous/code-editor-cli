import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { cellsActions } from '../../store';

export const useCellsActions = () => {
	const dispatch = useDispatch();

	return useMemo(() => {
		return bindActionCreators(cellsActions, dispatch);
	}, [dispatch]);
};
