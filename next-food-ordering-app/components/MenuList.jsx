import styles from '../styles/MenuList.module.css';
import barStyles from '../styles/MenuListCategoryBar.module.css';
import ProductCard from './ProductCard';
import { useState, useEffect, useCallback } from 'react';
import MobileMenuList from './MobileMenuList';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });
const MenuList = ({ menuListItems }) => {
	const { t, lang } = useTranslation('common');
	const animationOptions = {
		loop: false,
		autoplay: true,
		animationData: require('../public/lottie-files/empty-cat.json'),
	};
	const [filteredProducts, setFilteredProducts] = useState(menuListItems);
	const handleCategoryClick = useCallback(
		(selectedCategory) => {
			const newFilteredProducts = menuListItems.filter((product) =>
				product.category.includes(selectedCategory),
			);
			setFilteredProducts(newFilteredProducts);
		},
		[menuListItems],
	);
	useEffect(() => {
		handleCategoryClick('Best Sellers');
	}, [handleCategoryClick]);
	const renderSubMenu = (menuTitle, items) => {
		return (
			<li
				className={barStyles.menuItem}
				key={menuTitle}>
				<div onClick={() => handleCategoryClick(items[0])}>
					{t(menuTitle)}
				</div>
				<ol className={barStyles.subMenu}>
					{items.map((item) => (
						<li
							key={`${menuTitle}-${item}`}
							className={barStyles.menuItem}>
							<div onClick={() => handleCategoryClick(item)}>
								{t(item)}
							</div>
						</li>
					))}
				</ol>
			</li>
		);
	};
	return (
		<div
			id='menu'
			className={styles.container}>
			<MobileMenuList handleCategoryClick={handleCategoryClick} />
			<h1
				id='menu'
				className={styles.title}>
				{t('menu')}
			</h1>
			<br />
			<nav className={barStyles.menu}>
				<ol>
					<li
						className={barStyles.menuItem}
						key='best sellers - mobile'>
						<div
							onClick={() => {
								handleCategoryClick('Best Sellers');
							}}>
							{t('Best Sellers')}
						</div>
					</li>
					<li
						className={barStyles.menuItem}
						key={'Home & Garden - mobile'}>
						<div onClick={() => handleCategoryClick('Home & Garden')}>
							{t('Home & Garden')}
						</div>
					</li>
					{renderSubMenu('Kitchen', [
						'Kitchen & Dining',
						'Kitchen Tools & Utensils',
					])}
					<li
						className={barStyles.menuItem}
						key={'Kitchen Slicers - mobile'}>
						<div onClick={() => handleCategoryClick('Kitchen Slicers')}>
							{t('Kitchen Slicers')}
						</div>
					</li>
					<li
						className={barStyles.menuItem}
						key={'Decors - mobile'}>
						<div onClick={() => handleCategoryClick('Decor')}>
							{t('Decors')}
						</div>
					</li>
					<li
						className={barStyles.menuItem}
						key={'Electronics - mobile'}>
						<div onClick={() => handleCategoryClick('Electronics')}>
							{t('Electronics')}
						</div>
					</li>
					<li
						className={barStyles.menuItem}
						key={'Hardwares - mobile'}>
						<div onClick={() => handleCategoryClick('Hardware')}>
							{t('Hardwares')}
						</div>
					</li>
					{renderSubMenu('Office', [
						'Tools',
						'Apparel & Accessories',
						'Office Supplies',
					])}
					<li
						className={barStyles.menuItem}
						key={'Audio - mobile'}>
						<div onClick={() => handleCategoryClick('Audio')}>
							{t('Audio')}
						</div>
					</li>
					{renderSubMenu('Jewelry', ['Jewelry', 'Household Supplies'])}
					{renderSubMenu('Other Categories', [
						'Storage & Organization',
						'Watches',
						'Grinders',
						'Headphones & Headsetss',
						'Headphones',
						'Kitchen Appliances',
					])}
				</ol>
			</nav>
			{filteredProducts.length === 0 ? (
				<>
					<Lottie
						options={animationOptions}
						height={400}
						width={
							typeof document !== 'undefined'
								? document.body.clientWidth
								: 0
						}
						isClickToPauseDisabled
						autoplay
					/>
					<h3>{t('emptyMenu')}</h3>
				</>
			) : (
				<div className={styles.wrapper}>
					{filteredProducts.map((product) => (
						<ProductCard
							key={`${product._id} - mobile - subMenu`}
							product={product}
						/>
					))}
				</div>
			)}
		</div>
	);
};
export default MenuList;
