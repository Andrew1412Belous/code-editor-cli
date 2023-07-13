import React, { useEffect, useState, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../../../store';

import './text-editor.css';
import { useCellsActions } from '../../../hooks/useActions/useCellsActions';

interface TextEditorProps {
	cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }: TextEditorProps) => {
	const [editing, setEditing] = useState(false);

	const { updateCell } = useCellsActions();

	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (ref.current && event.target && ref.current?.contains(event.target as Node)) return;

			setEditing(false);
		};

		document.addEventListener('click', listener, { capture: true });

		return () => {
			document.removeEventListener('click', listener, { capture: true });
		};
	}, []);

	if (editing) {
		return (
			<div className="text-editor" ref={ref}>
				<MDEditor
					value={cell.content}
					onChange={(v) =>
						updateCell({
							id: cell.id,
							content: v || '',
						})
					}
				/>
			</div>
		);
	}

	return (
		<div className="text-editor card" onClick={() => setEditing(true)}>
			<div className="card-content">
				<MDEditor.Markdown source={cell.content || 'Click to edit'} />
			</div>
		</div>
	);
};

export default TextEditor;
