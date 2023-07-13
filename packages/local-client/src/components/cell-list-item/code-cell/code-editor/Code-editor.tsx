import MonacoEditor, { OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import React, { useRef } from 'react';
import Highlighter from 'monaco-jsx-highlighter';

import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

import './code-editor.css';
import './syntax.css';

interface CodeEditorProps {
	initialValue: string;

	onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
	const editorRef = useRef<any>();

	const onEditorDidMount: OnMount = (editor, monaco) => {
		editorRef.current = editor;

		editor.onDidChangeModelContent(() => {
			onChange(editor.getValue());
		});

		editor.getModel()?.updateOptions({ tabSize: 2 });

		const highlighter = new Highlighter(monaco, parse, traverse, editor);

		highlighter.highLightOnDidChangeModelContent(100);
		highlighter.addJSXCommentCommand();
	};

	const onFormatCLick = () => {
		const unformatted = editorRef.current.getModel().getValue();

		try {
			const formatted = prettier
				.format(unformatted, {
					parser: 'babel',
					plugins: [parser],
					useTabs: false,
					semi: true,
					singleQuote: true,
				})
				.replace(/\n$/, '');

			editorRef.current.setValue(formatted);
		} catch (err) {
			throw err;
		}
	};

	return (
		<div className="editor-wrapper">
			<button onClick={onFormatCLick} className="button button-format is-primary is-small">
				Format
			</button>
			<MonacoEditor
				value={initialValue}
				height="100%"
				language="javascript"
				theme="vs-dark"
				onMount={onEditorDidMount}
				options={{
					wordWrap: 'on',
					minimap: { enabled: false },
					showUnused: false,
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 16,
					scrollBeyondLastLine: false,
					automaticLayout: true,
				}}
			/>
		</div>
	);
};

export default CodeEditor;
