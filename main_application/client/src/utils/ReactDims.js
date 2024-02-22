import { createContext, useContext, useEffect, useRef, useState } from 'react';

const ReactDims = createContext(null);

export const Provider = (props) => {
	const domNode = useRef(null);
	const [dimensions, setDimensions] = useState({});
	const [timeoutID, newTimeoutID] = useState(null);

	const getNodeDimensions = () => {
		clearTimeout(timeoutID);
		newTimeoutID(
			setTimeout(() => {
				setDimensions(domNode.current.getBoundingClientRect());
			}, props.debounce)
		);
	};

	useEffect(() => {
		setDimensions(domNode.current.getBoundingClientRect());
	}, []);

	useEffect(() => {
		window.addEventListener('resize', getNodeDimensions);
		return () => {
			window.removeEventListener('resize', getNodeDimensions);
		};
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
