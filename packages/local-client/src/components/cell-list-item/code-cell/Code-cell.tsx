import React, { useEffect } from 'react';
import CodeEditor from './code-editor/Code-editor';
import Preview from './preview/Preview';
import Resizable from './resizable/Resizable';
import { Cell, createBundle } from '../../../store';
import { useCellsActions } from '../../../hooks/useActions/useCellsActions';
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useCumulativeCode } from '../../../hooks/useCumulativeCode';

import './code-cell.css';

interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }: CodeCellProps) => {
	const { updateCell } = useCellsActions();
	const bundle = useTypedSelector((state) => state.bundles[cell.id]);
	const cumulativeCode = useCumulativeCode(cell.id);
	const dispatch = useTypedDispatch();

	useEffect(() => {
		if (!bundle) {
			dispatch(createBundle({ cellId: cell.id, input: cumulativeCode }));
			return;
		}

		const timer = setTimeout(async () => {
			dispatch(createBundle({ cellId: cell.id, input: cumulativeCode }));
		}, 750);

		return () => {
			clearTimeout(timer);
		};
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cell.id, cumulativeCode]);

	return (
		<Resizable direction="vertical">
			<div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction="horizontal">
					<CodeEditor
						initialValue={cell.content}
						onChange={(value) => updateCell({ id: cell.id, content: value })}
					/>
				</Resizable>
				<div className="progress-wrapper">
					{!bundle || bundle.loading ? (
						<div className="progress-cover">
							<progress className="progress is-small is-primary" max="100">
								Loading
							</progress>
						</div>
					) : (
						<Preview code={bundle.code} err={bundle.err} />
					)}
				</div>
			</div>
		</Resizable>
	);
};

export default CodeCell;
