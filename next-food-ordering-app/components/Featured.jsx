import styles from '../styles/Featured.module.css';
import Image from 'next/image';
import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
const Featured = () => {
	const [index, setIndex] = useState(0);
	const { t, lang } = useTranslation('common');
	const images = [
		'/img/claudio-schwarz-LoelYE8uw7I-unsplash.jpg',
		'/img/blake-wisz-tE6th1h6Bfk-unsplash.jpg',
		'/img/andrew-leu-_L3YMlqc9NA-unsplash.jpg',
	];
	const handleArrow = (direction) => {
		if (direction === 'l') {
			setIndex(index !== 0 ? index - 1 : 2);
		}
		if (direction === 'r') {
			setIndex(index !== 2 ? index + 1 : 0);
		}
	};
	return (
		<div className={styles.container}>
			<div
				className={styles.arrowContainer}
				style={{ left: 0 }}
				onClick={() =>
					(lang === 'en' && handleArrow('l')) ||
					(lang === 'ar' && handleArrow('r'))
				}>
				<Image
					src='/img/arrowl.png'
					alt='left-arrow'
					style={{ objectFit: 'cover' }}
					fill={true}
					priority
					sizes='(100vw, 100vh)'
					quality={85}
				/>
			</div>
			<div
				className={styles.wrapper}
				style={
					(lang === 'en' && {
						transform: `translateX(${-100 * index}vw)`,
					}) ||
					(lang === 'ar' && { transform: `translateX(${100 * index}vw)` })
				}>
				{images.map((img, i) => (
					<div
						className={styles.imgContainer}
						key={i}>
						<Image
							src={img}
							key={i}
							fill
							alt='featured-image'
							style={{ objectFit: 'cover' }}
							sizes='(100vw, 100vh)'
						/>
					</div>
				))}
			</div>
			<div
				className={styles.arrowContainer}
				style={{ right: 0 }}
				onClick={() =>
					(lang === 'en' && handleArrow('r')) ||
					(lang === 'ar' && handleArrow('l'))
				}>
				<Image
					src='/img/arrowr.png'
					alt='right-arrow'
					style={{ objectFit: 'cover' }}
					fill
					priority
					sizes='(100vw, 100vh)'
				/>
			</div>
		</div>
	);
};
export default Featured;
