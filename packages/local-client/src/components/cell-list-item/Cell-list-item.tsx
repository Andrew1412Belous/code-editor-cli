import React from 'react';
import { Cell } from '../../store';
import CodeCell from './code-cell/Code-cell';
import TextEditor from './text-editor/Text-editor';
import ActionBar from './action-bar/Action-bar';
import { LayoutGroup, motion } from 'framer-motion';

import './cell-list-item.css';

interface CellListItemProps {
	cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }: CellListItemProps) => {
	let child: JSX.Element;

	if (cell.type === 'code') {
		child = (
			<>
				<LayoutGroup>
					<motion.div layout>
						<div className="action-bar-wrapper">
							<ActionBar id={cell.id} />
						</div>
						<CodeCell cell={cell} />
					</motion.div>
				</LayoutGroup>
			</>
		);
	} else {
		child = (
			<>
				<LayoutGroup>
					<motion.div layout>
						<ActionBar id={cell.id} />
						<TextEditor cell={cell} />
					</motion.div>
				</LayoutGroup>
			</>
		);
	}

	return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
