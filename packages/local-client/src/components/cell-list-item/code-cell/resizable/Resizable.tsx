import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import React, { useEffect, useState } from 'react';

import './resizable.css';

interface ResizableProps {
	direction: 'horizontal' | 'vertical';
	children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [width, setWidth] = useState(window.innerWidth * 0.75);

	useEffect(() => {
		let timer: any;

		const listener = () => {
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				setInnerWidth(window.innerWidth);
				setInnerHeight(window.innerHeight);

				// if (window.innerWidth * 0.75 < width) {
				// 	setWidth(window.innerWidth * 0.75);
				// }
			}, 300);
		};

		window.addEventListener('resize', listener);

		return () => {
			window.removeEventListener('resize', listener);
		};
	}, [width]);

	let resizableProps: ResizableBoxProps =
		direction === 'horizontal'
			? {
					className: 'resize-horizontal',
					width,
					height: Infinity,
					resizeHandles: ['e'],
					maxConstraints: [innerWidth * 0.75, Infinity],
					minConstraints: [innerWidth * 0.2, Infinity],
					onResizeStop: (event, data) => {
						setWidth(data.size.width);
					},
			  }
			: {
					width: Infinity,
					height: 300,
					resizeHandles: ['s'],
					maxConstraints: [Infinity, innerHeight * 0.9],
					minConstraints: [Infinity, 24],
			  };

	return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
