import React, { useEffect, useRef } from 'react';

import './preview.css';

interface PreviewProps {
	code: string;
	err: string;
}

const html = `
		<html lang='en'>
			<head>
				<title>Code editor</title>
			</head>	
			<body>
				<div id='root'></div>
				<script>
					const handlerError = (err) => {
              const root = document.querySelector('#root');
							root.innerHTML = '<div style="color: red;"><h4>Runtime Error!</h4>' + err + '</div>';
							
							console.log(err)        
					}
					
          window.addEventListener('error', (event) => {
              event.preventDefault();
              
              handlerError(event.error)
          })
                    
					window.addEventListener('message', (event) => {
						try {
              root.innerHTML = ''
					    eval(event.data)
						} catch (err) {
							handlerError(err)
						}
					}, false)
				</script>
			</body>
		</html>
	`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
	const iframe = useRef<any>();

	useEffect(() => {
		iframe.current.srcdoc = html;

		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, '*');
		}, 50);
	}, [code]);

	return (
		<div className="preview-wrapper">
			<iframe title="preview" ref={iframe} srcDoc={html} sandbox="allow-scripts" />
			{err && <div className="preview-error">{err}</div>}
		</div>
	);
};

export default Preview;
