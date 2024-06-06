import styles from '../../styles/Product.module.css';
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';
import Swal from 'sweetalert2';
import 'yet-another-react-lightbox/styles.css';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { toArabic } from 'arabic-digits';
const Lightbox = dynamic(() => import('yet-another-react-lightbox'), {
	ssr: false,
});
const Product = ({ product }) => {
	const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
	const [selectedColor, setSelectedColor] = useState(
		product.colors.length > 0 ? product.colors[0] : null,
	);
	const [quantity, setQuantity] = useState(1);
	const [isOpen, setIsOpen] = useState(false);
	const [imgSrc, setImgSrc] = useState(
		`${process.env.API_URL_MEDIA}${product.img}`,
	);
	const fallbackImg = `${process.env.API_URL_MEDIA}/images/LF-logo-1k.png`;
	const dispatch = useDispatch();
	const { t, lang } = useTranslation('common');
	const handleError = () => {
		setImgSrc(fallbackImg);
	};
	const handleClick = () => {
		if (quantity <= 0) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title:
					lang === 'en'
						? 'Please select a quantity greater than 0'
						: 'الرجاء تحديد الكمية الكافية أو أكبر من صفر',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
			});
			return;
		}
		dispatch(
			addProduct({
				...product,
				size: selectedSize,
				color: selectedColor,
				quantity,
			}),
		);
		Swal.fire({
			position: 'center',
			icon: 'success',
			title:
				lang === 'en' ? 'Product added successfully' : 'تمت الاضافة بنجاح',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
		});
		setSelectedSize(product.sizes[0]);
		setSelectedColor(selectedColor);
		setQuantity(1);
	};
	return (
		<>
			<Head>
				<title>
					{t('Lahmah&Fahmah')} |{' '}
					{lang === 'ar' ? product.title_ar : product.title}
				</title>
			</Head>
			<div className={styles.container}>
				<div className={styles.left}>
					<div
						className={styles.imgContainer}
						onClick={() => setIsOpen(true)}>
						<Image
							src={`${process.env.API_URL_MEDIA}${product.img}`}
							alt='product-image'
							fill
							style={{ cursor: 'pointer', objectFit: 'contain' }}
							quality={85}
							priority
							onError={handleError}
						/>
						{isOpen && (
							<Lightbox
								open={isOpen}
								close={() => setIsOpen(false)}
								slides={[
									{
										src: `${process.env.API_URL_MEDIA}${product.img}`,
										alt: 'product-image',
									},
								]}
							/>
						)}
					</div>
				</div>
				<div className={styles.right}>
					<h1 className={styles.title}>
						{lang === 'ar' ? product.title_ar : product.title}
					</h1>
					<span className={styles.price}>
						{lang === 'ar'
							? toArabic(product.prices[0])
							: product.prices[0]}{' '}
						{t('AEDLONG')}
					</span>
					<p className={styles.desc}>
						{lang === 'ar' ? product.desc_ar : product.desc}
					</p>
					<div className={styles.sizeColorContainer}>
						<div>
							<h3 className={styles.choose}>{t('Choose the size')}</h3>
							<div className={styles.sizes}>
								{product.sizes.map((size) => (
									<div
										key={size}
										className={`${styles.size} ${
											selectedSize === size ? styles.selected : ''
										}`}
										onClick={() => setSelectedSize(size)}>
										<span className={styles.sizeLabel}>{size}</span>
									</div>
								))}
							</div>
							<span className={styles.selectedSize}>
								{t('Selected Size')}: {selectedSize}
							</span>
						</div>
						{product.colors.length > 0 && (
							<div>
								<h3 className={styles.choose}>
									{t('Choose the color')}
								</h3>
								<div className={styles.colors}>
									{product.colors.map((color) => (
										<div
											key={color}
											className={`${styles.color} ${
												selectedColor === color
													? styles.selected
													: ''
											}`}
											onClick={() => setSelectedColor(color)}>
											<span className={styles.colorLabel}>
												{color}
											</span>
										</div>
									))}
								</div>
								<span className={styles.selectedColor}>
									{t('Selected Color')}: {selectedColor}
								</span>
							</div>
						)}
					</div>
					<div className={styles.add}>
						<input
							onChange={(e) => {
								const value = Number(e.target.value);
								if (value >= 1) {
									setQuantity(value);
								}
							}}
							type='number'
							value={quantity}
							min='1'
							className={styles.quantity}
						/>
						<button
							className={styles.button}
							onClick={handleClick}>
							{t('Add to Cart')}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = async (ctx) => {
	const { params } = ctx;
	const res = await axios.get(
		`http://194.195.86.67/api/products/${params.id}`,
	);
	ctx.res.setHeader(
		'Cache-Control',
		'public, s-maxage=30, stale-while-revalidate=59',
	);
	return {
		props: {
			product: res.data,
		},
	};
};
export default Product;
