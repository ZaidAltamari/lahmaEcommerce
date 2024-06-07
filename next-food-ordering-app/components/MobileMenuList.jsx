import styles from '../styles/MobileMenuList.module.css';
import { useState } from 'react';
import Image from 'next/legacy/image';
import useTranslation from 'next-translate/useTranslation';
const MobileMenuList = ({ handleCategoryClick }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { t, lang } = useTranslation('common');
	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	return (
		<>
			<button
				className={styles.menu__button}
				onClick={handleMenuToggle}
				hidden={isMenuOpen}>
				<div>
					<Image
						src='/img/menu.svg'
						alt='menu'
						width={50}
						height={50}
					/>
				</div>
				Category
			</button>
			<section
				className={styles.menu__body}
				hidden={!isMenuOpen}>
				<div className={styles.menu__header}>
					<label></label>
					<p> {t('OurMenu')}</p>
					<button
						title='Close'
						onClick={handleMenuToggle}>
						<Image
							src='/img/close.svg'
							alt='close'
							width={50}
							height={50}
						/>
					</button>
				</div>
				<div className={styles.menu__links}>
					<a
						href='#menu'
						key={1}
						onClick={() => handleCategoryClick('Best Sellers')}>
						{t('Best Sellers')}
					</a>
					<a
						href='#menu'
						key={2}
						onClick={() => handleCategoryClick('Home & Garden')}>
						{t('Home & Garden')}
					</a>
					<a
						href='#menu'
						key={3}
						onClick={() => handleCategoryClick('Kitchen & Dining')}>
						{t('Kitchen & Dining')}
					</a>
					<a
						href='#menu'
						key={4}
						onClick={() =>
							handleCategoryClick('Kitchen Tools & Utensils')
						}>
						{t('Kitchen Tools & Utensils')}
					</a>
					<a
						href='#menu'
						key={6}
						onClick={() => handleCategoryClick('Kitchen Slicers')}>
						{t('Kitchen Slicers')}
					</a>
					<a
						href='#menu'
						key={66}
						onClick={() => handleCategoryClick('Kitchen Appliances')}>
						{t('Kitchen Appliances')}
					</a>
					<a
						href='#menu'
						key={7}
						onClick={() => handleCategoryClick('Decor')}>
						{t('Decors')}
					</a>
					<a
						href='#menu'
						key={8}
						onClick={() => handleCategoryClick('Electronics')}>
						{t('Electronics')}
					</a>
					<a
						href='#menu'
						key={9}
						onClick={() => handleCategoryClick('Hardware')}>
						{t('Hardwares')}
					</a>
					<a
						href='#menu'
						key={10}
						onClick={() => handleCategoryClick('Tools')}>
						{t('Tools')}
					</a>
					<a
						href='#menu'
						key={11}
						onClick={() => handleCategoryClick('Apparel & Accessories')}>
						{t('Apparel & Accessories')}
					</a>
					<a
						href='#menu'
						key={12}
						onClick={() => handleCategoryClick('Office Supplies')}>
						{t('Office Supplies')}
					</a>
					<a
						href='#menu'
						key={13}
						onClick={() => handleCategoryClick('Audio')}>
						{t('Audio')}
					</a>
					<a
						href='#menu'
						key={14}
						onClick={() => handleCategoryClick('Jewelry')}>
						{t('Jewelry')}
					</a>
					<a
						href='#menu'
						key={15}
						onClick={() => handleCategoryClick('Household Supplies')}>
						{t('Household Supplies')}
					</a>
					<a
						href='#menu'
						key={17}
						onClick={() => handleCategoryClick('Storage & Organization')}>
						{t('Storage & Organization')}
					</a>
					<a
						href='#menu'
						key={18}
						onClick={() => handleCategoryClick('Watches')}>
						{t('Watches')}
					</a>
					<a
						href='#menu'
						key={19}
						onClick={() => handleCategoryClick('Grinders')}>
						{t('Grinders')}
					</a>
					<a
						href='#menu'
						key={20}
						onClick={() => handleCategoryClick('Headphones & Headsetss')}>
						{t('Headphones & Headsetss')}
					</a>
					<a
						href='#menu'
						key={21}
						onClick={() => handleCategoryClick('Headphones')}>
						{t('Headphones')}
					</a>
				</div>
				<div className={styles.menu__contact}>
					<div className={styles.menu__contact}>
						<a href='tel:971042801585'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='#000000'
								height='24'
								viewBox='0 0 24 24'
								width='24'>
								<path
									d='M0 0h24v24H0z'
									fill='none'></path>
								<path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z'></path>
							</svg>
							<span>{t('CallUs')}</span>
						</a>
						<a href='mailto:tasty@bestmeat.ae'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='#000000'
								height='24'
								viewBox='0 0 24 24'
								width='24'>
								<path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'></path>
								<path
									d='M0 0h24v24H0z'
									fill='none'></path>
							</svg>
							<span>{t('PhoneEmail')}</span>
						</a>
						<a href='https://maps.app.goo.gl/VVkxhoNEP49H99TNA'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='#000000'
								height='24'
								viewBox='0 0 24 24'
								width='24'>
								<path d='M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z'></path>
								<path
									d='M0 0h24v24H0z'
									fill='none'></path>
							</svg>
							<span>{t('Location')}</span>
						</a>
					</div>
				</div>
			</section>
			<div
				className={styles.menu__overlay}
				onClick={handleMenuToggle}
				hidden={!isMenuOpen}></div>
		</>
	);
};
export default MobileMenuList;
