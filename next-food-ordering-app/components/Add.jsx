import { useState, useCallback, memo } from 'react';
import styles from '../styles/Add.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import MultiSelectDropdown from './MultiSelectDropdown';
import { IoClose } from 'react-icons/io5';
import useTranslation from 'next-translate/useTranslation';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
const Add = memo(({ setClose, productToEdit, onCancel }) => {
	const [product, setProduct] = useState(
		() =>
			productToEdit || {
				file: '',
				title: '',
				desc: '',
				prices: [''],
				category: productToEdit ? productToEdit.category : [],
				sizes: productToEdit ? productToEdit.sizes : [],
				colors: productToEdit ? productToEdit.colors : [],
			},
	);
	const { t, lang } = useTranslation('common');
	const changePrice = useCallback((e, index) => {
		setProduct((prevProduct) => {
			const newPrices = [...prevProduct.prices];
			newPrices[index] = e.target.value;
			return { ...prevProduct, prices: newPrices };
		});
	}, []);
	const handleSizeChange = useCallback((selectedSizes) => {
		setProduct((prevProduct) => ({
			...prevProduct,
			sizes: selectedSizes.map((size) => size.value),
		}));
	}, []);
	const handleColorChange = useCallback((selectedColors) => {
		setProduct((prevProduct) => ({
			...prevProduct,
			colors: selectedColors.map((color) => color.value),
		}));
	}, []);
	const handleCategoryChange = useCallback((selectedOptions) => {
		setProduct((prevProduct) => ({
			...prevProduct,
			category: selectedOptions.map((option) => option.value),
		}));
	}, []);
	const uploadFile = async (file) => {
		const data = new FormData();
		data.append('file', file);
		const uploadRes = await axios.post('/api/upload', data);
		return uploadRes.data.data;
	};
	const createProduct = async (product) => {
		await axios.post(`${process.env.API_URL}/api/products`, product);
	};
	const showSuccessMessage = useCallback((message) => {
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: message,
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
		});
	}, []);
	const showErrorMessage = useCallback((message) => {
		Swal.fire({
			position: 'center',
			icon: 'error',
			title: message,
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
		});
	}, []);
	const handleCreate = useCallback(async () => {
		try {
			const url = await uploadFile(product.file);
			const newProduct = {
				title: product.title,
				title_ar: product.title_ar,
				desc: product.desc,
				desc_ar: product.desc_ar,
				prices: product.prices,
				img: url,
				category: product.category,
				sizes: product.sizes,
				colors: product.colors,
			};
			await createProduct(newProduct);
			setClose(true);
			onCancel();
			showSuccessMessage(lang === 'en' ? 'Product Added' : 'تمت الاضافة');
		} catch (err) {
			showErrorMessage(lang === 'en' ? 'Something went wrong' : 'حدث خطأ');
		}
	}, [
		product,
		setClose,
		showErrorMessage,
		showSuccessMessage,
		onCancel,
		lang,
	]);
	const handleUpdate = useCallback(async () => {
		try {
			let url;
			if (product.file) {
				url = await uploadFile(product.file);
			} else {
				url = product.img;
			}
			const updatedProduct = {
				_id: product._id,
				title: product.title,
				title_ar: product.title_ar,
				desc: product.desc,
				desc_ar: product.desc_ar,
				prices: product.prices,
				img: url,
				category: product.category,
				sizes: product.sizes,
				colors: product.colors,
			};
			await axios.put(
				`${process.env.API_URL}/api/products/` + product._id,
				updatedProduct,
			);
			setClose(true);
			onCancel();
			showSuccessMessage(
				lang === 'en' ? 'Product Updated' : 'تم تحديث المنتج',
			);
		} catch (err) {
			showErrorMessage(lang === 'en' ? 'Something went wrong' : 'حدث خطأ');
		}
	}, [
		product,
		setClose,
		showErrorMessage,
		showSuccessMessage,
		onCancel,
		lang,
	]);
	const deletePrice = useCallback((index) => {
		setProduct((prevProduct) => {
			const newPrices = [...prevProduct.prices];
			newPrices.splice(index, 1);
			return { ...prevProduct, prices: newPrices };
		});
	}, []);
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<span
					onClick={() => {
						setClose(true);
						onCancel();
					}}
					className={styles.close}>
					<IoClose
						size={23}
						color='white'
					/>
				</span>
				{productToEdit ? (
					<h1>{t('Edit Product')}</h1>
				) : (
					<h1>{t('Add Product')}</h1>
				)}
				<div className={styles.item}>
					<label className={styles.label}>{t('Choose an image')}</label>
					<input
						type='file'
						onChange={(e) =>
							setProduct({ ...product, file: e.target.files[0] })
						}
						accept='image/*'
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>{t('Title')}</label>
					<input
						className={styles.input}
						type='text'
						onChange={(e) =>
							setProduct({ ...product, title: e.target.value })
						}
						value={product.title}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>{t('TitleArabic')}</label>
					<input
						className={styles.input}
						type='text'
						onChange={(e) =>
							setProduct({ ...product, title_ar: e.target.value })
						}
						value={product.title_ar}
						style={{ direction: 'rtl' }}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>{t('Colors')}</label>
					<MultiSelectDropdown
						options={[
							{ value: 'Red', label: 'Red' },
							{ value: 'Blue', label: 'Blue' },
							{ value: 'Green', label: 'Green' },
							{ value: 'Yellow', label: 'Yellow' },
							{ value: 'Black', label: 'Black' },
							{ value: 'White', label: 'White' },
						]}
						onChange={handleColorChange}
						value={product.colors}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>{t('Sizes')}</label>
					<MultiSelectDropdown
						options={[
							{ value: 'XS', label: 'XS' },
							{ value: 'S', label: 'S' },
							{ value: 'M', label: 'M' },
							{ value: 'L', label: 'L' },
							{ value: 'XL', label: 'XL' },
							{ value: 'XXL', label: 'XXL' },
							{ value: 'XXXL', label: 'XXXL' },
						]}
						onChange={handleSizeChange}
						value={product.sizes}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>{t('Desc')}</label>
					<textarea
						rows={4}
						type='text'
						onChange={(e) =>
							setProduct({ ...product, desc: e.target.value })
						}
						value={product.desc}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>{t('DescArabic')}</label>
					<textarea
						rows={4}
						type='text'
						onChange={(e) =>
							setProduct({ ...product, desc_ar: e.target.value })
						}
						value={product.desc_ar}
						style={{ direction: 'rtl' }}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>{t('Prices')}</label>
					<div className={styles.priceContainer}>
						{product.prices.map((price, index) => (
							<div key={index}>
								<input
									className={`${styles.input} ${styles.inputSm}`}
									type='number'
									placeholder={lang === 'ar' ? 'السعر' : 'Price'}
									onChange={(e) => changePrice(e, index)}
									value={price}
									name='price'
									min='0'
								/>
								{product.prices.length !== 1 && (
									<button onClick={() => deletePrice(index)}>
										<AiOutlineClose size={17} />
									</button>
								)}
							</div>
						))}
						{product.prices.length < 3 && (
							<button
								onClick={() =>
									setProduct((prevProduct) => ({
										...prevProduct,
										prices: [...prevProduct.prices, null],
									}))
								}
								className={styles.button2}>
								<AiOutlinePlus size={17} />
							</button>
						)}
					</div>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>{t('Category')}</label>
					<MultiSelectDropdown
						options={[
							{ value: 'Best Sellers', label: 'best sellers' },
							{ value: 'Home & Garden', label: 'Home & Garden' },
							{ value: 'Kitchen & Dining', label: 'Kitchen & Dining' },
							{
								value: 'Kitchen Tools & Utensils',
								label: 'Kitchen Tools & Utensils',
							},
							{ value: 'Kitchen Slicers', label: 'Kitchen Slicers' },
							{
								value: 'Kitchen Appliances',
								label: 'Kitchen Appliances',
							},
							{ value: 'Decor', label: 'Decor' },
							{ value: 'Electronics', label: 'Electronics' },
							{ value: 'Hardware', label: 'Hardware' },
							{ value: 'Tools', label: 'Tools' },
							{
								value: 'Apparel & Accessories',
								label: 'Apparel & Accessories',
							},
							{ value: 'Office Supplies', label: 'Office Supplies' },
							{ value: 'Audio', label: 'Audio' },
							{ value: 'Jewelry', label: 'Jewelry' },
							{
								value: 'Household Supplies',
								label: 'Household Supplies',
							},
							{
								value: 'Storage & Organization',
								label: 'Storage & Organization',
							},
							{ value: 'Watches', label: 'Watches' },
							{ value: 'Grinders', label: 'Grinders' },
							{
								value: 'Headphones & Headsets',
								label: 'Headphones & Headsets',
							},
							{ value: 'Headphones', label: 'Headphones' },
						]}
						onChange={handleCategoryChange}
						value={product.category}
					/>
				</div>
				<button
					className={styles.addButton}
					onClick={productToEdit ? handleUpdate : handleCreate}>
					{productToEdit ? t('Update') : t('Create')}
				</button>
			</div>
		</div>
	);
});
Add.displayName = 'Add';
export default Add;
