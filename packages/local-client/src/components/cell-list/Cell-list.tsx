import React, { Fragment, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CellListItem from '../cell-list-item/Cell-list-item';
import AddCell from '../add-cell/Add-cell';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';

import './cell-list.css';
import { fetchCells } from '../../store';

const CellList: React.FC = () => {
	const cellsState = useTypedSelector((state) => state.cells);
	const cells = cellsState.order.map((id) => cellsState.data[id]);
	const dispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(fetchCells());
		//eslint-disable-next-line
	}, []);

	const renderedCells = cells.map((cell) => (
		<Fragment key={cell.id}>
			<CellListItem key={cell.id} cell={cell} />
			<AddCell previousCellId={cell.id} />
		</Fragment>
	));

	return (
		<div className="cell-list">
			<AddCell forceVisible={cells.length === 0} previousCellId={null} />
			{renderedCells}
		</div>
	);
};

export default CellList;
