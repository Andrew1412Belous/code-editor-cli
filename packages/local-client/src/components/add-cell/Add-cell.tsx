import React from 'react';
import { useCellsActions } from '../../hooks/useActions/useCellsActions';

import './add-cell.css';

interface AddCellProps {
	previousCellId: string | null;
	forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId, forceVisible }) => {
	const { insertCellAfter } = useCellsActions();

	return (
		<div className={`add-cell ${forceVisible && 'force-visible'}`}>
			<div className="add-buttons">
				<button
					className="button is-rounded is-primary is-small"
					onClick={() => insertCellAfter({ id: previousCellId, type: 'code' })}
				>
					<span className="icon is-small">
						<i className="fas fa-plus"></i>
					</span>
					<span>Code</span>
				</button>
				<button
					className="button is-rounded is-primary is-small"
					onClick={() => insertCellAfter({ id: previousCellId, type: 'text' })}
				>
					<span className="icon is-small">
						<i className="fas fa-plus"></i>
					</span>
					<span>Text</span>
				</button>
			</div>
			<div className="divider"></div>
		</div>
	);
};

export default AddCell;
