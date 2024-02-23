import { useEffect, useRef, useState } from 'react';

function LazyImage({ src, alt, placeholderSrc }) {
	const [imageSrc, setImageSrc] = useState(placeholderSrc);
	const imageRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setImageSrc(src);
					observer.unobserve(entry.target);
				}
			});
		});

		observer.observe(imageRef.current);

		return () => observer.disconnect();
	}, [src]);

	return <img ref={imageRef} src={imageSrc} alt={alt} />;
}

export default LazyImage;
