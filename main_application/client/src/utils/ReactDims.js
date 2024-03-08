import { createContext, useContext, useEffect, useRef, useState } from 'react';

const ReactDims = createContext(null);

export const Provider = (props) => {
	const domNode = useRef(null);
	const [dimensions, setDimensions] = useState({});

	useEffect(() => {
		const node = domNode.current;
		if (node) {
			setDimensions(node.getBoundingClientRect());

			const resizeObserver = new ResizeObserver((entries) => {
				for (let entry of entries) {
					setDimensions(entry.contentRect);
				}
			});

			resizeObserver.observe(node);

			return () => {
				resizeObserver.unobserve(node);
			};
		}
	}, []);

	return (
		<div ref={domNode} style={{ height: '100%' }}>
			<ReactDims.Provider value={dimensions}>
				{props.children}
			</ReactDims.Provider>
		</div>
	);
};

export const WithContext = (ChildComponent) => {
	const WithContextComponent = (props) => {
		const incomingDims = useContext(ReactDims);
		return <ChildComponent {...props} dims={incomingDims} />;
	};

	return WithContextComponent;
};
